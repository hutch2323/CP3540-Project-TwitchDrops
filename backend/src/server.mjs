import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { MongoClient } from 'mongodb';
import { Guid } from 'guid-factory'

/* 
DB Name: TwitchDropsApp
Collections: twitchDrops, faqs, apiKeys
*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, '/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// function that will check database for match of api key
const isValidKey = async(apiKey) => {
    try{
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true})
        const db = client.db("TwitchDropsApp");
        const key = await db.collection('apiKeys').find({apiKey}).toArray();
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
        const key = await db.collection('masterKeys').find({apiKey:apiKey}).toArray();
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

// GET API route that will generate and return a GUID key. This key will not be added as an API key until done manually
app.get('/api/generateKey', async (req, res) => {
    const myID = Guid.newGuid();
    res.send(myID);
});

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
// Should be hidden, but can be revealed for the purpose of development or local installation. Once masterkey is added to db, 
// can comment out first two lines
app.post('/api/addAPIKey', async (req, res) => {
    // unquote these first two lines of code and quote out the 3rd if no masterkey exists in the database. Then use masterKey as auth API
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

// POST API route to delete an API key. Master key must be set up for this route to work
app.post('/api/removeApiKey', async (req, res) => {
    if (await isValidMasterKey(req.headers.apikey)){
        try{
            // key = req.body.apiKey;
            // console.log(key);
            const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true})
            const db = client.db("TwitchDropsApp");

            let deletedKey = await db.collection("apiKeys").deleteOne({apiKey: req.body.apiKey});
            res.status(200).json({message: "success", apiKey: deletedKey});
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
app.listen(8000, () => console.log("listening on port 8000"));