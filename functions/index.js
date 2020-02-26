const functions = require('firebase-functions');
const firebaseAdmin = require('firebase-admin');
const express = require('express');
const firebase = require('firebase');
const dotenv = require('dotenv');
dotenv.config();

firebaseAdmin.initializeApp();
let db = firebaseAdmin.firestore();
let app = express();

let firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.API_KEY,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
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
            let usersRef = db.collection('users').doc(userID);
            let linksRef = usersRef.collection('social_links');

            let data = await usersRef.get();
            let result = data.data();
            let socialLinks = await linksRef.get();
            if (socialLinks.docs.length > 0) {
                result['links'] = socialLinks.docs.map((item) => {
                    let itemObj = item.data();
                    itemObj['id'] = item.id;
                    return itemObj;
                });
            } else {
                result['links'] = [];
            }
            response.status(200).send(JSON.stringify(result))
        } catch (e) {
            console.log("ERROR " + e);
            response.status(500).json({'error': "User not found"}).send();
        }
    }
);


app.post(
    '/saveLink',
    (async (request, response) => {
        response.set('Access-Control-Allow-Origin', '*');
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
    res.set('Access-Control-Allow-Origin', '*');
    let requestData = JSON.parse(req.body);
    const newUser = {
        email: requestData.email,
        password: requestData.password,
        handle: requestData.handle,
        name: requestData.name
    };
    /// TODO send proper response back to app
    let token, userId;
    db.doc(`/users/${newUser.handle}`).get()
        .then(document => {
            if (document.exists) {
                return res.status(400).json({'response': "This username is already taken"})
            }
            return firebase.auth()
                .createUserWithEmailAndPassword(newUser.email, newUser.password);
        }).then(data => {
        userId = data.user.uid;
        return data.user.getIdToken();
    }).then(idtoken => {
        token = idtoken;
        const userCredentials = {
            handle: newUser.handle,
            email: newUser.email,
            createdAt: new Date().toISOString(),
            name: newUser.name,
            userId
        };
        return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    }).then(() => {
        return res.status(201).json({'response': token});
    })
        .catch(err => {
            if (err.code === 'auth/email-already-in-use') {
                return res.status(400).json({email: 'Email is already is use'});
            } else {
                return res
                    .status(500)
                    .json({general: 'Something went wrong, please try again'});
            }
        });
});

exports.api = functions.https.onRequest(app);