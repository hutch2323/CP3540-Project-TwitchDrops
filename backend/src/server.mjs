import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { MongoClient } from 'mongodb';
import { request } from 'http';
import multer from 'multer';
import { Guid } from 'guid-factory'
import { start } from 'repl';
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import https from 'https';
import { ObjectId } from 'mongodb';

/* 
DB Name: TwitchDropsApp
Collections: twitchDrops, faqs, apiKeys
*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// let dropData = undefined;
// fs.readFile("./data/RewardsDummyData.json", "utf8", (err, data) => {
//     console.log(err)
//     console.log(data)
//     dropData = data;
// });

// let faqData = undefined;
// fs.readFile("./data/faqs.json", "utf8", (err, data) => {
//     console.log(err)
//     console.log(faqData)
//     faqData = data;
// });

const app = express();
app.use(express.static(path.join(__dirname, '/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/api/generateKey', async (req, res) => {
    const myID = Guid.newGuid();
    res.send(myID);
});


const generatePlayfabEntityToken = async () => {
    var headers = {
        "Content-Type": "application/json",
        "X-SecretKey": process.env.PLAYFAB_SECRET
    }
    
    var requestOptions = {
        method: 'POST',
        headers: headers,
        redirect: 'follow'
    };

    let entityTokenResponse = await fetch("https://D544.playfabapi.com/Authentication/GetEntityToken", requestOptions)
    let entityTokenJson = await entityTokenResponse.json();
    return entityTokenJson.data.EntityToken;
}
var PLAYFAB_ENTITY_TOKEN = await generatePlayfabEntityToken();
const SERVER_URL = 'https://3.14.82.33:4000';
const checkRewards = async () => {
    console.log("check users for rewards");
    const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true});
    const db = client.db('twitch');
    await db.collection('users').find({}).forEach( async myDoc => { 
        var headers = {
            "Client-Id": process.env.TWITCH_CLIENT_ID,
            "Authorization": "Bearer "+myDoc.access_token
        }
       
        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        let response = await fetch(`https://api.twitch.tv/helix/entitlements/drops?user_id=${myDoc.id}&game_id=509893`, requestOptions)
        let jsonData = await response.json();
        
        if(jsonData.data) {
            for ( const entry of jsonData.data ) {
                if( entry.fulfillment_status == "CLAIMED" ) {
                    //give the award on playfab
                    var headers = {
                        "Content-Type": "application/json",
                        "X-EntityToken": PLAYFAB_ENTITY_TOKEN
                    }

                    var raw = JSON.stringify({
                        "FunctionName": "AddItemTest",
                        "Entity": {
                            "Id": myDoc.playfabId,
                            "Type": "title_player_account"
                        },
                        "FunctionParameter": {
                            "account": {
                            "target": "Steam",
                            "id": myDoc.steamid
                            },
                            "item": entry.benefit_id
                        }
                    });

                    var requestOptions = {
                        method: 'POST',
                        headers: headers,
                        body: raw,
                        redirect: 'follow'
                    };

                    let awardResponse = await fetch("https://D544.playfabapi.com/CloudScript/ExecuteEntityCloudScript", requestOptions)
                    let awardJson = await awardResponse.json();
                    //change fulfilment status on twitch
                    if( awardJson.code == 200 && awardJson.status == "OK" && awardJson.error == undefined) {
                        var headers = {
                            "Content-Type": "application/json",
                            "Client-Id": process.env.TWITCH_CLIENT_ID,
                            "Authorization": "Bearer "+myDoc.access_token
                        }
                       
                        var requestOptions = {
                            method: 'PATCH',
                            headers: headers,
                            redirect: 'follow'
                        };

                        let fulfilResponse = await fetch(`https://api.twitch.tv/helix/entitlements/drops?fulfillment_status=FULFILLED&entitlement_ids=${entry.id}`, requestOptions)
                        let fulfilJson = await fulfilResponse.json();
                        
                        //add a document with data for the awarded item
                        let addedDataObj = { name: myDoc.display_name, twitchId: myDoc.id, item: entry.benefit_id, entitlement: entry.id  };
                        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true});
                        const db = client.db('twitch');
                        let insertResult = await db.collection('awards').insertOne(addedDataObj);
                    }
                }   
            }
        }
    })
    client.close();
}

setInterval(checkRewards, 60000);

const REDIRECT_URL = `${SERVER_URL}/auth/twitch/callback`

app.get('/auth/twitch/url', (req, res) => {
    const url = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.TWITCH_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code&force_verify=true&scope=user:read:email`;
    res.status(200).json({url});
});

app.get('/auth/steam/url', (req, res) => {
    const url = `https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.return_to=${SERVER_URL}%2Flinkaccounts&openid.realm=${SERVER_URL}&openid.mode=checkid_setup`;
    res.status(200).json({url});
})

app.post('/auth/steam/logout',async (req, res) => {
    req.body.usr.id;
    
    const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true});
    const db = client.db('twitch');
    const existingUser = await db.collection('users').findOne({'id':req.body.usr.id});
    if (existingUser) {
        const result = await db.collection('users').findOneAndUpdate(
            {'id':req.body.usr.id},
            {$unset: {steamid: ""}},
            { returnDocument: 'after' },
        );
        const { id, display_name } = result.value;
        jwt.sign({ id, display_name }, "ASBSDFSF@#$@#$@#SDFSDF",
        (err, token) => {
            if(err) return res.sendStatus(500); 
            res.status(200).json({token});
        })
    }
    else {
        res.status(200).json({});
    }
    client.close();
});

app.post('/auth/twitch/logout',async (req, res) => {
    let id = req.body.usr.id;
    const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true});
    const db = client.db('twitch');
    const result = await db.collection('users').deleteOne({id: id});
    client.close();
    res.status(200).json({"hello":5});
});

const getAccessAndBearerTokenURL = (accessCode) =>
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_SECRET}&code=${accessCode}&grant_type=authorization_code&redirect_uri=${REDIRECT_URL}`;

const getTwitchToken = async (accessCode) => {
    const url = getAccessAndBearerTokenURL(accessCode);
    const val = await fetch(url, { method: 'POST'})
    const jsonData = await val.json();
    return jsonData;  
}

const getUserInfo = async (bearerToken) => {
    const response = await fetch("https://api.twitch.tv/helix/users", {headers:{"Client-Id":process.env.TWITCH_CLIENT_ID,"Authorization":`Bearer ${bearerToken}`}})
    const jsonData = await response.json();
    return jsonData;   
}

app.post('/api/auth/steam', async (req, res) => {
    console.log("Here");
    var headers = {
        "Content-Type": "application/json",
        "X-SecretKey": process.env.PLAYFAB_SECRET
    }
    
    var raw = JSON.stringify({"SteamStringIDs": [req.body.steamid]});

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body: raw,
        redirect: 'follow'
    };
    let userResult = await fetch("https://D544.playfabapi.com/Server/GetPlayFabIDsFromSteamIDs", requestOptions)
    let jsonData = await userResult.json();
    let PlayfabMasterId = jsonData.data.Data[0].PlayFabId;
    if( PlayfabMasterId == undefined) {
        const { id, display_name, steamid } = userResult;
        jwt.sign({ id, display_name, steamid }, "ASBSDFSF@#$@#$@#SDFSDF",
        (err, token) => {
            if(err) return res.sendStatus(500); 
            res.status(200).json({status: "user_not_found"});
        })
    }
    else {

        var raw = JSON.stringify({
        "PlayFabId": PlayfabMasterId
        });

        var requestOptions = {
            method: 'POST',
            headers: headers,
            body: raw,
            redirect: 'follow'
        };

        let userAccountResult = await fetch("https://D544.playfabapi.com/Server/GetUserAccountInfo", requestOptions)
        jsonData = await userAccountResult.json();
        const playerTitleId = jsonData.data.UserInfo.TitleInfo.TitlePlayerAccount.Id;

        userResult = await updateOrCreateSteamUser(req.body.steamid, req.body.usr.id, playerTitleId);
        if( userResult == null ) {
            return res.sendStatus(500);
        }
        const { id, display_name, steamid } = userResult;
        jwt.sign({ id, display_name, steamid }, "ASBSDFSF@#$@#$@#SDFSDF",
        (err, token) => {
            if(err) return res.sendStatus(500); 
            console.log("Here");
            res.status(200).json({token});
        })
    }
})


app.get('/auth/twitch/callback', async (req, res) => {
    const { code } = req.query;
    try {
	const token = await getTwitchToken(code)
        const userJsonData = await getUserInfo(token.access_token)
        const userResult = await updateOrCreateUserFromOauth(userJsonData.data[0], token);
        const { id, display_name } = userResult;
        jwt.sign({ id, display_name }, "ASBSDFSF@#$@#$@#SDFSDF",
        (err, token) => {
            if(err) return res.sendStatus(500);
            res.redirect(`${SERVER_URL}/linkaccounts?token=${token}`)
        })
    }
    catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
})




// function that will check database for match of api key
const isValidKey = async(apiKey) => {
    try{
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true})
        const db = client.db("TwitchDropsApp");
        const key = await db.collection('apiKeys').find({key: apiKey}).toArray();
        client.close();

        if (key.length > 0){
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return ({message: "Error connceting to db", error});
    }
}

// function that will check database for match of master key
const isValidMasterKey = async(apiKey) => {
    try{
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true})
        const db = client.db("TwitchDropsApp");
        const key = await db.collection('masterKeys').find({apiKey}).toArray();
        client.close();

        if (key.length > 1){
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return ({message: "Error connceting to db", error});
    }
}

// function that will return all drops in the database
const getAllDrops = async () => {
    try{
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true})
        const db = client.db("TwitchDropsApp");
        const drops = await db.collection('twitchDrops').find({}).toArray();
        client.close();
        return drops
    } catch (error) {
        console.log(error);
        return [];
    }
}

// GET API route to grab current twitch drops
app.get('/api/currentTwitchDrops', async (req, res) => {
    try{
        const today = new Date();
        let drops = await getAllDrops();
        let activeDrops = [];
        for (let drop of drops){
            let startDate = new Date(drop.start_date);
            let endDate = new Date(drop.end_date);

            if ((today >= startDate) && (today <= endDate)){
                activeDrops.push(drop);
            }
        }
        res.status(200).json(activeDrops);
    } catch (error) {
        res.status(500).json({message: "Error connceting to db", error});
    }
});

// GET API route to grab past twitch drops
app.get('/api/pastTwitchDrops', async (req, res) => {
    try{
        const today = new Date();
        let drops = await getAllDrops();
        let pastDrops = [];
        for (let drop of drops){
            let startDate = new Date(drop.start_date);
            let endDate = new Date(drop.end_date);

            if (today > endDate){
                pastDrops.push(drop);
            }
        }
        res.status(200).json(pastDrops);
    } catch (error) {
        res.status(500).json({message: "Error connceting to db", error});
    }
});

// GET API route to grab future twitch drops
app.get('/api/futureTwitchDrops', async (req, res) => {
    try{
        const today = new Date();
        let drops = await getAllDrops();
        let futureDrops = [];
        for (let drop of drops){
            let startDate = new Date(drop.start_date);
            let endDate = new Date(drop.end_date);

            if (today < startDate){
                futureDrops.push(drop);
            }
        }
        res.status(200).json(futureDrops);
    } catch (error) {
        res.status(500).json({message: "Error connceting to db", error});
    }
});

// GET API route to grab frequently asked questions
app.get('/api/faqs', async (req, res) => {  
    try{
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true})
        const db = client.db("TwitchDropsApp");

        const faqs = await db.collection('faqs').find({}).toArray();
        console.log(faqs);
        res.status(200).json(faqs);
        client.close();
    } catch (error) {
        res.status(500).json({message: "Error connceting to db", error});
    }
});

// PUT API route to update a twitch drop
app.put('/api/updateTwitchDrop', async (req, res) => {
    if (await isValidKey(req.headers.apikey)){
        try{
            let dropData = req.body
            const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true})
            const db = client.db("TwitchDropsApp");

            await db.collection("twitchDrops").updateOne(
                {name: dropData.name, drops: {$elemMatch:{itemdefid: dropData.drops[0].itemdefid}}}, 
                {$set: {"drops.$": dropData.drops[0]}})
            res.status(200).json({message:"Success", dropData: dropData});
            client.close();
        }
        catch (error) {
            res.status(500).json({message: "Error connceting to db", error});
        }
    } else {
        res.status(500).json({message: "Invalid API Key"});
    }
});

// PUT API route to update an faq
app.put('/api/updateFAQ', async (req, res) => {
    if (await isValidKey(req.headers.apikey)){
        try{
            let faqData = req.body
            const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true})
            const db = client.db("TwitchDropsApp");

            await db.collection("faqs").updateOne({qId: faqData.qId}, {$set: faqData})
            res.status(200).json({message:"Success", faqData: req.body});
            client.close();
        }
        catch (error) {
            res.status(500).json({message: "Error connceting to db", error});
        }
    } else {
        res.status(500).json({message: "Invalid API Key"});
    }
});

// Route used to add APIKeys. Masterkey made avaialable so other people working on project can initialize their databases.
// Should be hidden, but revealed for the purpose of development. Once masterkey is added to db, can comment out first two lines
app.post('/api/addAPIKey', async (req, res) => {
    // unquote these first two lines and quote out the 3rd if no masterkey exists in the database
    // const masterKey = "ef72570ff371408f9668e414353b7b2e";
    // if (req.headers.apikey == masterKey) {
    if (await isValidMasterKey(req.headers.apikey)){
        try{
            let apiKey = req.body.apiKey
            const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true})
            const db = client.db("TwitchDropsApp");

            await db.collection("apiKeys").insertOne({apiKey});
            res.status(200).json({message:"Success", dropData: req.body});
            client.close();
        }
        catch (error) {
            res.status(500).json({message: "Error connceting to db", error});
        }
    } else {
        res.status(500).json({message: "Invalid API Key"});
    }
});

// POST API route to overwrite all drops
app.post('/api/overwriteDrops', async (req, res) => {
    if (await isValidKey(req.headers.apikey)){
        try{
            let dropData = req.body
            const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true})
            const db = client.db("TwitchDropsApp");

            await db.collection("twitchDrops").deleteMany({});
            await db.collection("twitchDrops").insertMany(dropData);
            res.status(200).json({message:"Success", dropData: req.body});
            client.close();
        }
        catch (error) {
            res.status(500).json({message: "Error connceting to db", error});
        }
    } else {
        res.status(500).json({message: "Invalid API Key"});
    }
    
});

// POST API route to overwrite all drops
app.post('/api/overwriteFAQS', async (req, res) => {
    if (await isValidKey(req.headers.apikey)){
        try{
            let faqData = req.body
            const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true})
            const db = client.db("TwitchDropsApp");

            await db.collection("faqs").deleteMany({});
            await db.collection("faqs").insertMany(faqData);
            res.status(200).json({message:"Success", faqData: req.body});
            client.close();
        }
        catch (error) {
            res.status(500).json({message: "Error connceting to db", error});
        }
    } else {
        res.status(500).json({message: "Invalid API Key"});
    }
    
});

app.get('*', (req, res) => { res.sendFile(path.join(__dirname + '/build/index.html'))})
//app.listen(8000, () => console.log("listening on port 8000"));

https.createServer({key: fs.readFileSync("key.pem"),
                    cert: fs.readFileSync("cert.pem"),},
                    app).listen(4000, () => { console.log('server is running at port 4000')})

//app.listen(8000, () => console.log("listening on port 80"));

const updateOrCreateSteamUser = async(steamid, twitch_user, playfabId) => {
    const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true});
    const db = client.db('twitch');
    if( twitch_user ) {
        let existingUser = await db.collection('users').findOne({'id':twitch_user});
        if (existingUser) {
            const result = await db.collection('users').findOneAndUpdate(
                {'id':twitch_user},
                {$set: {steamid: steamid, playfabId: playfabId}},
                { returnDocument: 'after' },
            );
            return result.value;
        }
    }
    return null;
}

const updateOrCreateUserFromOauth = async(userData, token) => {
    const {
        id,
        display_name,
    } = userData;

    const {
        access_token,
        refresh_token,
        expires_in
    } = token;

    const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true});
    const db = client.db('twitch');

    const existingUser = await db.collection('users').findOne({id});
    if (existingUser) {
        const result = await db.collection('users').findOneAndUpdate(
            {id},
            {$set: {display_name, access_token, refresh_token, expires_in}},
            { returnDocument: 'after' },
        );
        return result.value;
    }
    else {
        const toInsert = {
            _id: ObjectId(),
            id,
            display_name,
            access_token,
            refresh_token,
            expires_in,
          };
        const options = { upsert: true, returnDocument: 'after' };
        const result = await db.collection('users').findOneAndUpdate(
            toInsert,
            { $set: {} },
            options
        );
        return result.value;
    }
}
