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
	categoria varchar(18) not null
);

CREATE TABLE productos(
	id_producto serial not null primary key,
	nombre varchar(32) not null,
	imagen varchar(255) not null,
	descripcion varchar(888) not null,
	precio numeric(4,2) not null,
	cantidad int not null,
	id_tipoproducto int not null,
	id_usuario int not null,
	id_categoria int not null
);

CREATE TABLE resenia_detalles(
	id_resenia_detalle serial not null primary key,
	imagen_producto varchar(255) not null,
	fecha date null,
	hora time null,
	resenia varchar(120) null,
	valoracion int not null DEFAULT 1,
	id_cliente int not null,
    id_producto int not null
);

CREATE TABLE estados_pedidos(
    id_estadopedido serial not null primary key,
    estado_pedido varchar(21) not null
);

CREATE TABLE pedidos_catalogo(
	id_pedido_c serial not null primary key,
	fecha date,
	hora time,
	id_estadopedido int not null,
    id_cliente int not null
);

CREATE TABLE pedidos_personalizados(
	id_pedido_p serial not null primary key,
	id_cliente int not null,
	solicitud varchar(300) not null,
	mardehilos_email varchar(32) not null default 'mardehilos@gmail.com'
);

CREATE TABLE carrito(
	id_carrito serial not null primary key,
	cantidad int not null,
    id_pedido_c int not null,
    id_resenia_detalle int not null,
    id_producto int not null
);

CREATE TABLE favoritos(
	id_favorito serial not null primary key,
	id_producto int not null,
    id_cliente int not null
);

CREATE TABLE tipo_productos(
	id_tipoproducto serial not null primary key,
	tipo_producto varchar(21) not null
);

CREATE TABLE clientes(
	id_cliente serial not null primary key,
    nombres varchar(64) not null,
    apellidos varchar(82) not null,
	correo varchar(38) not null,
	contrasenia varchar(12) not null,
	dui varchar(10) not null,
	direccion varchar(100) not null,
	fecha_nacimiento date not null,
	estadocliente boolean not null
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
ADD CONSTRAINT fk_tipoproducto
FOREIGN KEY (id_tipoproducto)
REFERENCES tipo_productos(id_tipoproducto);

ALTER TABLE productos
ADD CONSTRAINT fk_usuarioproducto
FOREIGN KEY (id_usuario)
REFERENCES usuarios(id_usuario);

ALTER TABLE productos
ADD CONSTRAINT fk_categoriaproductos
FOREIGN KEY (id_categoria)
REFERENCES categorias(id_categoria);

ALTER TABLE resenia_detalles
ADD CONSTRAINT fk_producto_detalle
FOREIGN KEY (id_producto)
REFERENCES productos(id_producto);

ALTER TABLE resenia_detalles
ADD CONSTRAINT fk_cliente_detalle
FOREIGN KEY (id_cliente)
REFERENCES clientes(id_cliente);

ALTER TABLE pedidos_catalogo
ADD CONSTRAINT fk_estadopedido
FOREIGN KEY (id_estadopedido)
REFERENCES estados_pedidos(id_estadopedido);

ALTER TABLE pedidos_catalogo
ADD CONSTRAINT fk_producto_pedido
FOREIGN KEY (id_cliente)
REFERENCES clientes(id_cliente);

ALTER TABLE carrito
ADD CONSTRAINT fk_carrito_pedido
FOREIGN KEY (id_pedido_c)
REFERENCES pedidos_catalogo(id_pedido_c);

ALTER TABLE carrito
ADD CONSTRAINT fk_resenia_detalle
FOREIGN KEY (id_resenia_detalle)
REFERENCES resenia_detalles(id_resenia_detalle);

ALTER TABLE carrito
ADD CONSTRAINT fk_carrito_producto
FOREIGN KEY (id_producto)
REFERENCES productos(id_producto);

ALTER TABLE favoritos
ADD CONSTRAINT fk_favorito_producto
FOREIGN KEY (id_producto)
REFERENCES productos(id_producto);

ALTER TABLE favoritos
ADD CONSTRAINT fk_favorito_cliente
FOREIGN KEY (id_cliente)
REFERENCES clientes(id_cliente);

ALTER TABLE pedidos_personalizados
ADD CONSTRAINT fk_valoracion_detalle
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
        ('Folsan','contra123','12345678-8','2002-10-12','7530-0069','email@gmail.com','San Salvador',5,1),
        ('Chele','contra123','98765432-1','2002-12-28','7612-0169','email@gmail.com','San Salvador',5,3),
        ('Falcon','contra123','98765432-2','2002-04-28','7612-0136','email@gmail.com','San Salvador',3,1),
        ('Mecha','contra123','98765432-3','2003-08-11','7600-0069','email@gmail.com','San Salvador',4,1),
        ('Taza','contra123','98765432-4','2002-01-02','7612-4501','email@gmail.com','San Salvador',3,1),
        ('Master','contra123','98765432-5','2002-10-10','7530-0069','email@gmail.com','San Salvador',5,1);

		
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
        ('Collar de Capitan America','','Creativo collar hecho a bordado, perfecto para ocasiones con amigos',8.00,1,3,5,3),
        ('Peluche de oso','','hecho a mano con lana suave, 30 cm de altura, gris oscuro, lana 100%',12.00,1,3,1,4),
        ('Collar crochet','','hecho de hilo de algodón, 50 cm de largo, azul marino, algodón 100%',5.00,3,2,2,4),
        ('Peluche conejo','','tejido a mano con lana merino, 20 cm de altura, rosa pastel, lana merino 100%',15.00,1,1,3,4),
        ('Pulsera nudo marinero','','tejida a mano con hilo encerado, ajustable de 17 a 22 cm, amarillo y verde, hilo encerado',12.00,2,1,4,4),
        ('Peluche perro bulldog','','tejido a ganchillo con hilo de algodón, 25 cm de altura, marrón y blanco, algodón 100%',8.00,1,3,5,3),
        ('Peluche oso','', 'hecho a mano con lana suave, 30 cm de altura, gris oscuro, lana 100%', 25.00,3,1,1,4),
        ('Pulsera macramé','', 'tejida a mano con hilo de algodón, ajustable de 16 a 20 cm, verde menta y blanco, algodón 100%', 8.00,1,4,2,4),
        ('Collar crochet','', 'hecho de hilo de algodón, 50 cm de largo, azul marino, algodón 100%', 12.00,6,1,4,4),
        ('Peluche conejo','', 'tejido a mano con lana merino, 20 cm de altura, rosa pastel, lana merino 100%', 30.00,2,1,5,4),
        ('Pulsera nudo marinero','', 'tejida a mano con hilo encerado, ajustable de 17 a 22 cm, amarillo y verde, hilo encerado', 7.00,5,4,3,4),
        ('Collar tejido','', 'hecho a mano con lana de alpaca, 40 cm de largo, beige claro, lana de alpaca 100%', 20.00,4,4,6,4),
        ('Peluche perro bulldog','', 'tejido a ganchillo con hilo de algodón, 25 cm de altura, marrón y blanco, algodón 100%', 28.00,1,1,7,4),
        ('Pulsera brazalete de macramé','', 'tejida a mano con hilo de algodón, ajustable de 18 a 21 cm, rojo y marrón, algodón 100%', 10.00,2,4,1,4),
        ('Collar flor tejida','', 'hecho de hilo de algodón, 45 cm de largo, morado y blanco, algodón 100%', 15.00,5,4,3,4),
        ('Peluche gato','', 'hecho a mano con lana suave, 35 cm de altura, gris claro, lana 100%', 22.00,4,1,10,4),
        ('Pulsera amarre','', 'tejida a mano con hilo de nylon, ajustable de 17 a 20 cm, azul oscuro y turquesa, nylon 100%', 6.00,3,4,12,4),
        ('Collar tejido a mano','', 'hecho de hilo de algodón, 55 cm de largo, verde y amarillo, algodón 100%', 18.00,2,4,1,4),
        ('Peluche oso panda','', 'hecho a mano con lana merino, 25 cm de altura, blanco y negro, lana merino 100%', 35.00,4,1,14,4),
        ('Pulsera amistad','', 'tejida a mano con hilo de algodón, ajustable de 16 a 19 cm, rosa y azul claro, algodón 100%', 5.00,2,4,6,4),
        ('Collar boho','', 'hecho a mano con hilo encerado, 60 cm de largo, marrón, negro y beige, hilo encerado', 25.00,1,4,7,4),
        ('Peluche elefante','', 'tejido a ganchillo con lana de alpaca, 30 cm de altura, gris oscuro, lana de alpaca 100%', 32.00,1,1,8,4),
        ('Pulsera trébol','', 'tejida a mano con hilo de algodón, ajustable de 17 a 21 cm, verde y blanco, algodón 100%', 9.00,2,1,10,4),
        ('Collar colgante tejido','', 'hecho de hilo de algodón, 50 cm de largo, azul oscuro y blanco, algodón 100%', 22.00,3,1,9,4),
        ('Peluche jirafa','','hecho a mano con lana suave, 40 cm de altura, beige y marrón, lana 100%', 28.00,1,1,5,4),
        ('Pulsera heart','', 'tejida a mano con hilo de algodón, ajustable de 16 a 20 cm, rosa y coral, algodón 100%', 7.00,2,1,6,4);

INSERT INTO clientes(nombres, apellidos, correo, contrasenia, dui, direccion, telefono, fecha_nacimiento, estadocliente)
VALUES ('Guillermo', 'Castillo','EamP@gmail.com','123456','98765432-1','Mejicanos','7211-1212','2001-04-12',1),
        ('Oscar', 'Rivas','Chelos@gmail.com','123456','98765432-0','Mejicanos','7211-1211','2001-01-12',1),
        ('Fernando', 'Flores','Fernan@gmail.com','123456','98765432-2','Mejicanos','7211-1213','2001-05-12',1),
        ('Malcom', 'Tercero','malcom23@gmail.com','123456','98765432-3','Mejicanos','7211-1214','2001-02-12',1),
        ('Setch', 'Setch','Setch@gmail.com','123456','98765432-4','Mejicanos','7211-1215','2000-04-12',1),
        ('Tilines', 'Tilin','Tilin@gmail.com','123456','98765432-5','Mejicanos','7211-1216','2001-04-20',1),
        ('Pepe', 'ElPepe','elPepe@gmail.com','123456','98765432-6','Mejicanos','7211-1217','2001-10-12',1),
        ('Phone', 'Tenchis','Phone@gmail.com','123456','98765432-7','Mejicanos','7211-1218','2001-05-12',3),
        ('Jose', 'Ruiz','xxx@gmail.com','123456','98765432-8','Mejicanos','7211-1219','2004-04-18',1),
        ('Christian', 'Linares','Telos@gmail.com','123456','98765432-9','Mejicanos','7210-1212','2001-06-12',1),
        ('William', 'Lopez','William@gmail.com','123456','89765432-5','Panchimalco','7011-1216','2001-04-20',1),
        ('Pepsi', 'Pepsi','Pepsi@gmail.com','123456','89765432-6','San Salvador','7001-1217','2001-10-12',1),
        ('Mota', 'Figueroa','Mota@gmail.com','123456','89765432-7','Merliot','7112-1218','2001-05-12',3),
        ('Colacola', 'Frances','Coca@gmail.com','123456','89765432-8','Volcan de San Salvador','7008-1219','2004-04-18',1),
        ('Chevrolet', 'Suburban','Suburban@gmail.com','123456','89765432-9','Mejicanos','7210-0112','2001-06-12',1);

INSERT INTO pedidos_catalogo(fecha, hora, id_estadopedido, id_cliente)
VALUES ('2023-01-12','7:59AM',1,1),
        ('2023-01-12','10:30AM',1,2),
        ('2023-01-12','2:01PM',1,3),
        ('2023-01-12','7:59AM',1,4),
        ('2023-01-12','4:00PM',3,1),
        ('2023-02-03','8:59PM',1,1),
        ('2023-03-01','10:45AM',1,2),
        ('2023-04-12','2:01PM',1,3),
        ('2023-01-28','7:59AM',1,4),
        ('2023-01-30','2:23PM',3,1),
        ('2022-12-12','7:59AM',1,1),
        ('2023-02-21','10:30AM',1,2),
        ('2023-01-13','2:01PM',1,3),
        ('2023-03-15','7:59AM',1,4),
        ('2023-04-12','4:00PM',3,1);

INSERT INTO pedidos_personalizados(solicitud, id_cliente)
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

INSERT INTO resenia_detalles(imagen_producto, fecha, hora, resenia, valoracion, id_cliente, id_producto)
VALUES ('','2023-02-12','2:00PM','Buen producto, entregado en exelentes condiciones, proporciones iguales a las de las imagenes, bonito BEMO',5,1,1),
        ('','2023-02-12','2:00PM','Exelente producto, solo el senior del pedido es un poco pendejo, pero se va',5,2,3),
        ('','2023-02-12','2:00PM','Bonita carterita, entregada en exelentes condiciones, el pedido se demoro un poco, pero esta bien',5,3,6),
        ('','2023-02-12','2:00PM','Bonito producto, entregado despues de la fecha estipulada, pero llego es lo importante',4,4,12),
        ('','2023-02-12','2:00PM','Muy bonito muenieco, precioso les quedo, esta muy bonito justo como lo queria, gracias Mar de hilos',5,5,8),
        ('','2023-04-11','4:00PM','Buen producto, entregado en exelentes condiciones, proporciones iguales a las de las imagenes, bonito BEMO',5,6,7),
        ('','2023-03-19','6:30PM','Exelente producto, solo el senior del pedido es un poco pendejo, pero se va',5,7,10),
        ('','2023-01-12','1:15PM','Bonita carterita, entregada en exelentes condiciones, el pedido se demoro un poco, pero esta bien',5,8,15),
        ('','2023-02-08','9:00AM','Bonito producto, entregado despues de la fecha estipulada, pero llego es lo importante',4,9,12),
        ('','2023-01-01','12:15PM','Muy bonito muenieco, precioso les quedo, esta muy bonito justo como lo queria, gracias Mar de hilos',5,10,2);

INSERT INTO carrito(cantidad, id_pedido_c, id_resenia_detalle, id_producto)
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


-- CONSULTAS



-- USO DE JOIN | ORDER BY | GROUP BY

SELECT usuarios.id_usuario, usuarios.nombre_usuario, estados_usuarios.estado_usuario
FROM usuarios
INNER JOIN estados_usuarios ON  usuarios.id_estadousuario = estados_usuarios.id_estadousuario;

SELECT id_usuario, nombre_usuario, dui, telefono, correo, id_nivelusuario
FROM usuarios
WHERE id_nivelusuario = 3
ORDER BY id_usuario DESC;

SELECT id_producto, nombre_producto, MAX(precio) AS "Precio maximo", cantidad
FROM productos
WHERE precio > 10 AND cantidad > 1
GROUP BY id_producto, nombre_producto, cantidad
HAVING id_producto > 1;

-- CONSULTA PARA VER LOS PRODUCTOS ENTREGADOS

SELECT a.correo, b.fecha, b.hora, c.nombre_producto, c.descripcion, c.cantidad 
FROM clientes a, pedidos_catalogo b, productos c, estados_pedidos d
WHERE a.id_cliente = b.id_cliente AND b.id_producto = c.id_producto AND b.id_estadopedido = d.id_estadopedido AND d.estado_pedido = 'Entregado';

-- CONSULTAS CON OPERADORES ARITMETICOS

SELECT id_producto, nombre_producto, precio, id_usuario FROM productos WHERE precio <= 12;

SELECT id_producto, nombre_producto, precio, id_usuario FROM productos WHERE precio < 12 AND precio > 5;

SELECT nombre_producto, precio, cantidad, id_usuario
FROM productos
WHERE precio = (SELECT MAX(precio) FROM productos);


-- TRIGGER PARA NOTIFICAR SOBRE LAS NUEVAS SOLICITUDES DE PEDIDOS PERSONALIZADOS


CREATE FUNCTION productos_notificacion() RETURNS TRIGGER
AS
$$
DECLARE
notificacion varchar(100) = 'Se ha ingresado un pedido personalizado';
BEGIN
        INSERT INTO productos_p_notificaciones(notificacion) VALUES (notificacion);
        RETURN NEW;
END;
$$
Language plpgsql

CREATE TRIGGER notificacion_p_productos 
AFTER INSERT 
ON pedidos_personalizados
FOR EACH ROW EXECUTE PROCEDURE productos_notificacion();

INSERT INTO pedidos_personalizados(id_cliente, solicitud) VALUES (2, 'Quisiera un munieco de macrame con forma de FIN EL HUMANO de hora de aventura');

SELECT * FROM productos_p_notificaciones


-- CONSULTAS PARAMETRIZADAS

SELECT * FROM pedidos_catalogo
WHERE EXTRACT(HOUR from hora) >= 10;

SELECT * FROM pedidos_personalizados
WHERE id_cliente = 2;

SELECT id_producto, nombre_producto, precio, cantidad, id_tipoproducto, id_categoria FROM productos
WHERE precio > 10 AND cantidad <> 1;

SELECT * FROM usuarios
WHERE EXTRACT(YEAR from fecha_nacimiento) < 2003 AND
EXTRACT(DAY from fecha_nacimiento) > 20;

SELECT * FROM clientes
WHERE id_estadocliente = 3;

-- CONSULTAS PARAMETRIZADAS CON FECHA

SELECT * FROM usuarios
WHERE EXTRACT(YEAR from fecha_nacimiento) < 2003 AND
EXTRACT(YEAR from fecha_nacimiento) > 2000;

SELECT * FROM clientes
WHERE EXTRACT(YEAR from fecha_nacimiento) < 2001;

SELECT * FROM pedidos_catalogo
WHERE EXTRACT(DAY from fecha) BETWEEN 15 AND 28;


-- Vistas


 SELECT a.cantidad AS "Quantity",
    b.id_pedido_c AS "Catalog Order",
    c.id_resenia_detalle AS "REVIEW",
    d.nombre AS "Product name"
   FROM carrito a,
    pedidos_catalogo b,
    resenias_detalles c,
    productos d
  WHERE b.id_pedido_c = a.id_pedido_c AND c.id_resenia_detalle = a.id_resenia_detalle AND a.id_producto = d.id_producto;


   SELECT a.id_cliente AS "ID",
    a.correo AS "Email",
    a.contrasenia AS "Password",
    a.dui AS "DUI",
    a.direccion AS "Address",
    a.telefono AS "Phone Number",
    a.fecha_nacimiento AS "BirthDate",
    a.estadocliente AS "Client Status"
   FROM clientes a
  WHERE a.id_estadocliente = b.id_estadocliente;

   SELECT a.id_pedido_c AS "ID",
    a.fecha AS "Date",
    a.hora AS "Time",
    b.estado_pedido AS "Order Status",
    c.nombre_producto AS "Product Name",
    d.correo AS "Client"
   FROM pedidos_catalogo a,
    estados_pedidos b,
    productos c,
    clientes d
  WHERE b.id_estadopedido = a.id_estadopedido AND c.id_producto = a.id_producto AND a.id_cliente = d.id_cliente;


   SELECT a.id_pedido_c AS "ID",
    a.fecha AS "Order date",
    a.hora AS "Order Time",
    b.estado_pedido AS "Order Status"
   FROM pedidos_catalogo a,
    estados_pedidos b
  WHERE b.id_estadopedido = a.id_estadopedido
  ORDER BY a.id_pedido_c;



   SELECT a.id_producto AS "ID",
    a.nombre_producto AS "Product Name",
    a.imagen AS "Image",
    a.descripcion AS "Description",
    a.precio AS "Price",
    a.cantidad AS "Quantity",
    b.tipo_producto AS "Product type",
    c.categoria AS "Category"
   FROM productos a,
    tipos_productos b,
    categorias c
  WHERE a.id_tipoproducto = b.id_tipoproducto AND c.id_categoria = a.id_categoria
  ORDER BY a.nombre_producto, c.categoria;




   SELECT a.id_usuario AS "ID",
    a.nombre_usuario AS "Username",
    a.contrasenia AS "Password",
    a.dui AS "DUI",
    a.fecha_nacimiento AS "BirthDate",
    a.telefono AS "Phone Number",
    a.correo AS "Email",
    b.nivel_usuario AS "Userlevel",
    c.estado_usuario AS "User Status"
   FROM usuarios a,
    niveles_usuarios b,
    estados_usuarios c
  WHERE b.id_nivelusuario = a.id_nivelusuario AND a.id_estadousuario = c.id_estadousuario;