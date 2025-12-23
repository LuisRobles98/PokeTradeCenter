INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 1, "bulbasaur", 1, 1, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 1);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 2, "ivysaur", 2, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 2);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 3, "venusaur", 3, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 3);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 4, "venusaur", 4, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 4);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 5, "caterpie", 1, 1, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 5);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 6, "metapod", 1, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 6);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 7, "butterfree", 3, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 7);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 8, "weedle", 1, 1, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 8);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 9, "kakuna", 1, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 9);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 10, "beedrill", 3, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 10);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 11, "oddish", 1, 1, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 11);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 12, "gloom", 2, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 12);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 13, "vileplume", 3, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 13);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 14, "paras", 1, 1, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 14);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 15, "parasect", 2, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 15);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 16, "venonat", 1, 1, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 16);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 17, "venomoth", 2, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 17);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 18, "bellsprout", 1, 1, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 18);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 19, "weepinbell", 2, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 19);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 20, "victreebel", 3, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 20);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 21, "exeggcute", 1, 1, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 21);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 22, "exeggutor", 3, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 22);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 23, "exeggutor", 4, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 23);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 24, "tangela", 1, 1, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 24);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 25, "scyther", 1, 1, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 25);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 26, "pinsir", 2, 1, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 26);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 27, "cottonee", 1, 1, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 27);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 28, "whimsicott", 2, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 28);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 29, "petilil", 1, 1, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 29);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 30, "lilligant", 2, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 30);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 31, "skiddo", 1, 1, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 31);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 32, "gogoat", 1, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 32);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 33, "charmander", 1, 2, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 33);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 34, "charmeleon", 2, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 34);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 35, "charizard", 3, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 35);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 36, "charizard", 4, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 36);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 37, "vulpix", 1, 2, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 37);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 38, "ninetales", 2, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 38);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 39, "growlithe", 1, 2, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 39);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 40, "arcanine", 3, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 40);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 41, "arcanine", 4, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 41);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 42, "ponyta", 1, 2, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 42);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 43, "rapidash", 2, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 43);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 44, "magmar", 1, 2, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 44);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 45, "flareon", 3, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 45);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 46, "moltres", 3, 2, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 46);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 47, "moltres", 4, 2, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 47);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 48, "heatmor", 1, 2, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 48);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 49, "salandit", 1, 2, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 49);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 50, "salazzle", 1, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 50);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 51, "sizzlipede", 1, 2, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 51);

INSERT INTO cartas
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 52, "centiskorch", 2, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartas WHERE expansion_id = 1 AND carta_juego_id = 52);

