CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    primeiro_nome VARCHAR(100) NOT NULL,
    ultimo_nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    estado VARCHAR(50) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TABLE artigo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    url_imagem_capa VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES usuario(id)
);

CREATE TABLE materiais_descartaveis (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE eventos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    contato VARCHAR(100) NOT NULL,
    data DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES usuario(id)
);

CREATE TABLE ponto_de_coleta (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    contato VARCHAR(100) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES usuario(id)
);

CREATE TABLE likes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT ,
    ponto_coleta_id INT,
    user_id INT NOT NULL,
    FOREIGN KEY (event_id) REFERENCES eventos(id),
    FOREIGN KEY (ponto_coleta_id) REFERENCES ponto_de_coleta(id),
    FOREIGN KEY (user_id) REFERENCES usuario(id)
);

CREATE TABLE eventos_materiais_descartaveis (
    id INT PRIMARY KEY AUTO_INCREMENT,
    material_descartavel_id INT NOT NULL,
    event_id INT NOT NULL,
    FOREIGN KEY (material_descartavel_id) REFERENCES materiais_descartaveis(id),
    FOREIGN KEY (event_id) REFERENCES eventos(id)
);

CREATE TABLE ponto_coleta_materiais_descartaveis (
    id INT PRIMARY KEY AUTO_INCREMENT,
    material_descartavel_id INT NOT NULL,
    ponto_coleta_id INT NOT NULL,
    FOREIGN KEY (material_descartavel_id) REFERENCES materiais_descartaveis(id),
    FOREIGN KEY (ponto_coleta_id) REFERENCES ponto_de_coleta(id)
);
