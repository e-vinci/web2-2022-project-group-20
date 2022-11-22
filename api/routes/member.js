const express = require("express");
const {Members: Member} = require("../models/members");
// const {authorizeUser, authorizeAdmin} = require("../utils/authorize");

const router = express.Router();
const membersModel = new Member();

/**
 * GET member by its id
 */
router.get("/:email", async (req, res) => {
    try {
        const articles = await membersModel.getMemberById(req.params.email);
        return res.json(articles);
    } catch (e) {
        return res.sendStatus(502);
    }
});

/**
 * GET all members who fav an article by its id
 */
router.get("/article/:id", async (req, res) => {
    try {
        const articles = await membersModel.getFavotiteOfAnArticle(req.params.id);
        return res.json(articles);
    } catch (e) {
        return res.sendStatus(502);
    }
});

router.post("/register", async function (req, res) {
    if (!req.body ||
        (req.body.hasOwnProperty("nom") && req.body.nom === "") ||
        (req.body.hasOwnProperty("prenom") && req.body.prenom === "") ||
        (req.body.hasOwnProperty("email") && req.body.email === "") ||
        (req.body.hasOwnProperty("mdp") && req.body.mdp === ""))
        return res.status(400).end();

    const authenticatedUser = await membersModel.register(req.body);
    if (!authenticatedUser) return res.status(409).end();

    // Pour mettre l'user en session :
    // req.session.idUser = authenticatedUser.idUser;
    // req.session.token = authenticatedUser.token;

    return res.json(authenticatedUser);
});

router.post("/login", async function (req, res, next) {
    if (!req.body ||
        (req.body.hasOwnProperty("email") && req.body.email === "") ||
        (req.body.hasOwnProperty("mdp") && req.body.mdp === ""))
        return res.status(400).end();

    const authenticatedUser = await membersModel.login(req.body);
    if(authenticatedUser === 0)
        return res.sendStatus(404).end();
    if(authenticatedUser === 1)
        return res.sendStatus(403).end();

    req.session.idUser = authenticatedUser.id_user;
    req.session.token = authenticatedUser.token;

    return res.json(authenticatedUser);
});

module.exports = router;