CREATE DATABASE bdEjemploPy;
USE bdEjemploPy;

-- schema
CREATE TABLE countries  (
    Id INT NOT NULL,
    ISO3 VARCHAR(3) NOT NULL,
    CountryName VARCHAR(64) NOT NULL,
    Capital VARCHAR(64) NOT NULL,
    CurrencyCode VARCHAR(3) NOT NULL,
    PRIMARY KEY(Id)
)
;

-- data 9 rows
INSERT INTO Countries
    (Id, ISO3, CountryName, Capital, CurrencyCode)
VALUES
    (1,'ARG', 'Argentina', 'Buenos Aires', 'ARS'),
    (2,'COL', 'Colombia', 'Bogota', 'COP'),
    (3,'MEX', 'Mexico', 'CDMX', 'MXN'),
    (4,'PER', 'PERU', 'Lima', 'PEN'),
    (5,'AUS', 'Australia', 'Canberra', 'AUD'),
    (6,'DEU', 'Germany', 'Berlin', 'EUR'),
    (7,'IND', 'India', 'New Delhi', 'INR'),
    (8,'LAO', 'Laos', 'Vientiane', 'LAK'),
    (9,'USA', 'United States', 'Washington', 'USD')   
;