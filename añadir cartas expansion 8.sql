INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 8, "flareon", 3, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 8);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 9, "flareon", 4, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 9);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 71, "flareon", 5, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 71);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 79, "flareon", 6, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 79);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 87, "flareon", 6, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 87);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 16, "vaporeon", 3, 3, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 16);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 72, "vaporeon", 5, 3, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 72);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 25, "jolteon", 3, 4, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 25);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 74, "jolteon", 5, 4, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 74);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 2, "leafeon", 3, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 2);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 70, "leafeon", 5, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 70);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 17, "glaceon", 3, 3, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 17);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 73, "glaceon", 5, 3, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 73);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 28, "espeon", 3, 5, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 28);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 75, "espeon", 5, 5, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 75);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 43, "umbreon", 3, 7, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 43);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 77, "umbreon", 5, 7, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 77);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 33, "sylveon", 3, 5, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 33);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 34, "sylveon", 4, 5, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 34);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 76, "sylveon", 5, 5, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 76);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 81, "sylveon", 6, 5, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 81);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 89, "sylveon", 6, 5, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 89);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 55, "eevee", 1, 10, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 55);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 56, "eevee", 4, 10, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 56);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 78, "eevee", 5, 10, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 78);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 83, "eevee", 6, 10, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 83);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 92, "eevee", 7, 10, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 92);