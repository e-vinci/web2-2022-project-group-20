const db = require("../db/db");

const articlesDB = {

     getAllArticles : async () => {
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
            const {rows} = await db.query(query);
            return rows;
        
    },

    getInfosForArticleCard : async () => {
        const query = `SELECT id_annonce,
                        nom_article,
                        description,
                        prix,
                        date_pub,
                        photo
                        id_vendeur,
                        nom_vendeur,
                        prenom_vendeur
                FROM vinced.cartes_articles`;
                const {rows} = await db.query(query);
                return rows;
    },

    getArticleById : async (id) => {
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
            values: [id]
        };
        try {
            const {rows} = await db.query(query);
            return rows;
        } catch (e) {
            throw new Error("Error while getting this post from the database.");
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
                                status
                        FROM vinced.annonces
                        WHERE id_vendeur = $1
                        ORDER BY id_annonce DESC`,
            values: [id]
        };
        try {
            const {rows} = await db.query(query);
            return rows;
        } catch (e) {
            throw new Error("Error while getting all posts from the database.");
        }
    },

    getUsersFavoriteArticles : async (id) =>{
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
                        WHERE id_annonce IN (SELECT id_annonce
                                                FROM vinced.favoris
                                                WHERE id_user = $1)
                        ORDER BY id_annonce DESC`,
            values: [id]
        };
        try {
            const {rows} = await db.query(query);
            return rows;
        } catch (e) {
            throw new Error("Error while getting all posts from the database.");
        }
    },

    getArticlesByCategoryId : async (id) =>{
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
                        WHERE id_categorie = $1
                        ORDER BY id_annonce DESC`,
            values: [id]
        };
        try {
            const {rows} = await db.query(query);
            return rows;
        } catch (e) {
            throw new Error("Error while getting all posts from the database.");
        }
    },

    getArticlesBySearch : async (search) => {
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
                        WHERE nom ILIKE '%$1%'
                        ORDER BY id_annonce DESC`,
            values: [search]
         };
        try {
            const {rows} = await db.query(query);
            return rows;
        } catch (e) {
            throw new Error("Error while getting all posts from the database.");
        }
    },

    // POST REQUESTS

    createArticle : async (article) => {

        const query = {
            text: `INSERT INTO vinced.annonces (nom, description, id_vendeur, prix, photo,date_pub)
                    VALUES ($1, $2, $3, $4, $5,$6)
                    RETURNING id_annonce`,
            values: [article.nom, article.description, article.id_vendeur, article.prix, article.photo,new Date().toISOString().split('T')[0]]
        };
            const {rows} = await db.query(query);
            return rows;

    }
}

module.exports = articlesDB;



