const logger = require("./system/logger")

const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const cors = require('cors');

const config = require('./config');
const routes = require('./routes');

const app = express();
const renderFile = ejs.renderFile;

app.use(express.static(path.resolve(__dirname, '../client/git_repo/build')));
app.set('views', path.resolve(__dirname, '../client/git_repo/build'));
app.engine('html', renderFile);
app.set('view engine', 'html');
app.use(cors({origin: "*"}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = config.port;

routes(app);

const createServer  = () => {
    app.listen( port, () => {
        logger.info(`server started at http://localhost:${ config.port }`)
    });
};

createServer();