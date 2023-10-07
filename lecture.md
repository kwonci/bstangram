# 1. Introduction

1. Feature of App

2. Tech stack: react(material ui, redux) and firebase(cloud firestore(realtime db), cloud functions, authentication, cloud storage(static file storage)). Expressjs for cloud functions

# 2. Create and Read data

1. Prerequesites: nodejs, visual studio, postman, firebase

2. Cloud functions & firestore for create/read data -> DO

- Blaze plan(pay as use)
- Cloud funtions - Create relationship b/w Firebase project and Project directory
- `yarn deploy` deploys the cloud function(url, min, max instances, timeounut)

3. Simulation

https://firebase.google.com/docs/emulator-suite/install_and_configure

- All services provided by google firebase project can be simulated
- `firebase init emulators` will download corresponding product's emulator binary
- `firebase emulators:start` will start emulator

# 3. Express and formatting response

1. All routes can be configured in one function using express

2. Emulators: every products in firebase can be emulated

# 4. Authetication and signup

1. create signup route and call createUserEmailPassword after enable EmailPassword authentication

2. Firebase doesn't allow additional user information -> To allow, additional logic reuqire

3. Question: do i need to backend for signup, or just frontend signup might be fine? --> GPT recommend front-side 
