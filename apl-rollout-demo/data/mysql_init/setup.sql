DROP DATABASE IF EXISTS  testdb;

CREATE DATABASE testdb;

USE testdb;

CREATE TABLE animals (
     id MEDIUMINT NOT NULL AUTO_INCREMENT,
     name CHAR(30) NOT NULL,
     PRIMARY KEY (id)
);

INSERT INTO animals (name) VALUES
    ('dog'),('cat'),('penguin'),
    ('lax'),('whale'),('ostrich');

SELECT * FROM animals;



CREATE TABLE persons (
     id MEDIUMINT NOT NULL AUTO_INCREMENT,
     userid CHAR(30) NOT NULL,
     kanji_name CHAR(50) NOT NULL,
     kanji_fname CHAR(50) NOT NULL,
     pace INT,
     photo_file_name CHAR(50),
     sex CHAR(1),
     passwd CHAR(10),
     PRIMARY KEY (id)
);


INSERT INTO persons (userid, kanji_name, kanji_fname, pace, photo_file_name, sex, passwd)
    VALUES ('tanaka', '田中', '三平', '1', 'tanaka.png', 'M', 'abc987');

INSERT INTO persons (userid, kanji_name, kanji_fname, pace, photo_file_name, sex, passwd)
    VALUES ('suzuki', '鈴木', '慎吾', '2', 'suzuki.png', 'M', 'abc987');

INSERT INTO persons (userid, kanji_name, kanji_fname, pace, photo_file_name, sex, passwd)
    VALUES ('sato',   '佐藤', '健太郎', '3', 'sato.png', 'M', 'abc987');

INSERT INTO persons (userid, kanji_name, kanji_fname, pace, photo_file_name, sex, passwd)
    VALUES ('yamamoto', '山本', '吉之輔', '4', 'yamamoto.png', 'M', 'abc987');

INSERT INTO persons (userid, kanji_name, kanji_fname, pace, photo_file_name, sex, passwd)
    VALUES ('sakata', '坂田', '美和', '3', 'sakata.png', 'F','abc987');

INSERT INTO persons (userid, kanji_name, kanji_fname, pace, photo_file_name, sex, passwd)
    VALUES ('hashimoto', '橋本', 'あかり', '2', 'hashimoto.png','F','abc987');

INSERT INTO persons (userid, kanji_name, kanji_fname, pace, photo_file_name, sex, passwd)
    VALUES ('yamada', '山田', '里菜', '1', 'yamada.png', 'F','abc987');

INSERT INTO persons (userid, kanji_name, kanji_fname, pace, photo_file_name, sex, passwd)
    VALUES ('kawada', '川田', '恵', '3', 'kawada.png', 'F','abc987');

SELECT * FROM persons;


    

