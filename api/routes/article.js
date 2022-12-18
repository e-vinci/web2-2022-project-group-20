const express = require('express');
const articleModel = require('../models/articles');
const favoriteModel = require('../models/favorites');

const router = express.Router();
/**
 * GET all articles or articles by id
 */
router.get('/', async (req, res) => {
  if (req.query.id) {
    const articles = await articleModel.getInfosForArticleById(req.query.id);
    return res.json(articles);
  }
  try {
    const articlesResponse = await articleModel.getAllInfosForAllArticles();
    const favoritesResponse = await favoriteModel.getFavorites(req.query.id_member);
    const cartes = { articles: articlesResponse, favorites: favoritesResponse };
    return res.json(cartes);
  } catch (e) {
    return res.sendStatus(502);
  }
});

/**
 * GET all articles by user id
 */
router.get('/user', async (req, res) => {
  try {
    // eslint-disable-next-line no-console
    const articles = await articleModel.getArticlesByUserId(req.query.id);
    return res.json(articles);
  } catch (e) {
    return res.sendStatus(502);
  }
});

/**
 * GET all favorite articles from user id
 */
router.get('/favorite', async (req, res) => {
  try {
    const articles = await articleModel.getUsersFavoriteArticles(req.query.id);
    return res.json(articles);
  } catch (e) {
    return res.sendStatus(502);
  }
});

/**
 * GET all articles by category id
 */
router.get('/category', async (req, res) => {
  try {
    const articles = await articleModel.getArticlesByCategoryId(req.query.id);
    return res.json(articles);
  } catch (e) {
    return res.sendStatus(502);
  }
});

/**
 * GET all articles by search
 */
router.get('/search', async (req, res) => {
  try {
    const articles = await articleModel.getArticlesBySearch(req.query.search);
    return res.json(articles);
  } catch (e) {
    return res.sendStatus(502);
  }
});
/**
 * GET all articles pics
 */
router.get('/pics', async (req, res) => {
    const articles = await articleModel.getAllPictures();
    return res.json(articles);

});

/**
 * POST a new article
 */
router.post('/', async (req, res) => {
  try {
    const article = {
      nom: req.body.nom,
      description: req.body.description,
      id_categorie: req.body.id_categorie,
      id_vendeur: 1,
      prix: req.body.prix,
      photo: req.body.photo,
    };
    const createArticle = await articleModel.createArticle(article);
    return res.json(createArticle);
  } catch {
    return res.sendStatus(502);
  }
});

router.post('/buy', async (req, res) => {
  try {
    const response = await articleModel.buyArticle(req.body.id_membre, req.body.id_article);

    return res.json(response);
  } catch {
    return res.status(502);
  }
});

module.exports = router;
