const express = require("express");
const articleModel = require("../models/articles");
// const {authorizeUser, authorizeAdmin} = require("../utils/authorize");

const router = express.Router();
/**
 * GET all articles or articles by id
 */
router.get("/", async (req, res) => {
    
    if (req.query.id) {
        const articles = await articleModel.getInfosForArticleById(req.query.id);
        return res.json(articles);
    }
    try {
        const articles = await articleModel.getAllInfosForAllArticles();
        return res.json(articles);
    } catch (e) {
        return res.sendStatus(502);
    }}
);

/**
 * GET one articleby its id
 */

// à supprimer cest uselless jle laisse juste au cas ou ( en plus ca niquais tout)
// router.get("/:id", async (req, res) => {
//     if(req.params.id > 0){
//         try {
//             const articles = await articleModel.getAllInfosForArticleById(req.query.id);
//             return res.json(articles);
//         } catch (e) {
//             return res.sendStatus(502);
//         }
//     }else{
//         try {
//             const cartes = await articleModel.getAllInfosForAllArticles();
//             return res.json(cartes);
//         } catch (e) {
        
//             return res.sendStatus(502);
//         }
//     }
// });

// /**
//  * GET all articles with all infos for cards
//  */
// router.get('/cartes', async (req, res) => {
//     try {
//       const cartes = await articleModel.getAllInfosForAllArticles();
//       return res.json(cartes);
//     } catch (e) {
      
//       return res.sendStatus(502);
//     }
//   });
  

/**
 * GET all articles by user id
 */
router.get("/user", async (req, res) => {
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
router.get("/favorite/:id", async (req, res) => {
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
router.get("/category", async (req, res) => {
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
router.get("/search", async (req, res) => {
    try {
        const articles = await articleModel.getArticlesBySearch(req.query.search);
        return res.json(articles);
    } catch (e) {
        return res.sendStatus(502);
    }

});

/**
 * POST a new article
    */
router.post("/", async (req, res) => {
    try {
        const article = {
            nom: req.body.nom,
            description: req.body.description,
            id_categorie: req.body.id_categorie,
            id_vendeur: 1,
            prix: req.body.prix,
            photo: req.body.photo
        };
        // eslint-disable-next-line no-console
        const createArticle = await articleModel.createArticle(article);
        return res.json(createArticle);
        }
    catch{
        return res.sendStatus(502);
    }
});

        


module.exports = router;