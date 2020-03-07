const functions = require('firebase-functions');
const firebaseAdmin = require('firebase-admin');
const express = require('express');
const firebase = require('firebase');
const dotenv = require('dotenv');
const cors = require('cors');

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
app.use(cors());
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

app.post(
    '/updateLink',
    (async (request, response) => {
        let requestData = request.body;
        let token = requestData.token;
        try {
            let decodedIdToken = await firebaseAdmin.auth().verifyIdToken(token);
            let userRecord = await firebaseAdmin.auth().getUser(decodedIdToken.uid);
            let email = userRecord.email;
            let userSnapshots = await db.collection('users').where('email', '==', email).get();
            let linksRef = userSnapshots.docs[0].ref.collection('social_links').doc(requestData.linkID);

            await linksRef.set({handle: requestData.newHandle}, {merge: true});
            return response.status(200).send({response: "ID Updated"});
        } catch (e) {
            console.log(e);
            return response.status(201).send({response: e});
        }
    })
);

app.post('/signup', async (req, res) => {
    let requestData = req.body;
    const newUser = {
        email: requestData.email,
        password: requestData.password,
        handle: requestData.handle,
        name: requestData.name
    };
    /// TODO send proper response back to app
    let token, userId;
    let userDocument = await db.doc(`/users/${newUser.handle}`).get();
    if (userDocument.exists) {
        return res.status(200).send(JSON.stringify({response: "This username is already taken"}))
    }
    try {
        let userCredential = await firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
        userId = userCredential.user.uid;
        token = userCredential.user.getIdToken();
        const userCredentials = {
            handle: newUser.handle,
            email: newUser.email,
            createdAt: new Date().toISOString(),
            name: newUser.name,
            userId
        };
        await db.doc(`/users/${newUser.handle}`).set(userCredentials);
        return res.status(201).send({response: token});
    } catch (err) {
        console.log('Error in signup ' + err);
        if (err.code === 'auth/email-already-in-use') {
            return res.status(200).send({response: 'Email is already is use'});
        } else {
            return res
                .status(200)
                .send({response: 'Something went wrong, please try again'});
        }
    }
});

app.post('/login', async (req, res) => {
    let requestData = req.body;
    const newUser = {
        email: requestData.email,
        password: requestData.password,
    };
    console.log(requestData);
    /// TODO send proper response back to app
    try {
        let userCredential = await firebase.auth().signInWithEmailAndPassword(newUser.email, newUser.password);
        let token = await userCredential.user.getIdToken();
        return res.status(200).send({response: token});
    } catch
        (error) {
        console.log(`Login failed with error ${error}`);
        return res.status(201).send({response: `Error: ${error.code}`});
    }


});

app.post('/getUser', async (req, res) => {
    let requestData = req.body;
    let token = requestData.token;
    let decodedIdToken = await firebaseAdmin.auth().verifyIdToken(token);
    let userRecord = await firebaseAdmin.auth().getUser(decodedIdToken.uid);
    let email = userRecord.email;
    let snapshots = await db.collection('users').where('email', '==', email).get();
    return res.status(200).send(snapshots.docs[0].data())
});
exports.api = functions.https.onRequest(app);