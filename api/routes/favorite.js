const express = require("express");
const favoriteModel = require("../models/favorites");

const router = express.Router();

// router.get("/", async (req, res) => {
//     try{
//         const articles = await favoriteModel.getAllLikeByMemberId(req.query.id);
//         return res.json(articles);
//     }catch{

//     }
// })

// router.delete("/", async (req, res) => {
//     if (!req.body ||
//         (req.body.id_membre && req.body.id_membre === "") ||
//         (req.body.id_article && req.body.id_article === ""))
//         return res.status(400);
//     const favorite = await favoriteModel.toggleFavorite(req.body);
//     return favorite;
// })

router.post("/", async (req, res) => {
    try{
        if (!req.body ||
            (req.body.id_membre && req.body.id_membre === "") ||
            (req.body.id_article && req.body.id_article === ""))
            return res.sendStatus(400);
        
            const favorite = await favoriteModel.toggleFavorite(req.body);

            return res.json(favorite);  
    }catch{
        return res.status(502);
    }
   
});

module.exports = router;