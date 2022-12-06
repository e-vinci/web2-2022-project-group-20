const express = require("express");
// const {authorizeUser, authorizeAdmin} = require("../utils/authorize");

const router = express.Router();
/**
 * GET all articles or articles by id
 */
router.get("/", async (req, res) => {

    try {
        return res.json("Hello World!");
    } catch (e) {
        return res.sendStatus(502);
    }}
);



module.exports = router;