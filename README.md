# server for vocabulary-training-app
It's simple node.js server which allows to store foreign words to DB. And provide them to client for trainings.

## How to run project
    1. clone repo form https://github.com/piton13/vocabulary-training-server to server folder
    2. move to server folder (cd server)
    3. install all dependencies (npm install)
    4. run project (npm start)
    5. deploy project to heroku (continuous deployment to heroku was configured)

## Features to implement
    - [x] Implement endpoint to store words to DB.
    - [x] Implement endpoint to obtain random set of not learned words.
    - [x] Implement logic for handling obtained translations.
    - [ ] Implement logic for making backups to local storage.
    - [x] Implement handling of db communication errors.
    - [x] Implement error handler middleware.
    - [x] Implement versioning of api
    - [ ] Implement caching requests
    - [ ] Authorization for users.
    - [+/-] Add unit and integration tests.
    - [ ] Increase test coverage.
    - [x] Implement CI.
    - [x] Implement deploy to heroku.
    - [ ] Documentation for api. (swagger)
    - [ ] Implement connection with DB. (redis)

## Server is available on https://vocabulary-training.herokuapp.com/