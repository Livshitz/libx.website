const functions = require('firebase-functions');
const admin = require('firebase-admin');
const http = require('http');
const inspect = require('util').inspect;
const urlUtils = require('url');
const fs = require("fs");
const os = require("os");
const path = require("path");
const Busboy = require('busboy');
const request = require('request');
const cors = require('cors')({origin: true});
const express = require('express');
const app = express();
const url = require('url');

const infra = require('libx.js');
// ---------------------------------------------

// if (global.api == null) global.api = {};

// require('./browserify.js'); // Import infra functions

// global.api.helpers = require('./api-helpers.js'); 
// global.api.shared = require('./api-shared.js');

// const mappingManager = require('./mappingManager.js');

// if (!infra.isDefined(global.counter)) global.counter = 0;

// ---------------------------------------------

var projconfig = infra.readConfig(fs.readFileSync('./build/project.json'), 'dev');
var projName = projconfig.firebaseProjectName; 
console.log('projconfig:projName: ', projName);

var serviceAccount = projconfig.private.firebaseCreds; //require("./firebase-creds.json");

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: "https://" + projName + ".firebaseio.com"
	});
}

// const gcconfig = {
// 	projectId: projName,
// 	keyFilename: credFile
// };
// const gcs = require("@google-cloud/storage")(gcconfig);

global.firebase = require('firebase-admin'); 
// global.firebase.auth = global.firebase.auth();

app.api = {};
var my = {}
my.config = {}

app.use(cors);
app.set('json spaces', 4);

/* ===================== TESTS ===================== */

app.get("/test/:param?", async (req, res)=> {
	// res.status(200).send(`HEY!`);
	// libx.log.debug('Test Done!', projconfig.projectName)
	// return;
	var param = req.params.param;
	libx.log.info('Test: ', param)

	res.status(200).send(`Test (2) param = ${param}`);
	// admin.database().ref('/test').set('hello2!' + new Date());

	// [TBD] - Now send 'setMap' tx
});

app.post("/test", (req, res)=> {
	var val = req.body.val;
	res.status(200).send('HEY! ' + val);
	return;
});

/* ===================== [/] TESTS [/] ===================== */

exports.api2 = functions
	.region('europe-west1')
	.https.onRequest(app);