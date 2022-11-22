const jwt = require("jsonwebtoken");
const { Members } = require("../models/members");

const memberModel = new Members();
const {jwtSecret} = process.env;

const authorizeAdmin = async (req, res, next) => {
    const token = req.get("Authorization");
    if (!token) return res.status(401).end();
    try {
        const decoded = jwt.verify(token, jwtSecret);
        const memberFound = await memberModel.getMemberById(decoded.idUser);
        if (!memberFound) return res.status(403).end();
        if (!memberFound.is_admin) return res.status(403).end();
        req.user = memberFound;
        next();
    } catch (err) {
        console.error("authorize: ", err);
        return res.status(403).end();
    }
};

const authorizeUser = async (req, res, next) => {
    const token = req.get("Authorization");
    if (!token)
        return res.status(401).end();
    try {
        const decoded = jwt.verify(token, jwtSecret);
        const memberFound = await memberModel.getMemberById(decoded.idUser);
        if (!memberFound) return res.status(403).end();
        req.user = memberFound;
        next();
    } catch (err) {
        console.error("authorize: ", err);
        return res.status(403).end();
    }
};

module.exports = { authorizeAdmin, authorizeUser }; 