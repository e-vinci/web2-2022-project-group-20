const express = require("express");
const {Articles: Article} = require("../models/articles");
// const {authorizeUser, authorizeAdmin} = require("../utils/authorize");

const router = express.Router();
const articlesModel = new Article();
/**
 * GET all articles or articles by id
 */
router.get("/", async (req, res) => {
    if(req.query.id){
        const articles = await articlesModel.getArticleById(req.query.id);
        return res.json(articles);
    }
    try {
        // eslint-disable-next-line no-console
        console.log("articlesModel: ", articlesModel.getAllArticles());
        const articles = await articlesModel.getAllArticles();
        return res.json(articles);
    } catch (e) {
        return res.sendStatus(502);
    }}
);

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
 * GET all articles by favorite user id
 */
router.get("/favorite/:id", async (req, res) => {
    try {
        const articles = await articlesModel.getUsersFavoriteArticles(req.params.id);
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

/**
 * POST a new article
    */
router.post("/", async (req, res) => {

        const article = {
            nom: req.body.nom,
            description: req.body.description,
            id_vendeur: req.body.id_vendeur,
            prix: req.body.prix,
            photo: req.body.photo
        };
        const newArticle = await articlesModel.createArticle(article);
        return res.json(newArticle);

});

        


module.exports = router;