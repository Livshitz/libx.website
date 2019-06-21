// BundularJS

// This file is intended to be copied into a project that has installed bundularjs.
// Run this to install bundularjs: `npm install --save bundularjs`
// Grab latest fuser.js: `curl -O -L https://raw.githubusercontent.com/Livshitz/bundularjs/master/tools/fuser.js`

const libx = require('libx.js');
libx.node = require('libx.js/node');
libx.pax = require('pax.libx.js');
var bundularjs = {
	fuser: require('bundularjs/modules/fuser'),
};

(async ()=>{
	var secret = libx.node.args.secret || process.env.FUSER_SECRET_KEY;

	var projconfig = libx.node.readPackageJson();
	var libxVer = libx.node.getLibxVersion();
	libx.log.v('project ver: ', projconfig.version);
	libx.log.v('libx ver: ', libxVer);
	// libx.log.v(libx.node.args.env);

	var browserifyOptions = {
		bare: libx.node.args.bare || false,
		tsify: true,
	};

	var modes = {
		devenv: async ()=> {
			libx.log.v('starting devenv');

			await bundularjs.fuser.build({
				watch: true,
				// watchOnlyChanges: true,
				clearLibs: true,
				// secret: secret,
				env: libx.node.args.env,
				runApi: libx.node.args.api || false,
				bare: libx.node.args.bare || false,

				browserify: browserifyOptions,
			})

			// await libx.pax.exec([
			// 	`node ./node_modules/bundularjs/modules/fuser.js --build --serve --watch --clearLibs --secret=${secret} ${libx.node.args.api ? ' --api-run' : ''} ${libx.node.args.env ? '--env='+libx.node.args.env:'' }
			// 	${libx.node.args.bare ? '--bare' : '' }`,
			// ], true);

			await bundularjs.fuser.serve();
		},
		build: async ()=> {
			await bundularjs.fuser.build({
				watch: false,
				clearLibs: true,
				// secret: secret,
				env: libx.node.args.env,
				runApi: libx.node.args.api || false,

				browserify: browserifyOptions,
			})
			// await libx.pax.exec([
			// 	'node ./node_modules/bundularjs/modules/fuser.js --build --clearLibs --env=prod --secret=' + secret,
			// ], true);
		},
		serve: async ()=> {
			await bundularjs.fuser.build({
				watch: false,
				clearLibs: true,
				// secret: secret,
				env: libx.node.args.env,
				runApi: libx.node.args.api || false,
				bare: libx.node.args.bare || false,

				browserify: browserifyOptions,
			})

			await bundularjs.fuser.serve();
		},
		api_deploy: async ()=> {
			var res = await libx.pax.exec([
				'node ./node_modules/bundularjs/modules/fuser.js --api-deploy',
			], true);
		},
		// update: async ()=> {
		// 	var res = await libx.pax.exec([
		// 		'curl -O -L https://raw.githubusercontent.com/Livshitz/bundularjs/master/tools/fuser.js',
		// 	], true);
		// },
	};

	if (libx.node.args.apiDeploy) {
		modes.api_deploy();
	} else if (libx.node.args.dev || libx.node.args.watch) {
		modes.devenv();
	} else if (libx.node.args.build) {
		modes.build();
	} else if (libx.node.args.serve) {
		modes.serve();
	} else {
		modes.devenv();
	}

})();
