require('dotenv').config()
require('./hijacker.console')
const express = require('express');
const router = require('./routers/main.router');
const { default: mongoose } = require('mongoose');
const trimAllDataMD = require('./middleware/trim.middleware');
const port = process.env.PORT || 4000;
async function server() {
    try {
        const app = express();
        app.use(express.json()); // use to get contents from api (body, params, query etc...
        app.use(trimAllDataMD); // use to trim all body, query and params
        await mongoose.connect(process.env.MONGODB);
        console.log('MongoDB is connected.');
        app.use('/', router);
        app.listen(port, () => console.log(`Server connected with ${port}`));
    } catch (error) {
        console.error(error);
    }
}

server();