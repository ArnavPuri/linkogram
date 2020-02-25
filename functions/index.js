const functions = require('firebase-functions');
const firebaseAdmin = require('firebase-admin');
const express = require('express');
const firebase = require('firebase');

firebaseAdmin.initializeApp();
let db = firebaseAdmin.firestore();
let app = express();

var firebaseConfig = {
    apiKey: "AIzaSyCPREuPY_RxffPaFmMy5Ce7EFOUtAv39Tc",
    authDomain: "achieve-goals.firebaseapp.com",
    databaseURL: "https://achieve-goals.firebaseio.com",
    projectId: "achieve-goals",
    storageBucket: "achieve-goals.appspot.com",
    messagingSenderId: "316063201308",
    appId: "1:316063201308:web:d7b5bb9b5b03a7b8d807d9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// export GOOGLE_APPLICATION_CREDENTIALS="/Users/arnavpuri/Downloads/firebase_key.json"

app.get(
    '/getLinks',
    async (req, response) => {
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
            response.status(200).send(JSON.stringify(result)).send()
        } catch (e) {
            console.log("ERROR " + e);
            response.status(500).json({'error': "User not found"}).send();
        }
    }
);


app.post(
    '/saveLink',
    (async (request, response) => {
        let requestData = JSON.parse(request.body);
        let userID = requestData.userID;
        let linksRef = db.collection('users').doc(userID).collection('social_links');
        let socialLinks = await linksRef.add(requestData);
        response.set('Access-Control-Allow-Origin', '*');
        response.status(200);
        response.send(JSON.stringify({"response": "OK"}))
    })
);


app.post(
    '/deleteLink',
    (async (request, response) => {
        let requestData = JSON.parse(request.body);
        let linksRef = db.collection('users').doc('arnavanytime@gmail.com').collection('social_links');
        response.set('Access-Control-Allow-Origin', '*');
        try {
            await linksRef.doc(requestData.linkID).delete();
            response.status(200).json({"result": "Deleted successfully"}).send();
        } catch (e) {
            response.status(500).json({"result": "Failed with error"}).send();
        }
    })
);


app.post('/signup', (req, res) => {
    console.log(JSON.parse(req.body));
    let requestData = JSON.parse(req.body);
    db.doc(`/users/${requestData.handle}`).get()
        .then(document => {
            if (document.exists) {
                return res.status(400).json({'response': "This username is already taken"})
            } else {
                return firebase.auth()
                    .createUserWithEmailAndPassword(requestData.email, requestData.password);
            }
        }).then(data => {
        return data.user.getIdToken();
    }).then(token => {
        return res.status(201).json({'response': token}).send();
    }).catch(e => {
        console.log(e);
        return res.status(500).json({'response': `Error occured: ${e.errorCode}`}).send()
    });
});

exports.api = functions.https.onRequest(app);