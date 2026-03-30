INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 1, "Bulbasaur", 1, 1, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 1);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 2, "Ivysaur", 2, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 2);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 3, "Venusaur", 3, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 3);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 4, "Venusaur ex", 4, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM cartaa WHERE expansion_id = 1 AND carta_juego_id = 4);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 5, "Caterpie", 1, 1, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 5);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 6, "Metapod", 1, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 6);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 7, "Butterfree", 3, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 7);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 8, "weedle", 1, 1, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 8);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 9, "Kakuna", 1, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 9);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 10, "Beedrill", 3, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 10);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 11, "Oddish", 1, 1, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 11);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 12, "Gloom", 2, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 12);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 13, "Vileplume", 3, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 13);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 14, "Paras", 1, 1, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 14);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 15, "Parasect", 2, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 15);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 16, "Venonat", 1, 1, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 16);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 17, "Venomoth", 2, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 17);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 18, "Bellsprout", 1, 1, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 18);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 19, "Weepinbell", 2, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 19);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 20, "Victreebel", 3, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 20);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 21, "Exeggcute", 1, 1, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 21);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 22, "Exeggutor", 3, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 22);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 23, "Exeggutor ex", 4, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 23);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 24, "Tangela", 1, 1, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 24);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 25, "Scyther", 1, 1, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 25);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 26, "Pinsir", 2, 1, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 26);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 27, "Cottonee", 1, 1, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 27);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 28, "Whimsicott", 2, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 28);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 29, "Petilil", 1, 1, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 29);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 30, "Lilligant", 2, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 30);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 31, "Skiddo", 1, 1, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 31);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 32, "Gogoat", 1, 1, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 32);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 33, "Charmander", 1, 2, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 33);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 34, "Charmeleon", 2, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 34);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 35, "Charizard", 3, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 35);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 36, "Charizard ex", 4, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 36);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 37, "Vulpix", 1, 2, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 37);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 38, "Ninetales", 2, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 38);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 39, "Growlithe", 1, 2, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 39);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 40, "Arcanine", 3, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 40);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 41, "Arcanine ex", 4, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 41);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 42, "Ponyta", 1, 2, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 42);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 43, "Rapidash", 2, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 43);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 44, "Magmar", 1, 2, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 44);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 45, "Flareon", 3, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 45);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 46, "Moltres", 3, 2, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 46);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 47, "Moltres ex", 4, 2, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 47);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 48, "Heatmor", 1, 2, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 48);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 49, "Salandit", 1, 2, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 49);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 50, "Salazzle", 1, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 50);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 51, "Sizzlipede", 1, 2, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 51);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 52, "Centiskorch", 2, 2, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 52);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 53, "Squirtle", 1, 3, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 53);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 54, "Wartortle", 2, 3, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 54);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 55, "Blastoise", 3, 3, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 55);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 56, "Blastoise ex", 4, 3, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 56);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 57, "Psyduck", 1, 3, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 57);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 58, "Golduck", 2, 3, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 58);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 59, "Poliwag", 1, 3, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 59);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 60, "Poliwhirl", 2, 3, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 60);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 61, "Poliwhirl", 3, 3, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 61);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 62, "Tentacool", 1, 3, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 62);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 63, "Tentacruel", 2, 3, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 63);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 64, "Seel", 1, 3, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 64);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 65, "Dewgong", 2, 3, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 65);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 66, "Shellder", 1, 3, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 66);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 67, "Cloyster", 2, 3, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 67);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 68, "Krabby", 1, 3, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 68);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 69, "Kingler", 2, 3, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 69);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 70, "Horsea", 1, 3, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 70);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 71, "Seadra", 2, 3, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 71);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 72, "Goldeen", 1, 3, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 72);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 73, "Seaking", 1, 3, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 73);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 74, "Staryu", 1, 3, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 74);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 75, "Starmie", 2, 3, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 75);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 76, "Starmie ex", 4, 3, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 76);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 77, "Magikarp", 1, 3, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 77);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 78, "Gyarados", 3, 3, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 78);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 79, "Lapras", 3, 3, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 79);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 80, "Vaporeon", 3, 3, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 80);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 81, "Omanyte", 2, 3, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 81);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 82, "Omastar", 3, 3, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 82);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 83, "Articuno", 3, 3, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 83);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 84, "Articuno ex", 4, 3, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 84);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 85, "Ducklett", 1, 3, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 85);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 86, "Swanna", 2, 3, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 86);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 87, "Froakie", 1, 3, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 87);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 88, "Frogadier", 2, 3, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 88);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 89, "Greninja", 3, 3, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 89);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 90, "Pyukumuku", 1, 3, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 90);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 91, "Bruxish", 2, 3, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 91);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 92, "Snom", 1, 3, 1, 1, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 92);

INSERT INTO carta
(expansion_id, carta_juego_id, nombre, rareza_id, energia_id, tipo_id, basico, carta_promo_usable_barajas)
SELECT 1, 93, "Frosmoth", 2, 3, 1, 0, null
FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM carta WHERE expansion_id = 1 AND carta_juego_id = 93);