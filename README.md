# server for vocabulary-training-app
It's simple node.js server which allows to store foreign words to DB. And provide them to client for trainings.

## How to run project
    1. clone repo form https://github.com/piton13/vocabulary-training-server to server folder
    2. move to server folder (cd server)
    3. install all dependencies (npm install)
    4. run project (npm start)
    5. deploy project to heroku ()

## Features to implement
    - [x] Implement endpoint to store words to DB.
    - [x] Implement endpoint to obtain random set of not learned words.
    - [x] Implement logic for handling obtained translations.
    - [ ] Implement logic for making backups to local storage.
    - [ ] Add unit and integration tests.
    - [ ] Implement CI.
    - [ ] Implement connection with DB. (redis)

## Server is available on https://ancient-bastion-17497.herokuapp.com/