CREATE TYPE nivel_usuario AS ENUM('root','administrador','secretario','programador','vendedor','proveedor');
CREATE TYPE estado_usuario AS ENUM('activo','inactivo','bloqueado');

CREATE TABLE usuarios(
	id_usuario serial not null primary key,
	nombre_usuario varchar(32) not null unique,
	contrasenia varchar(32) not null,
	dui varchar(10) not null unique,
	fecha_nacimiento_usuario date null,
	telefono_usuario varchar(12) not null,
	correo_usuario varchar(75) not null,
	direccion varchar(200) not null,
	nivel_usuario nivel_usuario,
	estado_usuario estado_usuario
);

CREATE TABLE categorias(
	id_categoria serial not null primary key,
	nombre_categoria varchar(24) not null
);

CREATE TABLE productos(
	id_producto serial not null primary key,
	nombre_producto varchar(32) not null,
	imagen_producto BYTEA null,
	descripcion_producto varchar(250) null,
	precio numeric(4,2) not null,
	cantidad_stock int not null default 2,
	valoracion_producto int not null default 3,
	id_tipo_producto int not null,
	id_usuario int not null,
	id_categoria int not null
);

CREATE TABLE tipos_productos(
	id_tipo_producto serial not null primary key,
	tipo_producto varchar(21) not null
);

CREATE TABLE favoritos(
	id_favorito serial not null primary key,
	id_producto int not null,
	id_cliente int not null
);

CREATE TYPE estado_cliente AS ENUM('activo','inactivo','bloqueado');

CREATE TABLE clientes(
	id_cliente serial not null primary key,
	nombre_cliente varchar(32) not null,
	apellido_cliente varchar(64) not null,
	correo_cliente varchar(75) not null,
	contrasenia varchar(32) not null,
	dui varchar(10) not null unique,
	direccion_cliente varchar(200) not null,
	telefono_cliente varchar(12) not null unique,
	fecha_nacimiento_cliente date not null,
	estado_cliente estado_cliente
);

CREATE TABLE estados_pedidos(
	id_estado_pedido serial not null primary key,
	estado_pedido varchar(32) not null
);

CREATE TABLE pedidos_catalogo(
	id_pedido_catalogo serial not null primary key,
	fecha_pedido date not null,
	hora_pedido time not null,
	direccion_pedido varchar(200) not null,
	id_estado_pedido int not null,
	id_cliente int not null
);

CREATE TABLE carrito(
	id_carrito serial not null primary key,
	cantidad int not null,
	id_pedido_catalogo int not null,
	id_resenia_detalle int not null,
	id_producto int not null
);

CREATE TABLE resenias_detalles(
	id_resenia_detalle serial not null primary key,
	imagen_resenia BYTEA null,
	mensaje_resenia varchar(250) null,
	fecha_resenia date not null,
	hora_resenia time not null,
	valoracion int not null default 3,
	id_cliente int not null,
	id_producto int not null
);

CREATE TABLE pedidos_personalizados(
	id_pedido_personalizado serial not null primary key,
	solicitud_pedido varchar(210) not null,
	mardehilos_email varchar(64) not null default 'mardehilos@gmail.com',
	id_cliente int not null
);

-- Llaves foraneas
ALTER TABLE productos
ADD CONSTRAINT fk_tipo_producto
FOREIGN KEY (id_tipo_producto)
REFERENCES tipos_productos(id_tipo_producto);

ALTER TABLE productos
ADD CONSTRAINT fk_usuario_producto
FOREIGN KEY (id_usuario)
REFERENCES usuarios(id_usuario);

ALTER TABLE productos
ADD CONSTRAINT fk_categoria_producto
FOREIGN KEY (id_categoria)
REFERENCES categorias(id_categoria);

ALTER TABLE favoritos
ADD CONSTRAINT fk_cliente_favorito
FOREIGN KEY (id_cliente)
REFERENCES clientes(id_cliente);

ALTER TABLE pedidos_catalogo
ADD CONSTRAINT fk_estado_pedido_catalogo
FOREIGN KEY (id_estado_pedido)
REFERENCES estados_pedidos(id_estado_pedido);

ALTER TABLE pedidos_catalogo
ADD CONSTRAINT fk_cliente_pedido_catalogo
FOREIGN KEY (id_cliente)
REFERENCES clientes(id_cliente);

ALTER TABLE carrito
ADD CONSTRAINT fk_pedido_catalogo_carrito
FOREIGN KEY (id_pedido_catalogo)
REFERENCES pedidos_catalogo(id_pedido_catalogo);

ALTER TABLE carrito
ADD CONSTRAINT fk_resenia_detalle_carrito
FOREIGN KEY (id_resenia_detalle)
REFERENCES resenias_detalles(id_resenia_detalle);

ALTER TABLE carrito
ADD CONSTRAINT fk_producto_carrito
FOREIGN KEY (id_producto)
REFERENCES productos(id_producto);

ALTER TABLE resenias_detalles
ADD CONSTRAINT fk_cliente_resenia_detalle
FOREIGN KEY (id_cliente)
REFERENCES clientes(id_cliente);

ALTER TABLE resenias_detalles
ADD CONSTRAINT fk_producto_resenia_detalle
FOREIGN KEY (id_producto)
REFERENCES productos(id_producto);

-- Registros

INSERT INTO usuarios(nombre_usuario, contrasenia, dui, fecha_nacimiento_usuario, telefono_usuario, correo_usuario, direccion, nivel_usuario, estado_usuario)
VALUES ('eamguille','12345678','12345678-9','2004-08-26','7633-5320','guilleacc26@gmail.com','Planes de Renderos','root','activo'),
		('barasex','12345678','12345678-0','2004-11-09','7755-2400','barasex.v@gmail.com','San Salvador','root','activo'),
		('davidgh','12345678','12345678-1','2004-09-16','6500-0112','davidgh@gmail.com','San Salvador','root','activo');
		
INSERT INTO categorias(nombre_categoria)
VALUES ('Plantas'),
        ('Animales'),
        ('SuperHeroes'),
        ('Personajes'),
        ('Furros'),
        ('Objetos'),
        ('Naturaleza'),
        ('Accesorios');
		
INSERT INTO tipos_productos(tipo_producto)
VALUES ('croche'),
        ('macrame'),
        ('Bordado'),
        ('Pulsera'),
        ('Carteras'),
        ('Monederos'),
        ('Mochilitas');
		
INSERT INTO productos(nombre_producto, imagen_producto, descripcion_producto, precio, cantidad_stock, valoracion_producto, id_tipo_producto, id_usuario, id_categoria)
VALUES ('Macrame de Solesito','','Bonito muniequito de macrame con forma de solesito, especial para regalar o mantenerlo y tener un amiguito que te acompanie',12.00,1,5,2,1,6),
        ('Pulsera Girasol','','Bonita pulsera con estilo de girasol, especial para regalar',5.00,3,10,4,2,1),
        ('Cartera de Elefante','','Accesorio, cartera con estilo de elefante, bonita para llevar con tigo',15.00,1,3,5,3,2),
        ('Macrame de BEMO','','Bonito munieco de macrame de BEMO, especial para regalar',12.00,2,3,2,1,4),
        ('Collar de Capitan America','','Creativo collar hecho a bordado, perfecto para ocasiones con amigos',8.00,1,2,3,2,3),
        ('Peluche de oso','','hecho a mano con lana suave, 30 cm de altura, gris oscuro, lana 100%',12.00,1,6,3,1,4),
        ('Collar crochet','','hecho de hilo de algodón, 50 cm de largo, azul marino, algodón 100%',5.00,3,6,2,2,4),
        ('Peluche conejo','','tejido a mano con lana merino, 20 cm de altura, rosa pastel, lana merino 100%',15.00,1,6,1,3,4),
        ('Pulsera nudo marinero','','tejida a mano con hilo encerado, ajustable de 17 a 22 cm, amarillo y verde, hilo encerado',12.00,2,5,1,3,4),
        ('Peluche perro bulldog','','tejido a ganchillo con hilo de algodón, 25 cm de altura, marrón y blanco, algodón 100%',8.00,1,5,3,2,3),
        ('Peluche oso','', 'hecho a mano con lana suave, 30 cm de altura, gris oscuro, lana 100%', 25.00,3,5,1,1,4),
        ('Pulsera macramé','', 'tejida a mano con hilo de algodón, ajustable de 16 a 20 cm, verde menta y blanco, algodón 100%', 8.00,1,5,4,2,4),
        ('Collar crochet','', 'hecho de hilo de algodón, 50 cm de largo, azul marino, algodón 100%', 12.00,6,10,1,3,4),
        ('Peluche conejo','', 'tejido a mano con lana merino, 20 cm de altura, rosa pastel, lana merino 100%', 30.00,2,12,1,3,4),
        ('Pulsera nudo marinero','', 'tejida a mano con hilo encerado, ajustable de 17 a 22 cm, amarillo y verde, hilo encerado', 7.00,5,4,4,3,4),
        ('Collar tejido','', 'hecho a mano con lana de alpaca, 40 cm de largo, beige claro, lana de alpaca 100%', 20.00,4,5,4,2,4),
        ('Peluche perro bulldog','', 'tejido a ganchillo con hilo de algodón, 25 cm de altura, marrón y blanco, algodón 100%', 28.00,1,5,1,3,4),
        ('Pulsera brazalete de macramé','', 'tejida a mano con hilo de algodón, ajustable de 18 a 21 cm, rojo y marrón, algodón 100%', 10.00,2,8,4,2,4),
        ('Collar flor tejida','', 'hecho de hilo de algodón, 45 cm de largo, morado y blanco, algodón 100%', 15.00,5,6,4,1,4),
        ('Peluche gato','', 'hecho a mano con lana suave, 35 cm de altura, gris claro, lana 100%', 22.00,4,6,1,1,4),
        ('Pulsera amarre','', 'tejida a mano con hilo de nylon, ajustable de 17 a 20 cm, azul oscuro y turquesa, nylon 100%', 6.00,3,1,4,3,4),
        ('Collar tejido a mano','', 'hecho de hilo de algodón, 55 cm de largo, verde y amarillo, algodón 100%', 18.00,2,2,4,1,4),
        ('Peluche oso panda','', 'hecho a mano con lana merino, 25 cm de altura, blanco y negro, lana merino 100%', 35.00,4,4,1,2,4),
        ('Pulsera amistad','', 'tejida a mano con hilo de algodón, ajustable de 16 a 19 cm, rosa y azul claro, algodón 100%', 5.00,2,5,4,2,4),
        ('Collar boho','', 'hecho a mano con hilo encerado, 60 cm de largo, marrón, negro y beige, hilo encerado', 25.00,1,6,4,1,4),
        ('Peluche elefante','', 'tejido a ganchillo con lana de alpaca, 30 cm de altura, gris oscuro, lana de alpaca 100%', 32.00,1,6,1,3,4),
        ('Pulsera trébol','', 'tejida a mano con hilo de algodón, ajustable de 17 a 21 cm, verde y blanco, algodón 100%', 9.00,2,7,1,3,4),
        ('Collar colgante tejido','', 'hecho de hilo de algodón, 50 cm de largo, azul oscuro y blanco, algodón 100%', 22.00,3,5,1,1,4),
        ('Peluche jirafa','','hecho a mano con lana suave, 40 cm de altura, beige y marrón, lana 100%', 28.00,1,6,1,2,4),
        ('Pulsera heart','', 'tejida a mano con hilo de algodón, ajustable de 16 a 20 cm, rosa y coral, algodón 100%', 7.00,2,4,1,2,4);
		
INSERT INTO clientes(nombre_cliente, apellido_cliente, correo_cliente, contrasenia, dui, direccion_cliente, telefono_cliente, fecha_nacimiento_cliente, estado_cliente)
VALUES ('Guillermo', 'Castillo','EamP@gmail.com','123456','98765432-1','Mejicanos','7211-1212','2001-04-12','activo'),
        ('Oscar', 'Rivas','Chelos@gmail.com','123456','98765432-0','Mejicanos','7211-1211','2001-01-12','activo'),
        ('David', 'Flores','davidgh@gmail.com','123456','98765432-2','Mejicanos','7211-1213','2001-05-12','activo'),
        ('Eduardo', 'Barahona','barasex.v@gmail.com','123456','98765432-3','San Salvador','7211-1214','2004-11-09','activo'),
        ('Setch', 'Setch','Setch@gmail.com','123456','98765432-4','Mejicanos','7211-1215','2000-04-12','inactivo'),
        ('Tilines', 'Tilin','Tilin@gmail.com','123456','98765432-5','Mejicanos','7211-1216','2001-04-20','bloqueado'),
        ('Pepe', 'ElPepe','elPepe@gmail.com','123456','98765432-6','Mejicanos','7211-1217','2001-10-12','activo'),
        ('Phone', 'Tenchis','Phone@gmail.com','123456','98765432-7','Mejicanos','7211-1218','2001-05-12','activo'),
        ('Jose', 'Ruiz','xxx@gmail.com','123456','98765432-8','Mejicanos','7211-1219','2004-04-18','activo'),
        ('Christian', 'Linares','Telos@gmail.com','123456','98765432-9','Mejicanos','7210-1212','2001-06-12','inactivo'),
        ('William', 'Lopez','William@gmail.com','123456','89765432-5','Panchimalco','7011-1216','2001-04-20','inactivo'),
        ('Pepsi', 'Pepsi','Pepsi@gmail.com','123456','89765432-6','San Salvador','7001-1217','2001-10-12','activo'),
        ('Mota', 'Figueroa','Mota@gmail.com','123456','89765432-7','Merliot','7112-1218','2001-05-12','activo'),
        ('Colacola', 'Frances','Coca@gmail.com','123456','89765432-8','Volcan de San Salvador','7008-1219','2004-04-18','bloqueado'),
        ('Chevrolet', 'Suburban','Suburban@gmail.com','123456','89765432-9','Mejicanos','7210-0112','2001-06-12','activo');
		
INSERT INTO favoritos(id_producto, id_cliente)
VALUES (1,1),
        (2,2),
        (3,3),
        (4,4),
        (5,5),
        (6,6),
        (7,7),
        (8,8),
        (9,9),
        (10,10),
        (11,11),
        (12,12);
		
INSERT INTO estados_pedidos(estado_pedido)
VALUES ('Agregado'),
        ('Cancelado'),
        ('Entregado'),
        ('Pospuesto');
		
INSERT INTO pedidos_catalogo(fecha_pedido, hora_pedido, direccion_pedido, id_estado_pedido, id_cliente)
VALUES ('2023-01-12','7:59AM','San Salvador',1,1),
        ('2023-01-12','10:30AM','Mejicanos',1,2),
        ('2023-01-12','2:01PM','La Gloria',1,3),
        ('2023-01-12','7:59AM','Mejicanos',1,4),
        ('2023-01-12','4:00PM','Salvador del Mundo',3,1),
        ('2023-02-03','8:59PM','Santa Elena',1,1),
        ('2023-03-01','10:45AM','Almeria',1,2),
        ('2023-04-12','2:01PM','Santiago Texacuangos',1,3),
        ('2023-01-28','7:59AM','Planes de renderos',1,4),
        ('2023-01-30','2:23PM','Mariona',3,1),
        ('2022-12-12','7:59AM','Santa Marta, Apopa',1,1),
        ('2023-02-21','10:30AM','Mira al Valle',1,2),
        ('2023-01-13','2:01PM','Nuvo Ilopango',1,3),
        ('2023-03-15','7:59AM','Las cimas, Soyapango',1,4),
        ('2023-04-12','4:00PM','Planes de renderos',3,1);
		
INSERT INTO resenias_detalles(imagen_resenia, mensaje_resenia, fecha_resenia, hora_resenia, valoracion, id_cliente, id_producto)
VALUES ('','Buen producto','2023-02-12','2:00PM',5,1,1),
        ('','','2023-02-12','2:00PM',5,2,3),
        ('','','2023-02-12','2:00PM',5,3,6),
        ('','No me genero ningun problema, buen munieco','2023-02-12','2:00PM',4,4,12),
        ('','','2023-02-12','2:00PM',5,5,8),
        ('','','2023-04-11','4:00PM',5,6,7),
        ('','','2023-03-19','6:30PM',5,7,10),
        ('','','2023-01-12','1:15PM',5,8,15),
        ('','','2023-02-08','9:00AM',4,9,12),
        ('','','2023-01-01','12:15PM',5,10,2);
		
INSERT INTO carrito(cantidad, id_pedido_catalogo, id_resenia_detalle, id_producto)
VALUES (2,1,1,2),
        (1,2,2,2),
        (1,3,3,3),
        (1,4,4,3),
        (1,5,5,1),
        (3,4,1,10),
        (1,5,3,12),
        (1,5,4,11),
        (1,6,1,7),
        (1,7,4,9);
		
INSERT INTO pedidos_personalizados(solicitud_pedido, id_cliente)
VALUES ('Quisiera un munieco de macrame con forma de JAKE  de hora de aventura',1),
        ('Hola, quisiera ordenar una carterita con estilo de mariposas',2),
        ('Quisiera una pulsera con estilo de among us',3),
        ('Quisiera un munieco de macrame con forma de leon kawai',4),
        ('Quisiera un collar bordado color navy',5),
        ('Quisiera un munieco de macrame con forma de cactus kawai',6),
        ('Quisiera un munieco de macrame con forma de masetita',7),
        ('Pulsera de lana con diseño de flores en colores pastel, parecido a esta imagen', 8),
        ('Bordado de lana con diseño de paisaje en colores vivos', 9),
        ('Peluche de lana con forma de oso en color marró', 10),
        ('Pulsera de lana con diseño geométrico en colores neón,imagen', 11),
        ('Bordado de lana con diseño de retrato en colores suaves',  12),
        ('Peluche de lana con forma de gato en color gris, parecido a esta imagen', 13),
        ('Pulsera de lana con diseño de rayas en colores cálidos, parecido a esta imagen', 14),
        ('Bordado de lana con diseño abstracto en colores fríos, parecido a esta imagen', 15),
        ('Peluche de lana con forma de perro en color blanco y negro, parecido a esta imagen',11),
        ('Pulsera de lana con diseño floral en colores oscuros, parecido a esta imagen', 10),
        ('Bordado de lana con diseño de naturaleza muerta en colores vivos, parecido a esta imagen', 12),
        ('Peluche de lana con forma de conejo en color rosa pastel, parecido a esta imagen', 13),
        ('Pulsera de lana con diseño étnico en colores tierra, parecido a esta imagen', 12),
        ('Bordado de lana con diseño moderno en colores neón, parecido a esta imagen', 1),
        ('Peluche de lana con forma de elefante en color gris claro, parecido a esta imagen', 5),
        ('Pulsera de lana con diseño tribal en colores oscuros y vivos, parecido a esta imagen', 6),
        ('Bordado de lana con diseño clásico en colores suaves y pastel, parecido a esta imagen', 8),
        ('Peluche de lana con forma de león en color amarillo y marrón oscuro, parecido a esta imagen', 7),
        ('Pulsera de lana con diseño minimalista en colores fríos y cálidos contrastantes , parecido a esta imagen ',9),
        ('Bordado de lana con diseño contemporáneo en colores vivos y neón ,parecido a esta imagen ',6);


-- Vistas y Selects
CREATE VIEW AS
SELECT 