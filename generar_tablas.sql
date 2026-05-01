CREATE TABLE IF NOT EXISTS usuario (
	id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    password VARCHAR(45) NOT NULL,
    juego_id VARCHAR(45),
    icono_id INT NOT NULL,
    emblema_1 INT NOT NULL,
    emblema_2 INT NOT NULL,
    emblema_3 INT NOT NULL,
    
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS carta (
	expansion_id INT NOT NULL,
    carta_juego_id INT NOT NULL,
    nombre VARCHAR(128) NOT NULL,
    rareza_id INT NOT NULL,
    energia_id INT,
    tipo_id INT NOT NULL,
    basico TINYINT NOT NULL,
    carta_promo_usable_barajas TINYINT,
    
    PRIMARY KEY (expansion_id, carta_juego_id)
);

CREATE TABLE IF NOT EXISTS carta_usuario (
	usuario_id INT NOT NULL,
    expansion_id INT NOT NULL,
    carta_juego_id INT NOT NULL,
    obtenida TINYINT NOT NULL,
    
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    FOREIGN KEY (expansion_id, carta_juego_id) REFERENCES carta(expansion_id, carta_juego_id)
);

CREATE TABLE IF NOT EXISTS baraja (
	id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(128) NOT NULL,
    
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS baraja_publica (
	id INT NOT NULL AUTO_INCREMENT,
    creador_id INT NOT NULL,
    baraja_id INT NOT NULL,
    fecha_creacion DATETIME NOT NULL,
    
    PRIMARY KEY (id),
    
	FOREIGN KEY (creador_id) REFERENCES usuario(id),
	FOREIGN KEY (baraja_id) REFERENCES baraja(id)
);

CREATE TABLE IF NOT EXISTS baraja_usuario (
	id INT NOT NULL AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    baraja_publica_id INT,
    baraja_id INT NOT NULL,
    fecha_creacion DATETIME NOT NULL,
    
    PRIMARY KEY (id),
    
	FOREIGN KEY (usuario_id) REFERENCES usuario(id),
	FOREIGN KEY (baraja_id) REFERENCES baraja(id)
);

CREATE TABLE IF NOT EXISTS baraja_like (
	usuario_id INT NOT NULL,
    baraja_publica_id INT NOT NULL,
    
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    FOREIGN KEY (baraja_publica_id) REFERENCES baraja_publica(id)
);

CREATE TABLE IF NOT EXISTS carta_baraja (
	baraja_id INT NOT NULL,
    expansion_id INT NOT NULL,
    carta_juego_id INT NOT NULL,
    orden INT NOT NULL,
    
    FOREIGN KEY (baraja_id) REFERENCES baraja(id),
    FOREIGN KEY (expansion_id, carta_juego_id) REFERENCES carta(expansion_id, carta_juego_id)
);

CREATE TABLE IF NOT EXISTS intercambio (
	id INT NOT NULL AUTO_INCREMENT,
	ofertante_id INT NOT NULL,
	contraparte_id INT NULL,
	estado_id INT NOT NULL,
	carta_ofrecer_final_expansion_id INT,
	carta_ofrecer_final_carta_juego_id INT,
	carta_querer_final_expansion_id INT,
	carta_querer_final_carta_juego_id INT,
	fecha_creacion DATETIME NOT NULL,
	fecha_cambio DATETIME NOT NULL,
    
	PRIMARY KEY (id),
    
	FOREIGN KEY (ofertante_id) REFERENCES usuario(id),
	FOREIGN KEY (contraparte_id) REFERENCES usuario(id),
    FOREIGN KEY (carta_ofrecer_final_expansion_id, carta_ofrecer_final_carta_juego_id) REFERENCES carta(expansion_id, carta_juego_id),
    FOREIGN KEY (carta_querer_final_expansion_id, carta_querer_final_carta_juego_id) REFERENCES carta(expansion_id, carta_juego_id)
);

CREATE TABLE IF NOT EXISTS carta_intercambio_ofrecer (
	intercambio_id INT NOT NULL,
	expansion_id INT NOT NULL,
	carta_juego_id INT NOT NULL,
	orden INT NOT NULL,
    
    FOREIGN KEY (intercambio_id) REFERENCES intercambio(id),
    FOREIGN KEY (expansion_id, carta_juego_id) REFERENCES carta(expansion_id, carta_juego_id)
);

CREATE TABLE IF NOT EXISTS carta_intercambio_querer (
	intercambio_id INT NOT NULL,
	expansion_id INT NOT NULL,
	carta_juego_id INT NOT NULL,
	orden INT NOT NULL,
    
    FOREIGN KEY (intercambio_id) REFERENCES intercambio(id),
    FOREIGN KEY (expansion_id, carta_juego_id) REFERENCES carta(expansion_id, carta_juego_id)
);