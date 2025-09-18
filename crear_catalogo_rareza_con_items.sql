-- scritp crear catalogo rarezas y sus items
INSERT INTO catalogo
(nombre)
SELECT "rareza cartas";

INSERT INTO items_catalogo
(catalogo_id, nombre)
SELECT 1, "♦";

INSERT INTO items_catalogo
(catalogo_id, nombre)
SELECT 1, "♦♦";

INSERT INTO items_catalogo
(catalogo_id, nombre)
SELECT 1, "♦♦♦";

INSERT INTO items_catalogo
(catalogo_id, nombre)
SELECT 1, "♦♦♦♦";

INSERT INTO items_catalogo
(catalogo_id, nombre)
SELECT 1, "★";

INSERT INTO items_catalogo
(catalogo_id, nombre)
SELECT 1, "★★";

INSERT INTO items_catalogo
(catalogo_id, nombre)
SELECT 1, "★★★";

INSERT INTO items_catalogo
(catalogo_id, nombre)
SELECT 1, "♕";