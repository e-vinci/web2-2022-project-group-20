const express = require("express");
const favoriteModel = require("../models/favorites");
// const authorizeUser = require("../utils/authorize");

const router = express.Router();

router.post("/", async (req, res) => {
    try{
        // eslint-disable-next-line no-console
        console.log(req.body);
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