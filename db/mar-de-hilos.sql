-- Tablas

CREATE TABLE usuarios(
	id_usuario serial not null primary key,
	nombre_usuario varchar(32) not null,
	contrasenia varchar(16) not null,
	dui varchar(10) not null UNIQUE,
	fecha_nacimiento date not null,
	telefono varchar(10) not null,
	correo varchar(32) not null,
	direccion varchar(100) not null,
	id_nivelusuario int not null,
	id_estadousuario int not null
);

CREATE TABLE niveles_usuarios(
	id_nivelusuario serial not null primary key,
	nivel_usuario varchar(21) not null
);

CREATE TABLE estados_usuarios(
	id_estadousuario serial not null primary key,
	estado_usuario varchar(21) not null
);



CREATE TABLE categorias(
	id_categoria serial not null primary key,
	categoria varchar(21) not null
);

CREATE TABLE productos(
	id_producto serial not null primary key,
	nombre_producto varchar(48) not null,
	imagen varchar(60) not null,
	descripcion varchar(888) not null,
	precio numeric(4,2) not null,
	cantidad int null DEFAULT 1,
	id_tipoproducto int not null,
	id_usuario int not null,
	id_categoria int not null
);

CREATE TABLE resenias_detalles(
	id_resenia_detalle serial not null primary key,
	imagen_producto varchar(60) null,
	fecha date null, 
	hora time null,
	resenia varchar(300) null,
	valoracion int null,
	id_cliente int not null
);

CREATE TABLE estados_pedidos(
    id_estadopedido serial not null primary key,
    estado_pedido varchar(32) not null
);

CREATE TABLE pedidos_catalogo(
	id_pedido_c serial not null primary key,
	fecha date NULL,
	hora time NULL,
    id_estadopedido int not null,
	id_producto int not null,
    id_cliente int not null
);

CREATE TABLE pedidos_personalizados(
	id_pedido_p serial not null primary key,
	id_cliente int not null,
	solicitud varchar(300) not null,
	mardehilos_email varchar(32) not null default 'mardehilos@gmail.com'
);

CREATE TABLE carrito(
    cantidad int null DEFAULT 1,
	id_pedido_c int not null,
	id_resenia_detalle int not null,
    id_producto int not null
);

CREATE TABLE favoritos(
	id_producto int not null,
    id_cliente int not null
);

CREATE TABLE tipos_productos(
	id_tipoproducto serial not null primary key,
	tipo_producto varchar(21) not null
);

CREATE TABLE clientes(
	id_cliente serial not null primary key,
	correo varchar(38) not null,
	contrasenia varchar(12) not null,
	dui varchar(10) not null UNIQUE,
	direccion varchar(100) not null,
	fecha_nacimiento date not null,
	id_estadocliente int not null
);

CREATE TABLE estados_clientes(
	id_estadocliente serial not null primary key,
	estado_cliente varchar(21) not null
);

-- Relaciones

ALTER TABLE usuarios
ADD CONSTRAINT fk_nivelusuario
FOREIGN KEY (id_nivelusuario)
REFERENCES niveles_usuarios(id_nivelusuario);

ALTER TABLE usuarios
ADD CONSTRAINT fk_estadousuario
FOREIGN KEY (id_estadousuario)
REFERENCES estados_usuarios(id_estadousuario);

ALTER TABLE productos
ADD CONSTRAINT fk_tipos_producto
FOREIGN KEY (id_tipoproducto)
REFERENCES tipos_productos(id_tipoproducto);

ALTER TABLE productos
ADD CONSTRAINT fk_usuario_producto
FOREIGN KEY (id_usuario)
REFERENCES usuarios(id_usuario);

ALTER TABLE productos
ADD CONSTRAINT fk_categoria_productos
FOREIGN KEY (id_categoria)
REFERENCES categorias(id_categoria);

ALTER TABLE resenias_detalles
ADD CONSTRAINT fk_cliente_detalle
FOREIGN KEY (id_cliente)
REFERENCES clientes(id_cliente);

ALTER TABLE pedidos_catalogo
ADD CONSTRAINT fk_estado_pedido
FOREIGN KEY (id_estadopedido)
REFERENCES estados_pedidos(id_estadopedido);

ALTER TABLE pedidos_catalogo
ADD CONSTRAINT fk_producto_pedido
FOREIGN KEY (id_producto)
REFERENCES productos(id_producto);

ALTER TABLE pedidos_catalogo
ADD CONSTRAINT fk_cliente_pedido
FOREIGN KEY (id_cliente)
REFERENCES clientes(id_cliente);

ALTER TABLE carrito
ADD CONSTRAINT fk_carrito_pedido
FOREIGN KEY (id_pedido_c)
REFERENCES pedidos_catalogo(id_pedido_c);

ALTER TABLE carrito
ADD CONSTRAINT fk_resenia_detalle_pedido
FOREIGN KEY (id_resenia_detalle)
REFERENCES resenias_detalles(id_resenia_detalle);

ALTER TABLE carrito
ADD CONSTRAINT fk_producto_pedido
FOREIGN KEY (id_producto)
REFERENCES productos(id_producto);

ALTER TABLE favoritos
ADD CONSTRAINT fk_producto_favorito
FOREIGN KEY (id_producto)
REFERENCES productos(id_producto);

ALTER TABLE favoritos
ADD CONSTRAINT fk_cliente_favorito
FOREIGN KEY (id_cliente)
REFERENCES clientes(id_cliente);


ALTER TABLE clientes
ADD CONSTRAINT fk_estado_cliente
FOREIGN KEY (id_estadocliente)
REFERENCES estados_clientes(id_estadocliente);


ALTER TABLE pedidos_personalizados
ADD CONSTRAINT fk_cliente_personalizado
FOREIGN KEY (id_cliente)
REFERENCES clientes(id_cliente);


-- Insersiones

INSERT INTO niveles_usuarios(nivel_usuario)
VALUES ('Root'),
		('Administrador'),
		('Programador'),
		('Vendedor'),
		('Soporte');
		
INSERT INTO estados_usuarios(estado_usuario)
VALUES ('Activo'),
		('Inactivo'),
		('Suspendido');
		
INSERT INTO usuarios(nombre_usuario, contrasenia, dui, fecha_nacimiento, telefono, correo, direccion, id_nivelusuario, id_estadousuario)
VALUES ('EamP','contra123','12345678-9','2002-12-12','7612-0845','email@gmail.com','San Salvador',1,1),
		('Naitoon','contra1234','12345678-0','2002-12-12','7612-1130','email@gmail.com','San Salvador',2,1),
		('Laitana','contra123','12345678-1','2002-12-12','7612-0069','email@gmail.com','San Salvador',3,1),
        ('Fexx','contra123','12345678-2','2002-12-01','7612-1212','email@gmail.com','San Salvador',3,1),
        ('Falsen','contra123','12345678-3','2001-12-12','7612-1169','email@gmail.com','San Salvador',4,1),
        ('Mixter','contra123','12345678-4','2002-12-04','7612-0169','email@gmail.com','San Salvador',5,3),
        ('Youta','contra123','12345678-5','2002-12-28','7612-0136','email@gmail.com','San Salvador',3,1),
        ('Hoolu','contra123','12345678-6','2003-08-12','7600-0069','email@gmail.com','San Salvador',4,1),
        ('Mocho','contra123','12345678-7','2002-01-12','7612-4501','email@gmail.com','San Salvador',3,1),
        ('Folsan','contra123','12345678-8','2002-10-12','7530-0069','email@gmail.com','San Salvador',5,1);

		
INSERT INTO categorias(categoria)
VALUES ('Plantas'),
        ('Animales'),
        ('SuperHeroes'),
        ('Personajes'),
        ('Furros'),
        ('Objetos'),
        ('Naturaleza'),
        ('Accesorios');

INSERT INTO estados_pedidos(estado_pedido)
VALUES ('Agregado'),
        ('Cancelado'),
        ('Entregado'),
        ('Pospuesto');

INSERT INTO estados_clientes(estado_cliente)
VALUES ('Activo'),
        ('Inactivo'),
        ('Pasante');

INSERT INTO tipos_productos(tipo_producto)
VALUES ('croche'),
        ('macrame'),
        ('Bordado'),
        ('Pulsera'),
        ('Carteras'),
        ('Monederos'),
        ('Mochilitas');

INSERT INTO productos(nombre_producto, imagen, descripcion, precio, cantidad, id_tipoproducto, id_usuario, id_categoria)
VALUES ('Macrame de Solesito','','Bonito muniequito de macrame con forma de solesito, especial para regalar o mantenerlo y tener un amiguito que te acompanie',12.00,1,2,1,6),
        ('Pulsera Girasol','','Bonita pulsera con estilo de girasol, especial para regalar',5.00,3,4,2,1),
        ('Cartera de Elefante','','Accesorio, cartera con estilo de elefante, bonita para llevar con tigo',15.00,1,5,3,2),
        ('Macrame de BEMO','','Bonito munieco de macrame de BEMO, especial para regalar',12.00,2,2,4,4),
        ('Collar de Capitan America','','Creativo collar hecho a bordado, perfecto para ocasiones con amigos',8.00,1,3,5,3);

INSERT INTO clientes(correo, contrasenia, dui, direccion, fecha_nacimiento, id_estadocliente)
VALUES ('EamP@gmail.com','123456','98765432-1','Mejicanos','2001-04-12',1),
        ('Chelos@gmail.com','123456','98765432-0','Mejicanos','2001-01-12',1),
        ('Fernan@gmail.com','123456','98765432-2','Mejicanos','2001-05-12',1),
        ('malcom23@gmail.com','123456','98765432-3','Mejicanos','2001-02-12',1),
        ('Setch@gmail.com','123456','98765432-4','Mejicanos','2000-04-12',1),
        ('Tilin@gmail.com','123456','98765432-5','Mejicanos','2001-04-20',1),
        ('elPepe@gmail.com','123456','98765432-6','Mejicanos','2001-10-12',1),
        ('Phone@gmail.com','123456','98765432-7','Mejicanos','2001-05-12',3),
        ('xxx@gmail.com','123456','98765432-8','Mejicanos','2004-04-18',1),
        ('Telos@gmail.com','123456','98765432-9','Mejicanos','2001-06-12',1);

INSERT INTO pedidos_catalogo(fecha, hora, id_estadopedido, id_producto, id_cliente)
VALUES ('2023-01-12','7:59AM',1,1,1),
        ('2023-01-12','10:30AM',1,1,2),
        ('2023-01-12','2:01PM',1,1,3),
        ('2023-01-12','7:59AM',1,1,4),
        ('2023-01-12','4:00PM',3,4,1);

INSERT INTO pedidos_personalizados(solicitud, id_cliente)
VALUES ('Quisiera un munieco de macrame con forma de JAKE  de hora de aventura',1),
        ('Hola, quisiera ordenar una carterita con estilo de mariposas',2),
        ('Quisiera una pulsera con estilo de among us',3),
        ('Quisiera un munieco de macrame con forma de leon kawai',4),
        ('Quisiera un collar bordado color navy',5),
        ('Quisiera un munieco de macrame con forma de cactus kawai',6),
        ('Quisiera un munieco de macrame con forma de masetita',7);

INSERT INTO resenias_detalles(imagen, fecha, hora, resenia, valoracion, id_cliente)
VALUES ('','2023-02-12','2:00PM','Buen producto, entregado en exelentes condiciones, proporciones iguales a las de las imagenes, bonito BEMO',5,1),
        ('','2023-02-12','2:00PM','Exelente producto, solo el senior del pedido es un poco pendejo, pero se va',5,2),
        ('','2023-02-12','2:00PM','Bonita carterita, entregada en exelentes condiciones, el pedido se demoro un poco, pero esta bien',5,3),
        ('','2023-02-12','2:00PM','Bonito producto, entregado despues de la fecha estipulada, pero llego es lo importante',4,4),
        ('','2023-02-12','2:00PM','Muy bonito muenieco, precioso les quedo, esta muy bonito justo como lo queria, gracias Mar de hilos',5,5);

INSERT INTO carrito(cantidad, id_pedido_c, id_resenia_detalle, id_producto)
VALUES (2,1,1,2),
        (1,2,2,2),
        (1,3,3,3),
        (1,4,4,3),
        (1,5,5,1);

INSERT INTO favoritos(id_producto, id_cliente)
VALUES (1,1),
        (2,2),
        (3,3),
        (4,4),
        (5,5);

-- Consultas