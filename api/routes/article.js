const express = require("express");
// eslint-disable-next-line no-unused-vars
const { render } = require("../app");
const articleModel = require("../models/articles");
// const {authorizeUser, authorizeAdmin} = require("../utils/authorize");

const router = express.Router();
/**
 * GET all articles or articles by id
 */
router.get("/", async (req, res) => {

    if (req.query.id) {
        const articles = await articleModel.getArticleById(req.query.id);
        return res.json(articles);
    }
    try {
        const articles = await articleModel.getAllArticles();
        return res.json(articles);
    } catch (e) {
        return res.sendStatus(502);
    }}
);


/**
 * GET all articles with all infos for cards
 */
router.get('/cartes', async (req, res) => {
    try {
      const cartes = await articleModel.getInfosForArticleCard();
      return res.json(cartes);
    } catch (e) {
      return res.sendStatus(502);
    }
  });
  

/**
 * GET all articles by user id
 */
router.get("/user/:id", async (req, res) => {
    try {
        const articles = await articleModel.getArticlesByUserId(req.params.id);
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
        const articles = await articleModel.getUsersFavoriteArticles(req.params.id);
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
        const articles = await articleModel.getArticlesByCategoryId(req.params.id);
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
        const articles = await articleModel.getArticlesBySearch(req.params.search);
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
            id_categorie: req.body.id_categorie,
            id_vendeur: req.body.id_vendeur,
            prix: req.body.prix,
            photo: req.body.photo
        };
        // eslint-disable-next-line no-console
        console.log(article);
        return res.redirect('http://localhost:8080/');

        }

);

        


module.exports = router;