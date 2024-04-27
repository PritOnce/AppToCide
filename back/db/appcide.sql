CREATE DATABASE APP_CIDE;
USE APP_CIDE;

CREATE TABLE users (
id int primary key auto_increment,
username varchar(20) not null,
password varchar(20) not null
);

insert into users (username, password) values ("prit", "prit");

select * from users;

PORTATIL_CLASE=http://172.16.161.76:3001
CASA=http://192.168.1.65:3001
CLASE_ORDENADOR=http://172.16.26.27:3001
LOCALHOST=http://localhost:8081
CASA_LILIAN=http://192.168.0.48:3001

IP_MAIN=http://192.168.1.65:3001