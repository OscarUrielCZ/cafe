/* PORT */

process.env.PORT = process.env.PORT || 3000;

/* ENVIROMENT */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/* DATABASE */

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb://tester:tester1234@ds123556.mlab.com:23556/nodejs-cafe';
}

process.env.URLDB = urlDB;