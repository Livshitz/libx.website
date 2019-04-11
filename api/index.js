const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const express = require('express');
// global.moment = require('moment');
// const http = require('http');
// const inspect = require('util').inspect;
// const urlUtils = require('url');
// const fs = require("fs");
// const os = require("os");
// const path = require("path");
// const Busboy = require('busboy');
// const request = require('request');
// const url = require('url');
const app = express();

app.use(cors);
app.set('json spaces', 4);

const libx = require('libx.js');
libx.gulp = require('libx.js/node/gulp');
libx.node = require('libx.js/node');

/* ===================== Error Handling ===================== */
process
	.on("unhandledRejection", (reason, p) => {
		var err = reason.response != null ? Buffer(reason.response).toString() : reason.message;
			console.error("[Unhandled Rejection at Promise] Error:", err, reason.statusCode || '', reason);
	})
	.on("uncaughtException", err => {
		console.error("Uncaught Exception thrown", err);
		process.exit(1);
	});
/* ===================== Config ===================== */
projconfig = libx.getProjectConfig('./build', (functions.config().secret || {}).fuser_secret_key);
var projName = projconfig.firebaseProjectName; 
libx.log.v('projconfig:projName: ', projName);

var serviceAccount = projconfig.private.firebaseCreds; //require("./firebase-creds.json");
global.firebase = require('firebase-admin'); 
// global.firebase.auth = global.firebase.auth();

var firebaseApp = null;
if (!firebase.apps.length) {
	firebaseApp = firebase.initializeApp({
		credential: firebase.credential.cert(serviceAccount),
		databaseURL: "https://" + projName + ".firebaseio.com"
	});
}

var firebaseWrapper = require('libx.js/modules/firebase')(firebaseApp, firebase);


/* ===================== TESTS ===================== */
//#region Testings
if (libx.node.args.test) {
	// var f = require('libx.js/modules/firebase')(firebaseApp, firebase);
	// var ref = functions.database.ref('/webapp_cache/{id}');
	// await firebaseWrapper.set('/webapp_cache', 'yo ' + new moment().format());
	// var x = await firebaseWrapper.get('/webapp_cache')

	(async ()=>{
		DONE = false;

		var test = async ()=> {
			// <---- Tests here

			libx.log.v('Test: Done! ');
			DONE = true;
		}
		await test();
	})();
	(function wait () {
		if (!DONE) setTimeout(wait, 1000);
	})();
	return;
}
//#endregion

app.get("/test/:param?", async (req, res)=> {
	var param = req.params.param;
	libx.log.info('Test: ', param)
	res.status(200).send(`Test (2) param = ${param}`);
	// firebase.database().ref('/test').set('hello2!' + new Date());
});
app.post("/test", (req, res)=> {
	var val = req.body.val;
	res.status(200).send('HEY! ' + val);
	return;
});

/* ===================== API ===================== */


app.get("/my-endpoint", async (req, res)=> {
	libx.log.v('api:my-endpoint: enter')

	libx.log.v('api:my-endpoint: done')
	return res.status(200).send();
});

/* ===================== Triggers ===================== */

var triggers = {};

triggers.test = functions.database.ref('/test')
	.onWrite((change, context) => {
		// change.before.exists()
		// change.after.exists())
		// const original = change.after.val();
		// libx.log.v('Uppercasing', context.params.pushId, original);
		// const uppercase = original.toUpperCase();
		// You must return a Promise when performing asynchronous tasks inside a Functions such as
		// writing to the Firebase Realtime Database.
		// Setting an "uppercase" sibling in the Realtime Database returns a Promise.
		// return change.after.ref.parent.child('uppercase').set(uppercase);

		const obj = change.after.val();
		libx.log.v('onWrite!', obj);
		firebaseWrapper.set('/webapp_cache', 'onWrite ' + new moment().format());
	});
	// .onCreate((snap, context) => {
	// 	libx.log.v('-- test ', snap.val());
		// if (context.authType === 'ADMIN') {
		// 	// do something
		// } else if (context.authType === 'USER') {
		// 	libx.log.v(snap.val(), 'written by', context.auth.uid);
		// }
	// });



/* ===================== Expose ===================== */
const runtimeOpts = {
	// timeoutSeconds: 540,
	// memory: '1GB'
}
exports.app = {
	triggers: triggers,
	api : functions.runWith(runtimeOpts).region('europe-west1').https.onRequest(app),
};