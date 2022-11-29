require("dotenv").config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const articlesRouter = require('./routes/article');
const membersRouter = require('./routes/member');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/articles', articlesRouter);
app.use('members', membersRouter);

module.exports = app;
