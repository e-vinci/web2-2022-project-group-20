require("dotenv").config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const articlesRouter = require('./routes/article');
const membersRouter = require('./routes/member');
const favoritesRouter = require("./routes/favorite");
const categoriesRouter = require('./routes/category');
const adressesRouter = require('./routes/adresse');

const app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    credentials: true
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/articles',cors(corsOptions), articlesRouter);
app.use('/members',cors(corsOptions), membersRouter);
app.use('/favorites',cors(corsOptions), favoritesRouter);
app.use('/categories',cors(corsOptions), categoriesRouter);
app.use('/adresses',cors(corsOptions), adressesRouter);

module.exports = app;
