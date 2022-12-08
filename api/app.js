require("dotenv").config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');



const articlesRouter = require('./routes/article');
const membersRouter = require('./routes/member');
const favoritesRouter = require("./routes/favorite");
const profilRouter = require('./routes/profil');
const categoriesRouter = require('./routes/category');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/articles', articlesRouter);
app.use('/members', membersRouter);
app.use('/favorites', favoritesRouter);
app.use('/profil', profilRouter);
app.use('/categories', categoriesRouter,cors({origin: 'http://localhost:8080', credentials: true}));

module.exports = app;
