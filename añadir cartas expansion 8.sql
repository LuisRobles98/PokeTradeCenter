INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 8, "Flareon", 3, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 8);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 9, "Flareon ex", 4, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 9);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 71, "Flareon", 5, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 71);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 79, "Flareon ex", 6, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 79);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 87, "Flareon ex", 6, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 87);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 16, "Vaporeon", 3, 3, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 16);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 72, "Vaporeon", 5, 3, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 72);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 25, "Jolteon", 3, 4, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 25);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 74, "Jolteon", 5, 4, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 74);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 2, "Leafeon", 3, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 2);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 70, "Leafeon", 5, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 70);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 17, "Glaceon", 3, 3, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 17);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 73, "Glaceon", 5, 3, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 73);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 28, "Espeon", 3, 5, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 28);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 75, "Espeon", 5, 5, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 75);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 43, "Umbreon", 3, 7, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 43);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 77, "Umbreon", 5, 7, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 77);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 33, "Sylveon", 3, 5, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 33);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 34, "Sylveon ex", 4, 5, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 34);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 76, "Sylveon", 5, 5, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 76);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 81, "Sylveon ex", 6, 5, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 81);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 89, "Sylveon ex", 6, 5, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 89);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 55, "Eevee", 1, 10, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 55);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 56, "Eevee ex", 4, 10, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 56);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 78, "Eevee", 5, 10, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 78);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 83, "Eevee ex", 6, 10, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 83);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 8, 92, "Eevee ex", 7, 10, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 8 AND carta_juego_id = 92);