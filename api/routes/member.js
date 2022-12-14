const express = require('express');
const memberModel = require('../models/members');

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

router.post('/register', async (req, res) => {
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
  if (authenticatedMember === 1) return res.status(409).end();

  try {
    req.session.idMember = authenticatedMember.id_membre;
    req.session.token = authenticatedMember.token;
  } catch (e) {
    res.status(500);
  }
  return res.json(authenticatedMember);
});

router.post('/login', async (req, res) => {
  if (
    !req.body ||
    (req.body.email && req.body.email === '') ||
    (req.body.password && req.body.password === '')
  ) {
    return res.status(400).end();
  }
  const authenticatedMember = await memberModel.login(req.body);

  if (authenticatedMember === 0) return res.sendStatus(404).end();
  if (authenticatedMember === 1) return res.sendStatus(403).end();

  try {
    req.session.idMember = authenticatedMember.id_membre;
    req.session.token = authenticatedMember.token;
  } catch (e) {
    res.status(500);
  }
  return res.json(authenticatedMember);
});

/**
 * Update the blance of a member to add credit
 */
router.post("/addCredits", async (req, res) => {
  // Send an error code '400 Bad request' if the body parameters are not valid
  
  if (
    !req.body ||
    (req.body.id_member && req.body.id_member.length === 0) ||
    (req.body.credits && req.body.credits.length === 0)
  )
    return res.status(400).end();

    try {
      const member = await memberModel.addCredits(req.body.credits, req.body.id_member);
      if (!member) return res.status(304).end();
      return res.json(member);
    } catch (error) {
      return res.status(420).end();
    }
});

 

/**
 * Update the blance of a member to delete credit
 */
router.post("/removeCredits", async (req, res) => {
  // Send an error code '400 Bad request' if the body parameters are not valid
  if (
    !req.body ||
    (req.body.id_member && req.body.id_member.length === 0) ||
    (req.body.credits && req.body.credits.length === 0)
  )
    return res.status(400).end();

    try {
      const member = await memberModel.removeCredits(req.body.credits, req.body.id_member);
      if (!member) return res.status(304).end();
      return res.json(member);
    } catch (error) {
      return res.status(420).end();
    }
});

/**
 * Grant a member to admin
 */
router.post("/promoteOne", async (req, res) => {
  if (
    !req.body ||
    (req.body.email && req.body.email.length === 0) 
  )
    return res.status(400).end();

    try {
      const member = await memberModel.promoteOne(req.body);
      if (!member) return res.status(304).end();
      return res.json(member);
    } catch (error) {
      return res.status(420).end();
    }
});

/**
 * Revoke a member to no admin
 */
router.post("/demoteOne", async (req, res) => {

  if (
    !req.body ||
    (req.body.email && req.body.email.length === 0) 
  )
    return res.status(400).end();

  try {
    const member = await memberModel.demoteOne(req.body);
    if (!member) return res.status(304).end();
    return res.json(member);
  } catch (error) {
    return res.status(420).end();
  }
});


/**
 * Update a normal member to a ban status
 */
router.post("/banOne", async (req, res) => {
  if (
      !req.body ||
      (req.body.email && req.body.email.length === 0) 
    )
      return res.status(400).end();
      
  
  try {
    const member = await memberModel.banOne(req.body);
    if (!member) return res.status(304).end();
    return res.json(member);
  } catch (error) {
    return res.status(420).end();
  }
});

/**
 * Update a ban member to a normal status
 */
router.post("/unbanOne", async (req, res) => {
  if (
    !req.body ||
    (req.body.email && req.body.email.length === 0) 
  )
    return res.status(400).end();
    
  try {
    const member = await memberModel.unbanOne(req.body);
    if (!member) return res.status(304).end();
    return res.json(member);
  } catch (error) {
    return res.status(420).end();
  }
});

/**
 * GET all member with a normal status
 */

router.get("/getAdminMembers", async (req, res) => {
  try {
    const membersFound = await memberModel.getAdminMembers();
    return res.json(membersFound);
  } catch (e) {
    return res.sendStatus(502);
  }
},
);

/**
 * GET all member with a normal status
 */

router.get("/getActiveMembers", async (req, res) => {
  try {
    const membersFound = await memberModel.getActiveMembers();
    return res.json(membersFound);
  } catch (e) {
    return res.sendStatus(502);
  }
},
);

/**
 * GET all member with a ban status
 */
router.get("/getBannedMembers", async (req, res) => {  
  try {
    const membersFound = await memberModel.getBannedMembers();
    return res.json(membersFound);
  } catch (e) {
    return res.sendStatus(502);
  }
}

);


module.exports = router;