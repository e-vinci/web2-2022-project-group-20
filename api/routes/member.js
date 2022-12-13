const express = require('express');
const memberModel = require('../models/members');

// const {authorizeUser, authorizeAdmin} = require("../utils/authorize");

const router = express.Router();

/**
 * GET member by its id
 */
router.get('/', async (req, res) => {
  try {
    const member = await memberModel.getMemberById(req.query.id);

    return res.json(member);
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
      return res.sendStatus(502);
    }

  return res.json(authenticatedMember);
});

router.post("/login", async (req, res) => {
    if (!req.body ||
      (req.body.email && req.body.email === "") ||
      (req.body.password && req.body.password === "")){
        return res.status(400).end();
    }
      // eslint-disable-next-line no-console
      console.log("test");
  const authenticatedMember = await memberModel.login(req.body);
  
  if (authenticatedMember === 0) return res.sendStatus(404).end();
  if (authenticatedMember === 1) return res.sendStatus(403).end();
  
  try{
    req.session.idMember = authenticatedMember.id_membre;
    req.sssion.token = authenticatedMember.token;
  }catch(e){
    return res.status(502);
  }
      // eslint-disable-next-line no-console
  console.log(res.json(authenticatedMember));
  return res.json(authenticatedMember);
});

router.put('/:email/addCredits', async (req, res) => {
  if(
    !req.body ||
    (req.body.credits && req.body.credits.length === 0)
  )
    return res.status(400).end;

  try {
    const member = await memberModel.addCredits(req.params.email, req.body.credits, req.app.pool);
    if (!member) return res.status(304).end();
    return res.json(member);
  }catch (error){
    return res.status(420).end();
  }
})



router.put('/:email/removeCredits', async (req, res) => {
  if(
    !req.body ||
    (req.body.credits && req.body.credits.length === 0)
  )
    return res.status(400).end;

  try {
    const member = await memberModel.removeCredits(req.params.email, req.body.credits, req.app.pool);
    if (!member) return res.status(304).end();
    return res.json(member);
  }catch (error){
    return res.status(420).end();
  }
})


module.exports = router;
