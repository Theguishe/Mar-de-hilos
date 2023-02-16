CREATE TABLE usuarios(
	id_usuario serial not null primary key,
	nombre_usuario varchar(32) not null,
	contraseña varchar(16) not null,
	dui varchar(10) not null,
	fecha_nac date not null,
	telefono varchar(10) not null,
	correo varchar(32) not null,
	direccion varchar(100) not null,
	id_nivelusuario int not null,
	id_estadousuario int not null
);

CREATE TABLE nivel_usuarios(
	id_nivelusuario serial not null primary key,
	nivel_usuario varchar(21) not null
);

CREATE TABLE estado_usuarios(
	id_estadousuario serial not null primary key,
	estado_usuario varchar(21) not null
);

CREATE TABLE categorias(
	id_categoria serial not null primary key,
	categoria varchar(18) not null
);

CREATE TABLE productos(
	id_producto serial not null primary key,
	nombre varchar(32) not null,
	imagen bytea not null,
	descripcion varchar(888) not null,
	precio numeric(4,2) not null,
	cantidad int not null,
	id_tipoproducto int not null,
	id_cliente int not null,
	id_usuario int not null,
	id_categoria int not null
);

CREATE TABLE reseñas(
	id_reseña serial not null primary key,
	comentario varchar(100) null
);

CREATE TABLE reseña_detalles(
	id_reseña_detalle serial not null primary key,
	imagen_producto bytea null,
	fecha date null, 
	hora time null,
	id_reseña int not null,
	id_valoracion int not null,
	id_cliente int not null
);

CREATE TABLE valoraciones(
	id_valoracion serial not null primary key,
	valoracion int not null
);

CREATE TABLE pedidos_catalogo(
	id_pedido_c serial not null primary key,
	fecha date,
	hora time,
	id_producto int not null
);

CREATE TABLE pedidos_personalizados(
	id_pedido_p serial not null primary key,
	id_cliente int not null,
	solicitud varchar(300) not null,
	mardehilos_email varchar(32) not null default 'mardehilos@gmail.com'
);

CREATE TABLE carrito(
	id_carrito serial not null primary key,
	id_pedido_c int not null
);

CREATE TABLE favoritos(
	id_favorito serial not null primary key,
	id_pedido_c int not null
);

CREATE TABLE tipo_productos(
	id_tipoproducto serial not null primary key,
	tipo_producto varchar(21) not null
);

CREATE TABLE clientes(
	id_cliente serial not null primary key,
	correo varchar(38) not null,
	contraseña varchar(12) not null,
	dui varchar(10) not null,
	direccion varchar(100) not null,
	fecha_nacimiento date not null,
	id_estadocliente int not null
);

CREATE TABLE estado_clientes(
	id_estadocliente serial not null primary key,
	estado_cliente varchar(21) not null
);

CREATE TABLE invitados(
	id_invitado serial not null
);

-- Relaciones

ALTER TABLE usuarios
ADD CONSTRAINT fk_nivelusuario
FOREIGN KEY (id_nivelusuario)
REFERENCES nivel_usuarios(id_nivelusuario);

ALTER TABLE usuarios
ADD CONSTRAINT fk_estadousuario
FOREIGN KEY (id_estadousuario)
REFERENCES estado_usuarios(id_estadousuario);

ALTER TABLE productos
ADD CONSTRAINT fk_tipo_producto
FOREIGN KEY (id_tipoproducto)
REFERENCES tipo_productos(id_tipoproducto);

ALTER TABLE productos
ADD CONSTRAINT fk_cliente_producto
FOREIGN KEY (id_cliente)
REFERENCES clientes(id_cliente);

ALTER TABLE productos
ADD CONSTRAINT fk_usuario_producto
FOREIGN KEY (id_usuario)
REFERENCES usuarios(id_usuario);

ALTER TABLE productos
ADD CONSTRAINT fk_categoria_productos
FOREIGN KEY (id_categoria)
REFERENCES categorias(id_categoria);

ALTER TABLE reseña_detalles
ADD CONSTRAINT fk_reseña_detalle
FOREIGN KEY (id_reseña)
REFERENCES reseñas(id_reseña);

ALTER TABLE reseña_detalles
ADD CONSTRAINT fk_valoracion_detalle
FOREIGN KEY (id_valoracion)
REFERENCES valoraciones(id_valoracion);

ALTER TABLE reseña_detalles
ADD CONSTRAINT fk_cliente_detalle
FOREIGN KEY (id_cliente)
REFERENCES clientes(id_cliente);

ALTER TABLE pedidos_catalogo
ADD CONSTRAINT fk_producto_pedido
FOREIGN KEY (id_producto)
REFERENCES productos(id_producto);

ALTER TABLE carrito
ADD CONSTRAINT fk_carrito_pedido
FOREIGN KEY (id_pedido_c)
REFERENCES pedidos_catalogo(id_pedido_c);

ALTER TABLE favoritos
ADD CONSTRAINT fk_favorito_pedido
FOREIGN KEY (id_pedido_c)
REFERENCES pedidos_catalogo(id_pedido_c);

ALTER TABLE clientes
ADD CONSTRAINT fk_cliente_estadocliente
FOREIGN KEY (id_estadocliente)
REFERENCES estado_clientes(id_estadocliente);

ALTER TABLE pedidos_personalizados
ADD CONSTRAINT fk_valoracion_detalle
FOREIGN KEY (id_cliente)
REFERENCES clientes(id_cliente);

-- Registros

INSERT INTO nivel_usuarios(nivel_usuario)
VALUES('administrador'),
		('Proveedor'),
		('Programador');
		
INSERT INTO estado_usuarios(estado_usuario)
VALUES ('Activo'),
		('Inactivo'),
		('Suspendido');
		
INSERT INTO usuarios(nombre_usuario, contraseña, dui, fecha_nac, telefono, correo, direccion, id_nivelusuario, id_estadousuario)
VALUES ('eamguille','12345678','12345678-9','2004-08-26','7633-5320','guille@gmail.com','Planes de Renderos, Panchimalco',1,1),
		('eamdavid','87654321','23482334-0','2004-12-12','6324-2344','daviddhj@gmail.com','Zacamil, San Salvador',2,1),
		('georgina','80912365','12303455-1','2004-01-06','7012-2343','georginam@gmail.com','Mejicanos, San Salvador',3,1);

INSERT INTO estado_clientes(estado_cliente)
VALUES ('activo'),
		('inactivo');

INSERT INTO clientes(correo, contraseña, dui, direccion, fecha_nacimiento, id_estadocliente)
VALUES ('guillermo0526@gmail.com','guille2608','12345678-9','Panchimalco, San Salvador','2000-12-12',1),
		('david122@gmail.com','david0324','43583443-0','Zacamil, San Salvador','1998-01-01',1),
		('georginaM04@gmail.com','michelle2004','02942321-5','Mejicanos, San Salvador','2004-12-09',1);
		
INSERT INTO reseñas(comentario)
VALUES ('Buen producto, buena calidad y muy bonito'),
		('Me gustó mucho el diseño de mi muñequito de macrame, lo llevo a todas partes'),
		('Los productos estan muy bonitos a la siguiente pido más');
		
INSERT INTO valoraciones(valoracion)
VALUES (4),
		(5),
		(5);

INSERT INTO reseña_detalles(imagen_producto, fecha, hora, id_reseña, id_valoracion, id_cliente)
VALUES ('imagen producto','2023-01-01','03:00PM',3,2,1),
		('imagen producto','2023-01-12','01:00PM',2,3,2),
		('imagen producto','2023-02-14','11:00AM',1,1,3);
		
INSERT INTO categorias(categoria)
VALUES ('plantas'),
		('animales'),
		('super heroes');
		
INSERT INTO tipo_productos(tipo_producto)
VALUES ('Muñeco de macrame'),
		('Pulsera'),
		('Collar');
		
INSERT INTO Productos(nombre, imagen, descripcion, precio, cantidad, id_tipoproducto, id_cliente, id_usuario, id_categoria)
VALUES ('Superman', 'superman.jpg', 'Muñeca realizada en técnica Macramé A MANO! Protagonista de la popular serie "Anne with an E" de Netflix Incluye banquito de madera pintado a mano.', 9.99, 1, 1, 1, 1, 1),
		('Perrito', 'perrito.jpg', 'Perrito hecho con lana a mano, con cariño', 2.50, 2, 2, 2, 2, 2);
	
INSERT INTO pedidos_catalogo(fecha, hora, id_producto)
VALUES ('2023-01-02','08:00AM',1),
		('2023-02-01','02:00PM',2);

INSERT INTO carrito(id_pedido_c)
VALUES (1),
		(2);


INSERT INTO favoritos(id_pedido_c)
VALUES (1),
		(2);


INSERT INTO pedidos_personalizados(id_cliente, solicitud)
VALUES (1,'Buenas, quisiera un muñequito de macrame de superman'),
		(2,'Buenas tardes, me podrian hacer una pulsera estilo playa, gracias');


-- Consultas



