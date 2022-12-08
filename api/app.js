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

app.use('/articles',cors({origin: 'http://localhost:8080'}), articlesRouter);
app.use('/members',cors({origin: 'http://localhost:8080'}), membersRouter);
app.use('/favorites',cors({origin: 'http://localhost:8080'}), favoritesRouter);
app.use('/profil',cors({origin: 'http://localhost:8080'}), profilRouter);
app.use('/categories',cors({origin: 'http://localhost:8080'}), categoriesRouter);

module.exports = app;
