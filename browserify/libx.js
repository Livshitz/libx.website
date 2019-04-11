global.libx = require('libx.js/bundles/browser.essentials');
libx.log.debug('browserify statring');

if (global.projconfig != null) global.libx._projconfig = global.projconfig;
if (global._ == null) global._ = libx._;

window.bundular = libx.di.register('bundular', require('bundularjs'));

// Setup log:
libx.di.inject(log=>{
	log.isDebug = true;
	// log.isShowStacktrace = true;
})

// Firebase and related modules instantiation:
global._firebase = global.firebase.initializeApp(projconfig.firebaseConfig);
var firebase = require('libx.js/modules/firebase')(global._firebase, global.firebase);
libx.di.register('firebase', firebase);
var userManager = require('libx.js/browser/userManager')(firebase);
libx.di.register('userManager', userManager);

libx.log.verbose('browserify ready');
