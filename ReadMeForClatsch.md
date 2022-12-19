# Datenbank_Einfügtext für versuch
# nur noch passwort andern in lib/db.mjs, name der db muss fleich sein
#Einfügtext, zu testzwecken, könnte sich noch ändern

//mariaDB:
MYSQL -u root -p
password: .......

pw admin:   123
pw 70220:   1234
pw 70223:   abcd
pw 70225:   1


DROP DATABASE mubeaVerkaufDataBase;
CREATE DATABASE mubeaVerkaufDataBase;
SHOW DATABASES;
USE mubeaVerkaufDataBase;


CREATE TABLE IF NOT EXISTS userVerkaufMubea (
ID_User int AUTO_INCREMENT,
Erfasst_D_U VARCHAR(100),
Erfasst_Z_U VARCHAR(100),
MA_Nummer VARCHAR(100),
Vorname VARCHAR(100),
Nachname VARCHAR(100),
Passwort_User VARCHAR(100),
RolleUser VARCHAR(100),
AvatarFarbe VARCHAR(100),
PRIMARY KEY (ID_User)
);

SHOW TABLES;

INSERT INTO userVerkaufMubea
(Erfasst_D_U, Erfasst_Z_U, MA_Nummer, Vorname, Nachname, Passwort_User, RolleUser, AvatarFarbe)
VALUES
('01.01.1970','09.21','0001','Admin','Administrator','rTtGwkAwxI6ajLjBmMtZ3w==','Admin','blau'),
('02.01.1970','09.22','70220','Hans','Meier','QsS4jOwHxRt7ztLW6rFOkw==','Chef','rot'),
('03.01.1970','09.23','70223','Max','Mustermann','TKToMaJyQLLbXE0n7Bx2fQ==','Mitarbeiter','grün'),
('04.01.1970','09.24','70225','Güööääuendogan','MééàèaeTurc','v9fOXIvcjOuJeDRAnY2+Mw==','Mitarbeiter','orange');

DESCRIBE userVerkaufMubea;
#SELECT * FROM userVerkaufMubea;

#------------------------------------------------------------------------------------------------
#------------------------------------------------------------------------------------------------
DROP TABLE kundeMubea;

CREATE TABLE IF NOT EXISTS kundeMubea (
ID_K int AUTO_INCREMENT,
ErfasstK VARCHAR(100),
KundeK VARCHAR(100) NOT NULL,
KundenNummer VARCHAR(100) DEFAULT 'open',
OrtK VARCHAR(100),
AdresseK VARCHAR(100),
LandK VARCHAR(100),
#FOREIGN KEY(KundeK) REFERENCES versandListeMubea(KundeV),
#FOREIGN KEY (ID_K) REFERENCES versandListeMubea (KundeK),
#FOREIGN KEY (ID_K) REFERENCES versandListeMubea (ID_E),
#Foreign KEY (ID_K) REFERENCES versandListeMubea(ID_KV)
PRIMARY KEY (ID_K)
);

SHOW TABLES;

DESCRIBE kundeMubea;

INSERT INTO kundeMubea
(ErfasstK, KundeK, KundenNummer, OrtK, AdresseK, LandK)
VALUES
('01.01.1980','Kunde A','0123456789','Chur','Rabengasse 2','Schweiz'),
('02.01.1980','Kunde B','0103124545','Arbon','Rebenstrasse 3','Schweiz'),
('03.01.1980','Kunde C','9876543210','Valsot','Banhofstrasse 34','Österreich');
#------------------------------------------------------------------------------------------------

DROP TABLE versandListeMubea;

CREATE TABLE IF NOT EXISTS versandListeMubea (
ID_E int NOT NULL AUTO_INCREMENT,
VnameE VARCHAR(100),
NnameE VARCHAR(100),
DatumE VARCHAR(100),
UhrzeitE VARCHAR(100),
WunschDatum VARCHAR(100),
#KundeV VARCHAR(100) NOT NULL,
ID_KV int NOT NULL,
MengeTo VARCHAR(100),
ArtikelAnLager VARCHAR(100),
LSimLeitsystem VARCHAR(100),
R_K VARCHAR(100),
ArtikelNichtProd VARCHAR(100)  DEFAULT 'open',
#FOREIGN KEY(KundeV) REFERENCES kundeMubea(KundeK),
#FOREIGN KEY(ID_E) REFERENCES kundeMubea(ID_K),
FOREIGN KEY(ID_KV) REFERENCES kundeMubea(ID_K),
PRIMARY KEY (ID_E)
);

SHOW TABLES;

DESCRIBE versandListeMubea;

INSERT INTO versandListeMubea
(VnameE, NnameE, DatumE, UhrzeitE, WunschDatum, ID_KV, MengeTo, ArtikelAnLager,LSimLeitsystem, R_K, ArtikelNichtProd)
VALUES
('Maxli','SeppäToni','01.01.1999','11.23','02.02.2022','1','101.51','X','X','X','10181234'),
('Sabrina','Hilde','05.07.1985','23.01','03.03.2022','2','20.62','X','','','1018883'),
('Herbert','vonundzu','25.12.1956','15.34','04.04.2022','3','0.62','','X','X','1018822');

#SELECT * FROM versandListeMubea;

#--------------------------------------------------------------------------------------------
SHOW TABLES;

SELECT * FROM kundeMubea;
UPDATE kundeMubea SET KundeK ='Firma Brosch' WHERE ID_K=1;
SELECT * FROM kundeMubea;
SELECT * FROM versandlisteMubea;



#Die Tabelle, welche man sehen möchte:
SELECT versandListeMubea.ID_E, versandListeMubea.VnameE, versandListeMubea.NnameE, versandListeMubea.DatumE, versandListeMubea.UhrzeitE, versandListeMubea.WunschDatum, kundeMubea.KundeK, versandListeMubea.MengeTo, versandListeMubea.ArtikelAnLager, versandListeMubea.LSimLeitSystem, versandListeMubea.R_K, versandListeMubea.ArtikelNichtProd FROM versandListeMubea INNER JOIN kundeMubea ON kundeMubea.ID_K=versandListeMubea.ID_KV;






#------------------------ab hier nicht in DB kopieren------------------------------------------------
#--------------------------------------------------------------------------------------------
#---------------------***************************+funktioniert
DROP DATABASE mubeaVerkauf1DataBase;
CREATE DATABASE mubeaVerkauf1DataBase;
SHOW DATABASES;
USE mubeaVerkauf1DataBase;

CREATE TABLE author (
id int AUTO_INCREMENT,
name VARCHAR(100),
PRIMARY KEY (id)
);

CREATE TABLE book (
id int AUTO_INCREMENT,
title VARCHAR(200),
author_id int,
FOREIGN KEY (author_id) REFERENCES author (id)
ON DELETE CASCADE
ON UPDATE RESTRICT,
PRIMARY KEY (id)
);

SHOW TABLES;
DESCRIBE author;
DESCRIBE book;
#-------------------------------------------------------------------------
#  https://www.youtube.com/watch?v=rFssfx37UJw
DROP DATABASE mubeaVerkauf2DataBase;
CREATE DATABASE mubeaVerkauf2DataBase;
SHOW DATABASES;
USE mubeaVerkauf2DataBase;

CREATE TABLE customers (
customer_id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(50),
last_name VARCHAR(50)
);

INSERT INTO customers (first_name, last_name)
VALUES  
("Fred", "Fish"),
("Larry", "Lobster"),
("Bubble", "Bass");

SELECT * FROM customers;



# Add a named foreign key constraint to a new table

CREATE TABLE transactions (
transaction_id INT PRIMARY KEY AUTO_INCREMENT,
amount DECIMAL(5, 2),
customer_id INT,
FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

INSERT INTO transactions(amount, customer_id)
VALUES (4.99, 3),
(2.89, 2),
(3.38, 3),
(4.99, 1);

SELECT * FROM transactions;

SELECT * FROM transactions, customers;

UPDATE customers SET first_name = 'Hansoo' WHERE customer_id=1;
SELECT * FROM transactions, customers;


#----------------------------------------.
#  https://www.youtube.com/watch?v=rFssfx37UJw
DROP DATABASE mubeaVerkauf2DataBase;
CREATE DATABASE mubeaVerkauf2DataBase;
SHOW DATABASES;
USE mubeaVerkauf2DataBase;

CREATE TABLE customers (
customer_id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(50),
last_name VARCHAR(50)
);

INSERT INTO customers (first_name, last_name)
VALUES  
("Fred", "Fish"),
("Larry", "Lobster"),
("Bubble", "Bass");

SELECT * FROM customers;



# Add a named foreign key constraint to a new table

CREATE TABLE transactions (
transaction_id INT PRIMARY KEY AUTO_INCREMENT,
amount DECIMAL(5, 2),
customer_idT INT,
FOREIGN KEY (customer_idT) REFERENCES customers(customer_id)
);

INSERT INTO transactions(amount, customer_idT)
VALUES (4.99, 3),
(2.89, 2),
(3.38, 3),
(4.99, 1);

SELECT * FROM transactions;

SELECT * FROM transactions, customers;

UPDATE customers SET first_name = 'Hansoo' WHERE customer_id=1;
SELECT * FROM transactions, customers;


#---------------------------------------------------+
#https://www.youtube.com/watch?v=unREmbNASaI
DROP DATABASE mubeaVerkauf3DataBase;
CREATE DATABASE mubeaVerkauf3DataBase;
SHOW DATABASES;
USE mubeaVerkauf3DataBase;

CREATE TABLE city (
c_id INT NOT NULL AUTO_INCREMENT,
cityname VARCHAR(50) NOT NULL,
PRIMARY KEY (c_id)
);
INSERT INTO city(cityname)
VALUES ('chur'),
('landquart'),
('Zurich');

CREATE TABLE customers(
id INT NOT NULL,
fname VARCHAR(50),
lname VARCHAR(50),
city INT NOT NULL,
PRIMARY KEY (id),
Foreign KEY (city) REFERENCES city(c_id)
);
INSERT INTO customers(id,fname, lname, city)
VALUES (24, 'hans', 'deen',1),
(25, 'peter','muster',2),
(26, 'maria', 'mariadb',3);

SELECT * FROM customers;
SELECT * FROM city;
SELECT customers.id, customers.fname, customers.lname, city.cityname FROM customers INNER JOIN city ON city.c_id=customers.city;
#funktioniert mit inner Join, nun kann man sich vorstellen, wie die DB ausschauen soll...
#SELECT * FROM customers, city;
#SELECT cityname,id,fname from city, customers;