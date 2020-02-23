const functions = require('firebase-functions');
const firebaseAdmin = require('firebase-admin');
const express = require('express');

firebaseAdmin.initializeApp();
let db = firebaseAdmin.firestore();
let app = express();


app.get(
    '/getLinks',
    async (req, response) => {
        let userID = req.query.id;
        let linksRef = db.collection('users').doc('arnavanytime@gmail.com');
        let data = await linksRef.get();
        let socialLinks = await linksRef.collection('social_links').get();
        let links = socialLinks.docs.map((item) => {
            return item.data()
        });
        let result = data.data();
        result['links'] = links;

        response.set('Access-Control-Allow-Origin', '*');
        response.send(JSON.stringify(result))
    }
);

// app.post()

exports.getLinks = functions.https.onRequest(async (req, response) => {
    let userID = req.query.id;
    response.set('Access-Control-Allow-Origin', '*');
    try {
        let linksRef = db.collection('users').doc(userID);
        let data = await linksRef.get();
        let socialLinks = await linksRef.collection('social_links').get();
        let links = socialLinks.docs.map((item) => {
            let itemObj = item.data();
            itemObj['id'] = item.id;
            return itemObj;
        });
        let result = data.data();
        result['links'] = links;
        response.status(200).send(JSON.stringify(result))
    } catch (e) {
        console.log("ERROR");
        response.status(500).json({'error': "User not found"});
    }


});

exports.saveLink = functions.https.onRequest(async (request, response) => {
    let requestData = JSON.parse(request.body);
    let userID = requestData.userID;
    let linksRef = db.collection('users').doc(userID).collection('social_links');
    let socialLinks = await linksRef.add(requestData);

    response.set('Access-Control-Allow-Origin', '*');
    response.status(200);
    response.send(JSON.stringify({"response": "OK"}))
});


exports.deleteLink = functions.https.onRequest(async (request, response) => {
    let requestData = JSON.parse(request.body);
    let linksRef = db.collection('users').doc('arnavanytime@gmail.com').collection('social_links');
    response.set('Access-Control-Allow-Origin', '*');
    try {
        await linksRef.doc(requestData.linkID).delete();
        response.status(200).json({"result": "Deleted successfully"});
    } catch (e) {
        response.status(500).json({"result": "Failed with error"});
    }
});

