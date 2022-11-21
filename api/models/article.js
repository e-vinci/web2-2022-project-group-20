const defaultarticle = {
    id: 0,
    title: 'Default',
    price: 0,
    description: 'Default',
    id_auteur: 0,
    images: ['https://www.google.com'],
    googlemaplink: 'Bruxelles',
    categorie: 'Default',
    date: 'Default',
    etat: 'Default'
};

router.get('/:id', (req, res) => {
    console.log(`GET /article/${req.params.id}`);
    const id = req.params.id;
    const article = articles.find((article) => article.id === id);

    res.json(article);
  });




