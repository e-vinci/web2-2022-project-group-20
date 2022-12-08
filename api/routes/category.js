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
        const categories = await categoryModel.getAllCategories();
        return res.json(categories);
   
}
);



module.exports = router;