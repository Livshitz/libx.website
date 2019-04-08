console.log('browserify test 4');

global.libx = require('libx.js/bundles/browser.essentials');
if (global.projconfig != null) global.libx._projconfig = global.projconfig;
if (global._ == null) global._ = libx._;

libx.di.register('bundular', require('bundularjs'));

// Firebase and related modules instantiation:
global._firebase = global.firebase.initializeApp(projconfig.firebaseConfig);
var firebase = require('libx.js/modules/firebase')(global._firebase, global.firebase);
libx.di.register('firebase', firebase);
var userManager = require('libx.js/browser/userManager')(firebase);
libx.di.register('userManager', userManager);

libx.log.verbose('browserify ready');
