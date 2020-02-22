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

// exports.getLinks = functions.https.onRequest(async(req, response) => {
//  let userID = req.query.id;
//  let linksRef = db.collection('users').doc('arnavanytime@gmail.com');
//  let data = await linksRef.get();
//  let socialLinks = await linksRef.collection('social_links').get();
//  let links = socialLinks.docs.map((item) => {
//   return item.data()
//  });
//  let result = data.data();
//  result['links'] = links;
//
//  response.set('Access-Control-Allow-Origin', '*');
//  response.send(JSON.stringify(result))
// });

exports.saveLink = functions.https.onRequest(async (request, response) => {
    let requestData = JSON.parse(request.body);
    let linksRef = db.collection('users').doc('arnavanytime@gmail.com').collection('social_links');
    let socialLinks = await linksRef.add(requestData);

    response.set('Access-Control-Allow-Origin', '*');
    response.status(200);
    response.send(JSON.stringify({response: "OK"}))
});

