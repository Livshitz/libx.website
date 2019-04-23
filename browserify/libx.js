global.libx = require('libx.js/bundles/browser.essentials');
libx.log.debug('browserify statring');

if (global.projconfig != null) global.libx._projconfig = global.projconfig;
if (global._ == null) global._ = libx._;

window.bundular = libx.di.register('bundular', require('bundularjs'));
// libx.di.register('redux', require('libx.js/modules/redux'));
libx.di.register('rx', global.rxjs); // Register globally injected rxjs script

// Setup log:
libx.di.require(log=>{
	log.isDebug = true;
	// log.isShowStacktrace = true;
})

// Firebase and related modules instantiation:
global._firebase = global.firebase.initializeApp(projconfig.firebaseConfig);
var firebase = require('libx.js/modules/firebase')(global._firebase, global.firebase);
libx.di.register('firebase', firebase);
var userManager = require('libx.js/browser/userManager')(firebase);
libx.di.register('userManager', userManager);

// libx.di.register('EventsStore', require('libx.js/modules/eventsStore'));
global.appEvents = libx.di.require((appEvents)=>{
	appEvents.subscribe(ev=>ev.type=='test', (x)=>console.log('state: ', x))
	appEvents.subscribeOnce(ev=>ev.type=='test', (x)=>console.log('state2: ', x))
	appEvents.subscribe(ev=>ev.type=='test', (x)=>console.log('stateHist: ', x), appEvents.history)
});

libx.log.verbose('browserify ready');

global.tt = require('./modules/test.ts')
