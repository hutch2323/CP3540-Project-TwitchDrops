import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { MongoClient } from 'mongodb';
import { request } from 'http';
import multer from 'multer';

/* 
DB Name: TwitchDropsApp
Collections: twitchDrops, faq, apiKeys
*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// let dropData = undefined;
// fs.readFile("./data/RewardsDummyData.json", "utf8", (err, data) => {
//     console.log(err)
//     console.log(data)
//     dropData = data;
// });

const app = express();
app.use(express.static(path.join(__dirname, '/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// GET API route to grab active twitch drops
app.get('/api/activeTwitchDrops', async (req, res) => {
    // hard coded API key. This will need to be checked against the API in database rather than a visible string
    const apiKey = "ef72570ff371408f9668e414353b7b2e";
    console.log(req.headers);

    if (req.headers.apikey == apiKey) {
        try{
            const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true})
            const db = client.db("TwitchDropsApp");

            const activeDrops = await db.collection('twitchDrops').find({status:"active"}).toArray();
            console.log(activeDrops);
            res.status(200).json(activeDrops);
            client.close();
        }
        catch (error) {
            res.status(500).json({message: "Error connceting to db", error});
        }
    } else {
        res.status(500).json({message: "Invalid API Key"});
    }
});

// GET API route to grab inactive twitch drops
app.get('/api/inactiveTwitchDrops', async (req, res) => {
    // hard coded API key. This will need to be checked against the API in database rather than a visible string
    const apiKey = "ef72570ff371408f9668e414353b7b2e";
    console.log(req.headers);

    if (req.headers.apikey == apiKey) {
        try{
            const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true})
            const db = client.db("TwitchDropsApp");

            const inactiveDrops = await db.collection('twitchDrops').find({status:"inactive"}).toArray();
            console.log(inactiveDrops);
            res.status(200).json(inactiveDrops);
            client.close();
        }
        catch (error) {
            res.status(500).json({message: "Error connceting to db", error});
        }
    } else {
        res.status(500).json({message: "Invalid API Key"});
    }
});

// GET API route to grab frequently asked questions
app.get('/api/faqs', async (req, res) => {
    // hard coded API key. This will need to be checked against the API in database rather than a visible string
    const apiKey = "ef72570ff371408f9668e414353b7b2e";
    console.log(req.headers);

    if (req.headers.apikey == apiKey) {    
        try{
            const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true})
            const db = client.db("TwitchDropsApp");

            const faqs = await db.collection('faq').find({}).toArray();
            console.log(faqs);
            res.status(200).json(faqs);
            client.close();
        }
        catch (error) {
            res.status(500).json({message: "Error connceting to db", error});
        }
    } else {
        res.status(500).json({message: "Invalid API Key"});
    }
});

// PUT API route to update a twitch drop
app.put('/api/updateTwitchDrop', async (req, res) => {
    // hard coded API key. This will need to be checked against the API in database rather than a visible string
    const apiKey = "ef72570ff371408f9668e414353b7b2e";
    console.log(req.headers);

    if (req.headers.apikey == apiKey) {
        try{
            let dropData = req.body
            const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true})
            const db = client.db("TwitchDropsApp");

            await db.collection("twitchDrops").updateOne({itemdefid: dropData.itemdefid}, {$set: {dropData}})
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

// PUT API route to update an faq
app.put('/api/updateTwitchDrop', async (req, res) => {
    // hard coded API key. This will need to be checked against the API in database rather than a visible string
    const apiKey = "ef72570ff371408f9668e414353b7b2e";
    console.log(req.headers);

    if (req.headers.apikey == apiKey) {
        try{
            let faqData = req.body
            const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true})
            const db = client.db("TwitchDropsApp");

            await db.collection("faq").updateOne({question: faqData.question}, {$set: {faqData}})
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

// POST API route to overwrite all drops
app.post('/api/overwriteDrops', async (req, res) => {
    // hard coded API key. This will need to be checked against the API in database rather than a visible string
    const apiKey = "ef72570ff371408f9668e414353b7b2e";
    console.log(req.headers);

    if (req.headers.apikey == apiKey) {
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

app.get('*', (req, res) => { res.sendFile(path.join(__dirname + '/build/index.html'))})
app.listen(8000, () => console.log("listening on port 8000"));