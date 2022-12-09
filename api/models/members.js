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
                          image_profil,
                          balance
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
                          mdp, 
                          image_profil,
                          is_admin,
                          balance
                    FROM vinced.membres 
                    WHERE email = $1
                    ORDER BY id_membre;`,
            values: [email]
        };

        try {
            const {rows} = await db.query(query);
            return rows[0];
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
                               m.image_profil,
                               balance
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
        const memberFound = await membersDB.getMemberByEmail(body.email);
        if(memberFound) return 1;
        const hashedPassword = await bcrypt.hash(body.password, saltRounds);
        const query = {
            text: `INSERT INTO vinced.membres VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)`,
            values: [body.email, body.lastname, body.firstname, hashedPassword, '../images/default.jpg', false]
        };
        await db.query(query);
        return membersDB.login(body);
    },
    login: async (body) => {
        const memberFound = await membersDB.getMemberByEmail(body.email);
        console.log(memberFound);
        if (!memberFound) return 0;
        const match = await bcrypt.compare(body.password, memberFound.mdp);
        if (!match) return 1;

        const authenticatedMember = {
            id_membre: memberFound.id_membre,
            is_admin: memberFound.is_admin,
            token: "None",
        };
        const token = jwt.sign(
            { idMember: authenticatedMember.id_membre },
            process.env.jwtsecret,
            { expiresIn: LIFETIME_JWT }
        );
        authenticatedMember.token = token;
        return authenticatedMember;
    },
    async addCredits(email, credits, pool){
        try {
          const { rows } = await pool.query('UPDATE vinced.membres SET balance = balance + $1 WHERE email = $2 RETURNING *', [credits, email]);

          if (! rows[0]) return;

          return rows[0];
        } catch (error){
          throw new Error(error);
        }
      },
      async removeCredits(email, credits, pool){
          try {
            const { rows } = await pool.query('UPDATE vinced.membres SET balance = balance - $1 WHERE email = $2 RETURNING *', [credits, email]);

            if (! rows[0]) return;

            return rows[0];
          } catch (error){
            throw new Error(error);
          }
        }
};

module.exports = membersDB;