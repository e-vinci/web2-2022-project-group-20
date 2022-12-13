const express = require("express");
const adresseModel = require("../models/adresses");
// const {authorizeUser, authorizeAdmin} = require("../utils/authorize");

const router = express.Router();
/**
 * GET all articles or articles by id
 */
router.get("/", async (req, res) => {

    if (req.query.id) {
        const categories = await adresseModel.getAdresseById(req.query.id);
        return res.json(categories);
    }
    return res.sendStatus(502);

}
);


router.get("/user", async (req, res) => {

    if (req.query.id) {
        const categories = await adresseModel.getAllAdressesUser(req.query.id);
        return res.json(categories);
    }
    return res.sendStatus(502);

}
);



module.exports = router;