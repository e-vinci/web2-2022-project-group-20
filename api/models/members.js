const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/db');

const saltRounds = 10;
const LIFETIME_JWT = 24 * 60 * 60 * 1000;

const membersDB = {
  getAdminMembers: async () => {
    const query = {
      text: `SELECT id_membre,
      email,
      nom,
      prenom,
      is_admin,
      is_banned,
      image_profil
        FROM vinced.membres
        WHERE is_banned = false 
        AND is_admin = true 
        ORDER BY nom;`,
    };

    try {
      const { rows } = await db.query(query);
      return rows;
    } catch (e) {
      throw new Error('Error while getting active members from the database.');
    }
  },
  getActiveMembers: async () => {
    const query = {
      text: `SELECT id_membre,
      email,
      nom,
      prenom,
      is_admin,
      is_banned,
      image_profil
        FROM vinced.membres
        WHERE is_banned = false  
        AND is_admin = false 
        ORDER BY nom;`,
    };

    try {
      const { rows } = await db.query(query);
      return rows;
    } catch (e) {
      throw new Error('Error while getting active members from the database.');
    }
  },
  getBannedMembers: async () => {
    const query = {
      text: `SELECT id_membre,
      email,
      nom,
      prenom,
      is_admin,
      is_banned,
      image_profil
        FROM vinced.membres
        WHERE is_banned = true  
        ORDER BY nom;`,
    };

    try {
      const { rows } = await db.query(query);
      return rows;
    } catch (e) {
      throw new Error('Error while getting active members from the database.');
    }
  },
  getMemberById: async (id) => {
    const query = {
      text: `SELECT id_membre,
                    email,
                    nom,
                    prenom,
                    is_admin,
                    is_banned,
                    phone,
                    image_profil,
                    balance,
                    nbr_annonces_postee,
                    nbr_annonces_vendues,
                    street, 
                    number,
                    box,
                    city,
                    zip_code,
                    country
              FROM vinced.users_infos
              WHERE id_membre = $1
              ORDER BY id_membre;`,
      values: [id]
    };
    try {
      const { rows } = await db.query(query);
      return rows;
    } catch (e) {
      throw new Error('Error while getting this member from the database.');
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
                          is_banned,
                          balance
                    FROM vinced.membres 
                    WHERE email = $1
                    ORDER BY id_membre;`,
      values: [email],
    };
    const { rows } = await db.query(query);
    const result = rows[0] ? rows[0] : null;
    return result;
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
      values: [idArticle],
    };
    try {
      const { rows } = await db.query(query);
      return rows;
    } catch (e) {
      throw new Error('Error while getting all posts from the database.');
    }
  },
  register: async (body) => {
    const memberFound = await membersDB.getMemberByEmail(body.email);
    if (memberFound) return 1;
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);
    const query = {
      text: `INSERT INTO vinced.membres VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7)`,
      values: [
        body.email,
        body.lastname,
        body.firstname,
        hashedPassword,
        body.phone,
        '../images/default.jpg',
        false,
      ],
    };
    await db.query(query);
    const loggedMember = await membersDB.login(body);
    return loggedMember;
  },
  login: async (body) => {
    const memberFound = await membersDB.getMemberByEmail(body.email);
    if (!memberFound) return 0;
    const match = await bcrypt.compare(body.password, memberFound.mdp);
    if (!match) return 1;

    const authenticatedMember = {
      id_membre: memberFound.id_membre,
      is_admin: memberFound.is_admin,
      token: 'None',
    };
    const token = jwt.sign({ idMember: authenticatedMember.id_membre }, process.env.jwtsecret, {
      expiresIn: LIFETIME_JWT,
    });
    authenticatedMember.token = token;

    return authenticatedMember;
  },
  addCredits: async (credits, idMember) => {
    try {
      const query = {
        text: 'UPDATE vinced.membres SET balance = balance + $1 WHERE id_membre = $2 RETURNING *',
        values: [credits, idMember],
      };

      const { rows } = await db.query(query);
 
      return rows || null;
    } catch (error) {
      throw new Error(error);
    }
  },
  removeCredits: async (credits, idMember) => {
    try {
      const query = {
        text: 'UPDATE vinced.membres SET balance = balance - $1 WHERE id_membre = $2 RETURNING *',
        values: [credits, idMember],
      };

      const { rows } = await db.query(query);

      return rows || null;
    } catch (error) {
      throw new Error(error);
    }
  }, 
  promoteOne: async (body) => {
    try {
      const query = {
        text: 'UPDATE vinced.membres SET is_admin = true WHERE email = $1 RETURNING *;',
        values: [body.email],
      };

      const { rows } = await db.query(query);

      return rows || null;
    } catch (error) {
      throw new Error(error);
    }
  },
  demoteOne: async (body) => {
    try {
      const query = {
        text: 'UPDATE vinced.membres SET is_admin = false WHERE email = $1 RETURNING *;',
        values: [body.email],
      };

      const { rows } = await db.query(query);

      return rows || null;
    } catch (error) {
      throw new Error(error);
    }
  },
  banOne: async (body) => {
    try {
      const query = {
        text: 'UPDATE vinced.membres SET is_banned = true AND is_admin = false WHERE email = $1 RETURNING *;',
        values: [body.email],
      };
      const { rows } = await db.query(query);

      return (rows || null);
    } catch (error) {
      throw new Error(error);
    }
  },
  unbanOne: async (body) => {
    try {
      const query = {
        text: 'UPDATE vinced.membres SET is_banned = false WHERE email = $1 RETURNING *;',
        values: [body.email],
      };

      const { rows } = await db.query(query);

      return rows || null;
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = membersDB;