Create database CideApp;
use CideApp;

Create table userApp (
id int primary key auto_increment,
usuario varchar(20) unique,
contraseña varchar(16)
);
insert into users (usuario, contraseña) values ("prit", "prit");
select * from users;

Create table contacto (
id int primary key auto_increment,
nombr1 varchar(50) not null,
nombre2 varchar(50),
apellido1 varchar(50) not null,
apellido2 varchar(50) not null,
dni varchar(9) not null unique,
email varchar(100)
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
foreign key (dni_contacto) references contacto(dni)
);

Create table facturas (
id int primary key auto_increment,
archivo_factura varchar(100),
fecha_creacion date,
estado boolean default false, 
user_facturas varchar(20),
foreign key (user_facturas) references userApp(usuario)
);

Create table material (
id INT PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(100),
descripcion TEXT,
imagen_producto BLOB,
precio DECIMAL(10, 2),
stock INT,
disponible BOOLEAN DEFAULT TRUE
);

CREATE TABLE carrito (
id INT PRIMARY KEY AUTO_INCREMENT,
usuario_id INT,
producto_id INT,
servicio_id int,
cantidad_producto INT,
FOREIGN KEY (usuario_id) REFERENCES userApp(id),
FOREIGN KEY (producto_id) REFERENCES material(id),
FOREIGN KEY (servicio_id) REFERENCES servicios(id)
);

CREATE TABLE servicios_extraescolares (
id INT PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(100),
descripcion TEXT,
precio DECIMAL(10, 2),
plazas int
);

