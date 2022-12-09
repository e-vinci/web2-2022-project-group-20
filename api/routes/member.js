const express = require('express');
const memberModel = require('../models/members');
// const {authorizeUser, authorizeAdmin} = require("../utils/authorize");

const router = express.Router();

/**
 * GET member by its id
 */
router.get('/:email', async (req, res) => {
  try {
    const articles = await memberModel.getMemberById(req.params.email);
    return res.json(articles);
  } catch (e) {
    return res.sendStatus(502);
  }
});

/**
 * GET all members who fav an article by its id
 */
router.get('/article/:id', async (req, res) => {
  try {
    const articles = await memberModel.getFavotiteOfAnArticle(req.params.id);
    return res.json(articles);
  } catch (e) {
    return res.sendStatus(502);
  }
});

router.post("/register", async (req, res) => {
  if (
    !req.body ||
    (req.body.nom && req.body.nom === '') ||
    (req.body.prenom && req.body.prenom === '') ||
    (req.body.email && req.body.email === '') ||
    (req.body.mdp && req.body.mdp === '')
  )
    return res.status(400).end();

  const authenticatedUser = await memberModel.register(req.body);
  if (!authenticatedUser) return res.status(409).end();

  // Pour mettre l'user en session :
  req.session.idUser = authenticatedUser.idUser;
  req.session.token = authenticatedUser.token;

  return res.json(authenticatedUser);
});

router.post("/login", async (req, res) => {
    if (!req.body ||
        (req.body.email && req.body.email === "") ||
        (req.body.mdp && req.body.mdp === ""))
        return res.status(400).end();

  const authenticatedUser = await memberModel.login(req.body);
  if (authenticatedUser === 0) return res.sendStatus(404).end();
  if (authenticatedUser === 1) return res.sendStatus(403).end();

  req.session.idUser = authenticatedUser.id_user;
  req.session.token = authenticatedUser.token;

  return res.json(authenticatedUser);
});

//New todo Estelle
router.put('/:email/addCredits', async function(req, res){
  if(
    !req.body ||
    (req.body.hasOwnProperty("credits") && req.body.credits.length === 0)
  )
    return res.status(400).end;

  try {
    let user = await userModel.addCredits(req.params.email, req.body.credits, req.app.pool);
    if (!user) return res.status(304).end();
    return res.json(user);
  }catch (error){
    return res.status(420).end();
  }
})



router.put('/:email/removeCredits', async function(req, res){
  if(
    !req.body ||
    (req.body.hasOwnProperty("credits") && req.body.credits.length === 0)
  )
    return res.status(400).end;

  try {
    let user = await userModel.removeCredits(req.params.email, req.body.credits, req.app.pool);
    if (!user) return res.status(304).end();
    return res.json(user);
  }catch (error){
    return res.status(420).end();
  }
})


module.exports = router;
