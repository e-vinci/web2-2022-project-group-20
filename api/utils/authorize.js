const jwt = require("jsonwebtoken");
const memberModel = require("../models/members");

const jwtSecret = process.env.jwtsecret;

const authorizeAdmin = async (req, res, next) => {
    const token = req.get("Authorization");
    if (!token) return res.status(401).end();
    try {
        const decoded = jwt.verify(token, jwtSecret);
        const memberFound = await memberModel.getMemberById(decoded.idMembre);
        if(memberFound === 1) return res.status(409).end();
        if (!memberFound) return res.status(403).end();
        if (!memberFound.is_admin) return res.status(403).end();
        req.user = memberFound;
        return next();
    } catch (err) {
        return res.status(403).end();
    }
};

const authorizeUser = async (req, res, next) => {
    const token = req.get("Authorization");
    if (!token)
        return res.status(401).end();
    try {
        const decoded = jwt.verify(token, jwtSecret);
        const memberFound = await memberModel.getMemberById(decoded.idMembre);
        if (!memberFound) return res.status(403).end();
        req.user = memberFound;
        return next();
    } catch (err) {
        return res.status(403).end();
    }
};

module.exports = { authorizeAdmin, authorizeUser }; 