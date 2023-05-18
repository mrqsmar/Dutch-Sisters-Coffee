SU_340_Group_Project

### Installation
In order to quickstart the project, do the following on flip2.

## Backend
```sh
$ git clone https://github.com/anthony-rk/OSU_340_Group_Project.git
$ cd OSU_340_Group_Project
$ npm install
$ npm run start
```
Then go to: http://flip2.engr.oregonstate.edu:8299/ (your flip server may be different)

If you would like to run the app with nodemon so that any changes made in development will automatically reload the app, replace npm run start with the following command.
```sh
$ npm run watch
```

## Frontend
I would highly recommend reading through this post on ed before working on the frontend to get some background on how react runs on flip: https://edstem.org/us/courses/37897/discussion/3123529

The following commands assume you already cloned the repo to your terminal on flip.
```sh
$ cd OSU_340_Group_Project/frontend
$ npm install
```
Then go to: http://flip2.engr.oregonstate.edu:8300/ (your flip server may be different)
Any changes made to the frontend will not show up on the flip server unless you run the following and reload the webpage:
```sh
$ npm run build
```