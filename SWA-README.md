# SuperWebApp
Shareable web app infrastructure/stack; based on client-side-only architecture (JAMstack)

------------------------------------

## - Why
Spawning webapps many times contains repeatable, cumbersome and un-linked steps.  
If you setup 2 AngularJS webapps, you'll probably find yourself reusing same styles, formats, common javascript helpers and so on. Maintaining such stack of copied codebases dose not make sense.  
Here comes SuperWebApp, **SWA**.   
With SWA you can choose one of the prebuilt frameworks that suits your flavor, or create your own; customize it and build the webapp around it; pull updates from the publicly shared framework into your webapp.  

**Why is it Super; What makes SWA awesome?**
SWA uses best of the market tools and techniques to facilitate a robust webapp which does not require any backend to operate.
[1] **Serverless**- Uses AngularJS's SPA for paging and routing and Firebase Cloud Functions for secure/private computation
[2] **SEO compatible**- Uses Netlify's Prerender capabilities to server prerendered/cached html version of your dynamic pages
[3] **Efficient**- With sophisticated *watching* mechanisms and cutting edge techniques you'll be editing modular CSS, HTML-less UI ([Pug](https://pugjs.org)), transformed Javascript ([Babel](https://babeljs.io)) and lazy-loading MVC
[4] **Scaleable**- Using the given technology stack, your webapp will be able to scale automatically without any intervention
[5] **Extensiable**- Styles, Routes, Business Logic, Javascript and NodeJS<>Browser shared code are all carefully thought and splitted into extensiable pieces. At any moment you can choose to pull lates updates of the used framework and push your own updates to the public
[6] **Continuous**- CI/CD triggered each commit/pullrequest automatically and deploying your webapp to globally on CDN

**Technology Stack:**
> NodeJS, Firebase, Netlify, AngularJS, Angular-Material, Pug/Jade, LESS, Babel, MetroCss

**Heavily Customized:**
- Robust [gulpfile](https://gulpjs.com/) to handle watch & serve, build and deploy
- Easy HTML coding with PUG style which is on build-time compiled into HTML files
- Views and components compressed and composed into Angular templates (for SEO compatibility)
- Predefined useful styles and helper/infra functions
- Lazy loading AngularJS views and controllers


## - How
SWA's concept is based on git techiniques; you have your own project's git repo, and you will manage the SWA framework with [PSM](https://github.com/Livshitz/ProjectStructureManager) (ProjectStructureManager), a bower-like tool that installs the framework and lets you update it when a new version is available.  
SWA Frameworks are managed as branches of SuperWebApp's repo. Each new commit means new version is available for you to pull (using PSM).
You can modify and change files of the framework, and if you pull new version onto your project and conflicts are found, a merge window like git-merge will be prompted for you to choose which of the new changes you want to take and which of your modifications you want to keep.

## - Setup
The setup involves couple one-time procedures.  
Walkthouth video: [TBD: Link to YouTube video].

| [GitHub](https://github.com): |
| ----- |
| GitHub is used to store the project's files and serve as a trigger when updates (commits) are made to trigger a CI/CD deployment automatically |
1. Create a new repo on github
2. Clone/Init it on your local machine

| [PSM tool](https://github.com/Livshitz/ProjectStructureManager): |
| ----- |
| PSM is used to manage the SWA framework versioning. It's npm/bower for managing project framework (actual folers and files, not plugins) |
1. Open terminal on project's directory
2. Grab psm: ``` curl -sL https://github.com/Livshitz/ProjectStractureManager/raw/master/psm.sh -o psm.sh && chmod +x psm.sh ```
3. Initialize SWA framework ``` ./psm.sh init [repoUrl - (optional) custom branch of different SWA flavor or your own SWA implementation]```
4. Commit & push the changes

| [Firebase](https://firebase.google.com): |
| ----- |
| Firebase is used here for DB services, authentication, backend (serverless) and potentionaly much more. |
1. Set up a new project
2. Grab the project id, and web configurations for this project
3. Edit ```project.json``` config file with those values
4. Generate credentials file (PrivateKey file): `Console` > `Project Settings` > `Service Accounts` > `Generate New Private Key`. Copy this file to ```./fb-functions/functions``` directory (will be used for Cloud Functions to access your firebase project)
5. Grab Firebase token by running `firebase login:ci` and set it in `project.json` config file
6. Set proper rules for your Realtime Database

| [Netlify](https://netlify.com): |
| ----- |
| Firebase is used here for DB services, authentication, backend (serverless) and potentionaly much more. |
1. Set up new project 
2. Link to your Github repository
3. Go to `Settings` > `Build & deploy` > `Single page apps` > `Prerendering` and check the checkbox

## - Start Working:
1. After setting up and editing configs you should be able to run and debug your rig.
2. Install dependencies for webapp & Cloud Functions: `gulp recover`
2. Open terminal to project's root and run `gulp run --dev` (`--dev` is optional, you can omit that otherwise supply differet environment, which is defined in `project.json`)
3. To deploy your website simply commit your changes to github
4. Run your Cloud Functions locally simply run `gulp firebase-runlocal`
4. To deploy your Cloud Functions simply commit your changes (Netlify will run `gulp firebase-deploy-functions` on it's behalf).  
5. Inspect build process at Netlify's deploy console

## - Updating the framework
Simply run `./psm.sh update`.  
Note: Strongly advices to run the above command when no changes are pending in your git (update may result in conflicts which you might want to carefully examin).

----

## - Optional Forther Setup

* **More on Firebase:**
	* **Realtime Database Rules**: We suggest to start with this: 
		```
		{
			"rules": {
				"$all_other_keys": {
					".read": true
				},
				".read": true, // "auth != null",
				".write": "auth != null && auth.uid === 'server-side'",
				"profiles": {
					"$uid": {
						".read": true,
						".write": "$uid == auth.uid"
					}
				},
				"users": {
					"$uid": {
						".read": true,
						".write": "$uid == auth.uid"
					}
				}
			}
		}
		```
	* **Authentication**: Go to `Authentication` tab and enable the wanted auth services. Firebase will guide you how to enable each one of them
	* **Setting up staging project**: Repeat same process but with `-staging` suffix and put the configurations under different `env` section in the `project.json` config file
* [Facebook](https://developers.facebook.com):
	1. [TBD]

* [Google Analytics](https://analytics.google.com):
	1. [TBD] 

* [Algolia](https://algolia.com):
Very powerfull elastic-search tool for quick real time searches. Though, requires fan-outing your data from firebase to Algolia's DB.
	1. [TBD]

