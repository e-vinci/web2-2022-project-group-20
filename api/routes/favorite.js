const express = require("express");
const favoriteModel = require("../models/favorites");
// const authorizeUser = require("../utils/authorize");

const router = express.Router();

router.post("/", async (req, res) => {
    if (!req.body ||
        (req.body.id_user && req.body.id_user === "") ||
        (req.body.id_post && req.body.id_post === ""))
        return res.sendStatus(400);
    
        const favorite = await favoriteModel.toggleFavorite(req.body);
        if(favorite)
            return res.sendStatus(201);
        return res.json(favorite);
   
});

module.exports = router;