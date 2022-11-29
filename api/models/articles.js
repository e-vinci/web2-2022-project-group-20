const db = require("../db/db");

class Articles{

    // eslint-disable-next-line class-methods-use-this
    async getAllArticles(){
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
        
    }

    // eslint-disable-next-line class-methods-use-this
    async getArticleById(id){
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
    }


    // eslint-disable-next-line class-methods-use-this
    async getArticlesByUserId(id){
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
    }

    // eslint-disable-next-line class-methods-use-this
    async getUsersFavoriteArticles(id){
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
    }

    // eslint-disable-next-line class-methods-use-this
    async getArticlesByCategoryId(id){
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
    }

    // eslint-disable-next-line class-methods-use-this
    async getArticlesBySearch(search){
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
    }


    // eslint-disable-next-line class-methods-use-this
    async createArticle(article){
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


module.exports = {Articles};



