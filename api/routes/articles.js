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

module.exports = router;