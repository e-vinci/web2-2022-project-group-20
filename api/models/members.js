const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const db = require("../db/db");

const saltRounds = 10;
const LIFETIME_JWT = 24 * 60 * 60 * 1000;

const membersDB = {
    getMemberById: async (idMember) => {
        const query = {
            text: `SELECT id_membre,
                          email,
                          nom,
                          prenom,
                          image_profil
                    FROM vinced.membres 
                    WHERE id_membre = $1
                    ORDER BY id_membre;`,
            values: [idMember]
        };

        try {
            const {rows} = await db.query(query);
            return rows;
        } catch (e) {
            e.print();
            throw new Error("Error while getting all posts from the database.");
        }
    },
    getMemberByEmail: async (email) => {
        const query = {
            text: `SELECT id_membre,
                          email,
                          nom,
                          prenom,
                          image_profil
                    FROM vinced.membres 
                    WHERE email = $1
                    ORDER BY id_membre;`,
            values: [email]
        };

        try {
            const {rows} = await db.query(query);
            return rows;
        } catch (e) {
            e.print();
            throw new Error("Error while getting all posts from the database.");
        }
    },
    getFavotiteOfAnArticle: async (idArticle) => {
        const query = {
            text: `SELECT m.id_membre,
                               m.email,
                               m.nom,
                               m.prenom,
                               m.image_profil
                        FROM vinced.annonces a, vinced.favoris f,vinced.membres m
                        WHERE a.id_annonce = f.id_annonce AND
                              f.id_membre = m.id_membre AND
                              a.id_annonce = $1
                        ORDER BY m.id_membre;`,
            values: [idArticle]
        };

        try {
            const {rows} = await db.query(query);
            return rows;
        } catch (e) {
            e.print();
            throw new Error("Error while getting all posts from the database.");
        }

    },
    register: async (body) => {
        const hashedPassword = await bcrypt.hash(body.mdp, saltRounds);
        const query = {
            text: `INSERT INTO vinced.membres VALUES (DEFAULT, $1, $2, $3, $4, $5)`,
            values: [body.email, body.nom, body.prenom, hashedPassword]
        };

        try {
            const {rows} = await db.query(query);
            return rows;
        } catch (e) {
            e.print();
            throw new Error("Error while getting all posts from the database.");
        }
    },
    login: async (body) => {
        const memberFound = await this.getMemberByEmail(body.email);

        if (!memberFound) return 0;

        const match = await bcrypt.compare(body.password, memberFound.password);
        if (!match) return 1;

        const authenticatedMember = {
            id_user: memberFound.id_user,
            is_admin: memberFound.is_admin,
            token: "None",
        };

        const token = jwt.sign(
            { idUser: authenticatedMember.id_user },
            process.env.jwtSecret,
            { expiresIn: LIFETIME_JWT }
        );

        authenticatedMember.token = token;
        return authenticatedMember;
    }
};

module.exports = membersDB;


// class Favorites{

    // async getMemberById(idMember){
    //     const query = {
    //         text: `SELECT id_membre,
    //                       email,
    //                       nom,
    //                       prenom,
    //                       image_profil
    //                 FROM vinced.membres 
    //                 WHERE id_membre = $1
    //                 ORDER BY id_membre;`,
    //         values: [idMember]
    //     };

    //     try {
    //         const {rows} = await db.query(query);
    //         return rows;
    //     } catch (e) {
    //         e.print();
    //         throw new Error("Error while getting all posts from the database.");
    //     }
    // }

    // eslint-disable-next-line class-methods-use-this
    // async getMemberByEmail(email){
    //     const query = {
    //         text: `SELECT id_membre,
    //                       email,
    //                       nom,
    //                       prenom,
    //                       image_profil
    //                 FROM vinced.membres 
    //                 WHERE email = $1
    //                 ORDER BY id_membre;`,
    //         values: [email]
    //     };

    //     try {
    //         const {rows} = await db.query(query);
    //         return rows;
    //     } catch (e) {
    //         e.print();
    //         throw new Error("Error while getting all posts from the database.");
    //     }
    // }

    // eslint-disable-next-line class-methods-use-this
    // async getFavotiteOfAnArticle(idArticle){
    //     const query = {
    //         text: `SELECT m.id_membre,
    //                            m.email,
    //                            m.nom,
    //                            m.prenom,
    //                            m.image_profil
    //                     FROM vinced.annonces a, vinced.favoris f,vinced.membres m
    //                     WHERE a.id_annonce = f.id_annonce AND
    //                           f.id_membre = m.id_membre AND
    //                           a.id_annonce = $1
    //                     ORDER BY m.id_membre;`,
    //         values: [idArticle]
    //     };

    //     try {
    //         const {rows} = await db.query(query);
    //         return rows;
    //     } catch (e) {
    //         e.print();
    //         throw new Error("Error while getting all posts from the database.");
    //     }
    // }

    // eslint-disable-next-line class-methods-use-this
    // async register(body){
    //     const hashedPassword = await bcrypt.hash(body.mdp, saltRounds);
    //     const query = {
    //         text: `INSERT INTO vinced.membres VALUES (DEFAULT, $1, $2, $3, $4, $5)`,
    //         values: [body.email, body.nom, body.prenom, hashedPassword]
    //     };

    //     try {
    //         const {rows} = await db.query(query);
    //         return rows;
    //     } catch (e) {
    //         e.print();
    //         throw new Error("Error while getting all posts from the database.");
    //     }
    // }


    // async login(body){
    //     const memberFound = await this.getMemberByEmail(body.email);

    //     if (!memberFound) return 0;

    //     const match = await bcrypt.compare(body.password, memberFound.password);
    //     if (!match) return 1;

    //     const authenticatedMember = {
    //         id_user: memberFound.id_user,
    //         is_admin: memberFound.is_admin,
    //         token: "None",
    //     };

    //     const token = jwt.sign(
    //         { idUser: authenticatedMember.id_user },
    //         process.env.jwtSecret,
    //         { expiresIn: LIFETIME_JWT }
    //     );

    //     authenticatedMember.token = token;
    //     return authenticatedMember;
    // }

// }