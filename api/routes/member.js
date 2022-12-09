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
    (req.body.lastname && req.body.lastname === '') ||
    (req.body.firstname && req.body.firstname === '') ||
    (req.body.email && req.body.email === '') ||
    (req.body.password && req.body.password === '')
  )
    return res.status(400).end();

  const authenticatedMember = await memberModel.register(req.body);
  if (!authenticatedMember) return res.status(409).end();

  try{
    req.session.idMember = authenticatedMember.idMember;
    req.session.token = authenticatedMember.token;
    }catch(e){
      // eslint-disable-next-line no-console
      console.error(e);
    }
  
  return res.json(authenticatedMember);
});

router.post("/login", async (req, res) => {
    if (!req.body ||
      (req.body.email && req.body.email === "") ||
      (req.body.password && req.body.password === "")){
        return res.status(400).end();
    }
  const authenticatedMember = await memberModel.login(req.body);
  if (authenticatedMember === 0) return res.sendStatus(404).end();
  if (authenticatedMember === 1) return res.sendStatus(403).end();

  try{
  req.session.idMember = authenticatedMember.idMember;
  req.session.token = authenticatedMember.token;
  }catch(e){
    // eslint-disable-next-line no-console
    console.error(e);
  }

  return res.json(authenticatedMember);
});

module.exports = router;
