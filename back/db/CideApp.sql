Create database CideApp;
use CideApp;

Create table userApp (
id int primary key auto_increment,
usuario varchar(20) unique,
contraseña varchar(16)
);
insert into userApp (usuario, contraseña) values ("prit", "prit");
select * from userApp;

Create table contacto (
id int primary key auto_increment,
nombr1 varchar(50) not null,
nombre2 varchar(50),
apellido1 varchar(50) not null,
apellido2 varchar(50) not null,
dni varchar(9) not null unique,
email varchar(100) not null
);

Create table estudiantes (
id int primary key auto_increment,
nombr1 varchar(50) not null,
nombre2 varchar(50),
apellido1 varchar(50) not null,
apellido2 varchar(50) not null,
dirreccion varchar(100) not null,
fecha_nacimiento date not null,
dni varchar(9) not null unique,
curso_a_cursar varchar(100) not null,
centro_anterior varchar(100),
iban varchar(30),
dni_contacto varchar(9),
foreign key (dni_contacto) references contacto(dni),
id_user varchar(9),
foreign key (id_user) references userApp(id),
familia_numerosa boolean default false
);

Create table facturas (
id int primary key auto_increment,
archivo_factura varchar(100),
fecha_creacion date,
estado boolean default false, 
user_facturas varchar(20),
foreign key (user_facturas) references userApp(usuario)
);

Create table productos (
id INT PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(100),
descripcion TEXT,
imagen_producto BLOB,
precio DECIMAL(10, 2),
stock INT,
disponible BOOLEAN DEFAULT TRUE
);

CREATE TABLE carrito_producto (
id_carrito_producto INT PRIMARY KEY AUTO_INCREMENT,
id_carrito INT,
id_producto INT,
cantidad INT,
FOREIGN KEY (id_carrito) REFERENCES carrito(id_carrito),
FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

CREATE TABLE carrito (
id_carrito INT PRIMARY KEY AUTO_INCREMENT,
id_usuario INT,
fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (id_usuario) REFERENCES userApp(id)
);

CREATE TABLE carrito_extraescolar (
id_carrito_extraescolar INT PRIMARY KEY AUTO_INCREMENT,
id_carrito INT,
id_extraescolar INT,
cantidad INT,
FOREIGN KEY (id_carrito) REFERENCES carrito(id_carrito),
FOREIGN KEY (id_extraescolar) REFERENCES extraescolares(id)
);

CREATE TABLE extraescolares (
id INT PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(100),
descripcion TEXT,
precio DECIMAL(10, 2),
plazas int
);

