const express = require("express");
const categoryModel = require("../models/categories");
// const {authorizeUser, authorizeAdmin} = require("../utils/authorize");

const router = express.Router();
/**
 * GET all articles or articles by id
 */
router.get("/", async (req, res) => {

    if (req.query.id) {
        const categories = await categoryModel.getCategoryById(req.query.id);
        return res.json(categories);
    }
    try {
        const categories = await categoryModel.getAllCategories();
        return res.json(categories);
    } catch (e) {
        return res.sendStatus(502);
    }}
);



module.exports = router;