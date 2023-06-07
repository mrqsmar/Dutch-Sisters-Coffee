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

You will need to make 2 .env files, one in the root directory for backend and one in the frontend directory for the frontend code. 

for the backend, add the following to the .env file:
DB_HOST=your_db_host, likeley classmysql.engr.oregonstate.edu
DB_USER=your_username
DB_PASSWORD=your_pw
DB_NAME=your_db_name
DB_PORT=your_db_port
DB_URL=your_db_url
FE_PORT=your_frontend_port
FE_URL=your_frontend_url 

for the frontend, add the following to the .env file:
REACT_APP_DB_URL=http://flip2.engr.oregonstate.edu:8299/
REACT_APP_FE_PORT=8300
REACT_APP_FE_URL=http://flip2.engr.oregonstate.edu:8300/