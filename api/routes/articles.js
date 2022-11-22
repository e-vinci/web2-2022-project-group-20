const express = require("express");
const {Articles} = require("../models/articles");
// const {authorizeUser, authorizeAdmin} = require("../utils/authorize");

const router = express.Router();
const articlesModel = new Articles();

/**
 * GET all articles
 */
router.get("/", async (req, res) => {
    try {
        const articles = await articlesModel.getAllArticles();
        return res.json(articles);
    } catch (e) {
        return res.sendStatus(502);
    }
});

/**
 * GET a article by id
 */
router.get("/:id", async (req, res) => {
    try {
        const article = await articlesModel.getArticleById(req.params.id);
        return res.json(article);
    } catch (e) {
        return res.sendStatus(502);
    }
});

/**
 * GET all articles by user id
 */
router.get("/user/:id", async (req, res) => {
    try {
        const articles = await articlesModel.getArticlesByUserId(req.params.id);
        return res.json(articles);
    } catch (e) {
        return res.sendStatus(502);
    }
});

/**
 * GET all articles by category id
 */
router.get("/category/:id", async (req, res) => {
    try {
        const articles = await articlesModel.getArticlesByCategoryId(req.params.id);
        return res.json(articles);
    } catch (e) {
        return res.sendStatus(502);
    }
});

/**
 * GET all articles by search
 */
router.get("/search/:search", async (req, res) => {
    try {
        const articles = await articlesModel.getArticlesBySearch(req.params.search);
        return res.json(articles);
    } catch (e) {
        return res.sendStatus(502);
    }
});


module.exports = router;