DROP SCHEMA IF EXISTS vinced CASCADE;
CREATE SCHEMA vinced;

-- CREATE TABLES
CREATE TABLE vinced.membres (
	id_membre SERIAL PRIMARY KEY,
	email VARCHAR(50) NOT NULL UNIQUE  CHECK ( email <> '' ),
	nom VARCHAR(50) NOT NULL CHECK (nom<>''),
	prenom VARCHAR(50) NOT NULL CHECK (prenom<>''),
	mdp VARCHAR(50) NOT NULL CHECK ( mdp <> '' ),
	image_profil VARCHAR(100), -- TODO: Mettre le path pour l'image par défaut
    is_admin BOOLEAN DEFAULT false,
    balance DOUBLE PRECISION DEFAULT 0 NOT NULL CHECK ( balance >= 0 )

);

CREATE TABLE vinced.adresses (
    id_adresse SERIAL PRIMARY KEY,
    id_membre INTEGER NOT NULL REFERENCES vinced.membres,x
    rue VARCHAR(100) NOT NULL,
    numero VARCHAR(5) NOT NULL,
    boite VARCHAR(5),
    ville VARCHAR(50) NOT NULL,
    code_postal VARCHAR(5) NOT NULL,
    pays VARCHAR(50) NOT NULL
);

CREATE TABLE vinced.categories (
    id_categorie SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL
);

CREATE TYPE vinced.STATUS AS ENUM ('En cours', 'Postée','Resrvée','Vendue');

CREATE TABLE vinced.annonces (
    id_annonce SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL CHECK ( nom <> '' ),
    description VARCHAR(120) NOT NULL CHECK ( description <> '' ),
    id_acheteur INTEGER REFERENCES vinced.membres,
    id_vendeur INTEGER NOT NULL REFERENCES vinced.membres,
    date_pub DATE NOT NULL,
    prix DOUBLE PRECISION NOT NULL CHECK ( prix > 0 ),
    status vinced.STATUS NOT NULL DEFAULT 'Postée',
    photo VARCHAR(50) CHECK ( photo <> '' ),
    id_adresse INTEGER REFERENCES vinced.adresses,
    id_categorie  integer references vinced.categories
);

CREATE TABLE vinced.favoris (
    PRIMARY KEY (id_membre, id_annonce),
    id_membre INTEGER NOT NULL REFERENCES vinced.membres,
    id_annonce INTEGER NOT NULL REFERENCES vinced.annonces
);

CREATE TABLE vinced.photos (
    id_photo SERIAL PRIMARY KEY,
    id_annonce INTEGER NOT NULL  REFERENCES vinced.annonces
);


CREATE TABLE vinced.categories_choisis (
    PRIMARY KEY (id_annonce, id_categorie),
    id_annonce INTEGER NOT NULL REFERENCES vinced.annonces,
    id_categorie INTEGER NOT NULL REFERENCES vinced.categories
);

CREATE TABLE vinced.annonce_photos (
    PRIMARY KEY (id_annonce, id_photo),
    id_annonce INTEGER NOT NULL REFERENCES vinced.annonces,
    id_photo INTEGER NOT NULL REFERENCES vinced.photos
);

-- VUE POUR AVOIR TOUTES LES INFOS D'UN ARTICLE
CREATE OR REPLACE VIEW vinced.cartes_articles AS
    SELECT a.id_annonce,
           a.nom AS "nom_article",
           a.description,
           a.prix,
           a.date_pub,
           a.photo,
           a.status,
           c.nom AS "categorie",
           ma.id_membre AS "id_acheteur",
           ma.nom AS "nom_acheteur",
           ma.prenom AS "prenom_acheteur",
           mv.id_membre AS "id_vendeur",
           mv.nom AS "nom_vendeur",
           mv.prenom AS "prenom_vendeur"
    FROM ( (vinced.annonces a LEFT JOIN vinced.categories c on a.id_categorie = c.id_categorie )
        LEFT JOIN vinced.membres ma ON ma.id_membre = a.id_acheteur )
        JOIN vinced.membres mv ON a.id_vendeur = mv.id_membre
        ;


        

-- VUE POUR AVOIR TOUTES LES INFOS D'UN MEMBRE + DES PETITES STATS
CREATE OR REPLACE VIEW vinced.users_infos AS
SELECT m.id_membre,
       m.email,
       m.nom,
       m.prenom,
       m.is_admin,
       m.image_profil,
       m.balance,
       ad.rue AS "street",
       ad.numero AS "number",
       ad.boite AS "box",
       ad.ville AS "city",
       ad.code_postal AS "zip_code",
       ad.pays AS "country",
       ad.id_adresse AS "address_id",
       a.id_annonce, 
       a.nom,
       a.description,
       a.id_vendeur,
       a.date_pub,
       a.prix,
       a.status,
       a.photo,
       count(a.id_annonce) AS "nbr_annonces_postee",,
       count(CASE WHEN a.status = 'Vendue' THEN a.id_annonce END) AS "nbr_annonces_vendues"
FROM  vinced.membres m LEFT JOIN vinced.annonces a ON m.id_membre = a.id_vendeur LEFT JOIN vinced.adresses ad ON m.id_membre = ad.id_membre
GROUP BY m.id_membre, m.nom, m.prenom, m.is_admin, m.balance,ad.id_adresse;
$2b$10$Gr3.RBDMEwPNerw6tscL6.WbGInic/x2Ni3wr2MAg8A.G0w7L3UCa  
    
-- INSERT INTO MEMBRES
INSERT into vinced.membres VALUES ('true', 'victor.denis@student.vinci.be', 'DENIS','Victor', '$2b$10$Gr3.RBDMEwPNerw6tscL6.WbGInic/x2Ni3wr2MAg8A.G0w7L3UCa', '../images/default.jpg');
INSERT into vinced.membres VALUES ('true', 'mehdi.bouchbouk@student.vinci.be', 'BOUCHBOUK','Mehdi', '$2b$10$Gr3.RBDMEwPNerw6tscL6.WbGInic/x2Ni3wr2MAg8A.G0w7L3UCa', '../images/default.jpg');
INSERT into vinced.membres VALUES (DEFAULT, 'rayan.abarkan@student.vinci.be', 'ABARKAN','Rayan', '$2b$10$Gr3.RBDMEwPNerw6tscL6.WbGInic/x2Ni3wr2MAg8A.G0w7L3UCa', '../images/default.jpg');
INSERT into vinced.membres VALUES ('true', 'antoine.pirelot@student.vinci.be', 'PIRELOT','Antoine', '$2b$10$Gr3.RBDMEwPNerw6tscL6.WbGInic/x2Ni3wr2MAg8A.G0w7L3UCa', '../images/default.jpg');
INSERT into vinced.membres VALUES ('true', 'clement.coegniet@student.vinci.be', 'COEUGNIET','Clément', '$2b$10$Gr3.RBDMEwPNerw6tscL6.WbGInic/x2Ni3wr2MAg8A.G0w7L3UCa', '../images/default.jpg');
INSERT into vinced.membres VALUES (DEFAULT, 'luis.brunard@student.vinci.be', 'BRUNARD','Luis', '$2b$10$Gr3.RBDMEwPNerw6tscL6.WbGInic/x2Ni3wr2MAg8A.G0w7L3UCa', '../images/default.jpg');
INSERT into vinced.membres VALUES (DEFAULT, 'elie.debacker@student.vinci.be', 'DeBacker','Elie', '$2b$10$Gr3.RBDMEwPNerw6tscL6.WbGInic/x2Ni3wr2MAg8A.G0w7L3UCa', '../images/default.jpg');
INSERT into vinced.membres VALUES (DEFAULT, 'olivier.bogearts@student.vinci.be', 'BOGEARTS','Olivier', '$2b$10$Gr3.RBDMEwPNerw6tscL6.WbGInic/x2Ni3wr2MAg8A.G0w7L3UCa', '../images/default.jpg');
INSERT into vinced.membres VALUES (DEFAULT, 'ferdinand.rouxdebezieux@student.vinci.be', 'Roux De Bézieux','Ferdinand', '$2b$10$Gr3.RBDMEwPNerw6tscL6.WbGInic/x2Ni3wr2MAg8A.G0w7L3UCa', '../images/default.jpg');
INSERT into vinced.membres VALUES (DEFAULT, 'arthur.demurger@student.vinci.be', 'DEMURGER','Arthur', '$2b$10$Gr3.RBDMEwPNerw6tscL6.WbGInic/x2Ni3wr2MAg8A.G0w7L3UCa', '../images/default.jpg');

-- INSERT INTO ADRESSES
INSERT INTO vinced.adresses VALUES (DEFAULT, 1, 'Rue de l''abricot', '25', null, 'Bruxelles', '1190', 'Belgique');
INSERT INTO vinced.adresses VALUES (DEFAULT, 4, 'Avenue Brugman', '145', '3A', 'Bruxelles', '1180', 'Belgique');
INSERT INTO vinced.adresses VALUES (DEFAULT, 6, 'Rue des croix de pierre', '40', null, 'Bruxelles', '1160', 'Belgique');
INSERT INTO vinced.adresses VALUES (DEFAULT, 9, 'Rue Victor Rousseau', '65', null, 'Bruxelles', '1190', 'Belgique');

-- INSERT INTO CATEGORIES
INSERT INTO vinced.categories VALUES (DEFAULT, 'Informatique');
INSERT INTO vinced.categories VALUES (DEFAULT, 'jardinage');
INSERT INTO vinced.categories VALUES (DEFAULT, 'Gaming');
INSERT INTO vinced.categories VALUES (DEFAULT, 'Meuble de chambre');
INSERT INTO vinced.categories VALUES (DEFAULT, 'Vetements');

-- INSERT INTO ANNONCES
INSERT INTO vinced.annonces VALUES (DEFAULT, 'PS5', 'PS5 1TO sans lecteur cd', 1, 5, '2022-03-15', 650, 'Resrvée',0,1,1);
INSERT INTO vinced.annonces VALUES (DEFAULT, 'Clavier logitech', 'Clavier logitech mechanique avec RGB', null, 3, '2022-03-15', 65, 'Postée',0,1,4);
INSERT INTO vinced.annonces VALUES (DEFAULT, 'Assistant alexa', 'Alexa 2de gen', 4, 2, '2022-03-19', 90, 'En cours',0,4,3);
INSERT INTO vinced.annonces VALUES (DEFAULT, 'Table de chevet', 'Table de chevet IKEA (ref: chtêmöl)', 7, 9, '2022-09-26', 45, 'Vendue',0,1,5);
INSERT INTO vinced.annonces VALUES (DEFAULT, 'Plaid', 'Plaid chaud pour l''hiver', null, 5, '2022-04-02', 650, 'Postée',0,2,1);
INSERT INTO vinced.annonces VALUES (DEFAULT, 'Pull col roulé', 'Pull col roulé tommy taille m', null, 6, '2022-05-22', 65, 'Postée',0,1,2);

-- INSERT INTO FAVORIS
INSERT INTO vinced.favoris VALUES (1, 6);
INSERT INTO vinced.favoris VALUES (5, 4);
INSERT INTO vinced.favoris VALUES (2, 1);
INSERT INTO vinced.favoris VALUES (4, 4);
INSERT INTO vinced.favoris VALUES (8, 4);
INSERT INTO vinced.favoris VALUES (3, 1);
INSERT INTO vinced.favoris VALUES (7, 3);

-- INSERT INTO CATEGORIES CHOISIS
INSERT INTO vinced.categories_choisis VALUES (1, 1);
INSERT INTO vinced.categories_choisis VALUES (1, 3);
INSERT INTO vinced.categories_choisis VALUES (2, 1);
INSERT INTO vinced.categories_choisis VALUES (2, 3);
INSERT INTO vinced.categories_choisis VALUES (3, 1);
INSERT INTO vinced.categories_choisis VALUES (3, 4);
INSERT INTO vinced.categories_choisis VALUES (4, 4);
INSERT INTO vinced.categories_choisis VALUES (5, 5);
INSERT INTO vinced.categories_choisis VALUES (6, 5);

