const db = require("../db/db");

const categoriesDb = {
    getAllCategories: async () => {
        const query = `SELECT id_categorie,
        nom
        FROM vinced.categories
        ORDER BY id_categorie DESC`;
    const {rows} = await db.query(query);
    return rows;

    },

    getCategoryById: async (id) => {
        const query = {
            text: `SELECT id_categorie,
                            nom
                        FROM vinced.categories
                        WHERE id_categorie = $1
                        ORDER BY id_categorie DESC`,
            values: [id]
        };
        try {
            const {rows} = await db.query(query);
            return rows;
        } catch (e) {
            throw new Error("Error while getting the category from the database.");
        }
}
        
};

module.exports = categoriesDb;