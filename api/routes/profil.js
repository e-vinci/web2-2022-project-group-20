const express = require("express");
const memberModel = require('../models/members');
// const {authorizeUser, authorizeAdmin} = require("../utils/authorize");

const router = express.Router();
/**
 * GET INFORMATION or membre by id
 */
router.get("/:email", async (req, res) => {

    try {
        const information  = await memberModel.getMemberById(req.params.email);
        return res.json(information);
    } catch (e) {
        return res.sendStatus(502);
    }}
);



module.exports = router;