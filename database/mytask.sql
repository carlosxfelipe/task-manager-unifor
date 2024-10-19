CREATE DATABASE mytask;

USE mytask;

CREATE TABLE tarefa (
    tarefa_id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_finalizacao DATETIME
);

ALTER TABLE tarefa ADD data_edicao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

