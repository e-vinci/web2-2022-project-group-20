const db = require('../db/db');
const memberModel = require('./members');

const articlesDB = {
  getAllArticles: async () => {
    const query = `SELECT id_annonce,
                              nom,
                              description,
                              id_acheteur,
                              id_vendeur,
                              date_pub,
                              prix,
                              status
                        FROM vinced.annonces
                        ORDER BY id_annonce DESC`;
    const { rows } = await db.query(query);
    return rows;
  },  
  getAllPictures: async () => {
    const query = `SELECT id_annonce,photo
                        FROM vinced.annonces
                        ORDER BY id_annonce DESC`;
    const { rows } = await db.query(query);
    return rows;
  },

  getAllInfosForAllArticles: async () => {
    const query = `SELECT id_annonce,
                        nom_article,
                        description,
                        prix,
                        date_pub,
                        categorie,
                        photo,
                        id_vendeur,
                        id_acheteur,
                        nom_vendeur,
                        prenom_vendeur
                FROM vinced.cartes_articles`;
    try {
      const { rows } = await db.query(query);
      return rows;
    } catch (e) {
      throw new Error('Error while getting this article from the database.');
    }
  },
  getInfosForArticleById: async (id) => {
    const query = {
      text: `SELECT id_annonce,
                        nom_article,
                        description,
                        prix,
                        date_pub,
                        status,
                        photo,
                        categorie,
                        id_acheteur,
                        nom_acheteur,
                        prenom_acheteur,
                        id_vendeur,
                        nom_vendeur,
                        prenom_vendeur,
                        id_adresse
                FROM vinced.cartes_articles
                WHERE id_annonce = $1`,
      values: [id],
    };

      const { rows } = await db.query(query);
      return rows;

  },
  getArticleById: async (id) => {
    // eslint-disable-next-line no-console
    console.log(`gef art ${id}`);
    const query = {
      text: `SELECT id_annonce,
                              nom,
                              description,
                              id_acheteur,
                              id_vendeur,
                              date_pub,
                              prix,
                              status
                       FROM vinced.annonces
                       WHERE id_annonce = $1`,
      values: [id],
    };
    try {
      const { rows } = await db.query(query);
      return rows[0] || null;
    } catch (e) {
      throw new Error('Error while getting this article from the database.');
    }
  },

  getArticlesByUserId: async (id) => {
    const query = {
      text: `SELECT id_annonce,
                                nom,
                                description,
                                id_acheteur,
                                id_vendeur,
                                date_pub,
                                prix,
                                status,
                                photo 
                        FROM vinced.annonces
                        WHERE id_vendeur = $1
                        ORDER BY id_annonce DESC`,
      values: [id],
    };
    try {
      const { rows } = await db.query(query);
      return rows;
    } catch (e) {
      throw new Error('Error while getting all posts from the database.');
    }
  },

  getUsersFavoriteArticles: async (id) => {
    const query = {
      text: `SELECT id_annonce,
                                nom_article,
                                description,
                                id_acheteur,
                                id_vendeur,
                                prenom_vendeur,
                                nom_vendeur,
                                date_pub,
                                prix,
                                status
                        FROM vinced.cartes_articles
                        WHERE id_annonce IN (SELECT id_annonce
                                                FROM vinced.favoris
                                                WHERE id_membre = $1)
                        ORDER BY id_annonce DESC`,
      values: [id],
    };
    try {
      const { rows } = await db.query(query);
      return rows;
    } catch (e) {
      throw new Error('Error while getting all posts from the database.');
    }
  },

  getArticlesByCategoryId: async (id) => {
    const query = {
      text: `SELECT id_annonce,
                                nom,
                                description,
                                id_acheteur,
                                id_vendeur,
                                date_pub,
                                prix,
                                status
                        FROM vinced.annonce
                        WHERE id_categorie = $1
                        ORDER BY id_annonce DESC`,
      values: [id],
    };
    const { rows } = await db.query(query);
    return rows;
  },

  getArticlesBySearch: async (search) => {
    const query = {
      text: `SELECT id_annonce,
                                nom,
                                description,
                                id_acheteur,
                                id_vendeur,
                                date_pub,
                                prix,
                                status
                        FROM vinced.annonces
                        WHERE nom LIKE $1
                        ORDER BY id_annonce DESC`,
      values: [`%${search}%`],
    };
    const { rows } = await db.query(query);
    return rows;
  },

  // POST REQUESTS

  createArticle: async (article) => {
    const query = {
      text: `INSERT INTO vinced.annonces (nom, description, id_vendeur, prix, photo,date_pub,categorie)
                    VALUES ($1, $2, $3, $4, $5,$6,$7)
                    RETURNING id_annonce`,
      values: [
        article.nom,
        article.description,
        article.id_vendeur,
        article.prix,
        article.photo,
        new Date().toISOString().split('T')[0],
        article.categorie,
      ],
    };
    const { rows } = await db.query(query);
    return rows;
  },
  buyArticle: async (idMembre, idArticle) => {
    try {
      if (isNotBuyed(idArticle)) {
        const memberResponse = await memberModel.getMemberById(idMembre);
        const member = memberResponse[0];
        const article = await articlesDB.getArticleById(idArticle);
        // eslint-disable-next-line no-console
        console.log(member.balance);
        if(member.balance - article.prix <0) return;

        await memberModel.removeCredits(article.prix, article.id_acheteur);
        await memberModel.addCredits(article.prix, article.id_vendeur);

        const query = {
          text: `UPDATE vinced.annonces
                SET id_acheteur = $1
                WHERE id_annonce = $2;`,
          values: [idMembre, idArticle],
        };
        await db.query(query);
      }
    } catch {
      throw new Error("Une erreur est parvenue pendant la transaction")
    }
  },
};

async function isNotBuyed(idArticle) {
  const query = {
    text: `SELECT id_acheteur 
        FROM vinced.annonces
        WHERE id_annonce = $1;`,
    values: [idArticle],
  };
  const result = await db.query(query);

  const { rows } = result;
  return rows[0].id_acheteur !== null;
}

module.exports = articlesDB;
