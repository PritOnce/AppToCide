CREATE DATABASE APP_CIDE;
USE APP_CIDE;

CREATE TABLE users (
id int primary key auto_increment,
username varchar(20) not null,
password varchar(20) not null
);

insert into users (username, password) values ("prit", "prit");

select * from users;