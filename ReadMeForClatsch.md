# Datenbank_Einfügtext für versuch
# nur noch passwort andern in utils/db.mjs


//mariaDB:
MYSQL -u root -p
password: .......

pw admin:   123
pw 70220:   1234
pw 70223:   abcd
pw 70225:   1

#Einfügtext, zu testzwecken, könnte sich noch ändern   einfach crtl+c und crtl+v

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
#ID_KV int NOT NULL,
ID_KV int,
MengeTo VARCHAR(100),
ArtikelAnLager VARCHAR(100),
LSimLeitsystem VARCHAR(100),
R_K VARCHAR(100),
ArtikelNichtProd VARCHAR(100)  DEFAULT 'open',
#FOREIGN KEY(KundeV) REFERENCES kundeMubea(KundeK),
#FOREIGN KEY(ID_E) REFERENCES kundeMubea(ID_K),
#FOREIGN KEY(ID_KV) REFERENCES kundeMubea(ID_K),      #funktioniert
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

SELECT * FROM versandlisteMubea;
SELECT * FROM userVerkaufMubea;
SELECT * FROM kundeMubea;

#Die Tabelle, welche man sehen möchte:
SELECT versandListeMubea.ID_E, versandListeMubea.VnameE, versandListeMubea.NnameE, versandListeMubea.DatumE, versandListeMubea.UhrzeitE, versandListeMubea.WunschDatum, kundeMubea.KundeK, versandListeMubea.MengeTo, versandListeMubea.ArtikelAnLager, versandListeMubea.LSimLeitSystem, versandListeMubea.R_K, versandListeMubea.ArtikelNichtProd FROM versandListeMubea INNER JOIN kundeMubea ON kundeMubea.ID_K=versandListeMubea.ID_KV;


