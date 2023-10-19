 
    CREATE VIEW productosView AS
    SELECT
    p.id_producto AS "ID",
    p.nombre_producto AS "Product Name",
    u.nombre_usuario AS "User",
    p.imagen_producto AS "Image",
    p.descripcion_producto AS "Description",
    p.precio AS "Price",
    p.cantidad_stock AS "Quantity",
    p.valoracion_producto AS "Ranking",
    tp.tipo_producto AS "Product type",
    
    c.nombre_categoria AS "Category"
FROM
    productos p
    LEFT JOIN tipos_productos tp ON p.id_tipo_producto = tp.id_tipo_producto
    LEFT JOIN usuarios u ON p.id_usuario = u.id_usuario
    LEFT JOIN categorias c ON p.id_categoria = c.id_categoria;

CREATE VIEW clientesView AS
SELECT
    a.id_cliente As "ID",
    concat(
        a.nombre_cliente || ' ' || a.apellido_cliente
    ) AS "Nombre",
    correo_cliente AS "Email",
    a.dui As "DUI",
    a.fecha_nacimiento_cliente AS "Fecha nacimiento",
    a.estado_cliente AS "Estado cliente"
FROM clientes a
ORDER BY a.id_cliente ASC

SELECT * FROM usuariosView

CREATE VIEW vista_productos AS
    SELECT
    p.id_producto AS "ID",
    p.nombre_producto AS "Nombre del Producto",
    p.imagen_producto AS "Imagen del Producto",
    p.descripcion_producto AS "Descripción del Producto",
    p.precio AS "Precio",
    p.cantidad_stock AS "Cantidad en Stock",
    p.valoracion_producto AS "Valoración del Producto",
    tp.tipo_producto AS "Tipo de Producto",
    u.nombre_usuario AS "Nombre del Usuario",
    c.nombre_categoria AS "Nombre de la Categoría"
FROM
    productos p
    LEFT JOIN tipos_productos tp ON p.id_tipo_producto = tp.id_tipo_producto
    LEFT JOIN usuarios u ON p.id_usuario = u.id_usuario
    LEFT JOIN categorias c ON p.id_categoria = c.id_categoria;
CREATE VIEW usuariosView AS
SELECT
    a.id_usuario AS "ID",
    a.nombre_usuario AS "Username",
    a.dui AS "DUI",
    CAST(a.fecha_nacimiento_usuario AS DATE) AS "Fecha nacimiento",
    a.estado_usuario AS "Estado",
    a.nivel_usuario AS "Nivel"
FROM usuarios as a;

SELECT * FROM carritoView

 AS
SELECT
    a.id_pedido_catalogo AS "ID",
    a.fecha_pedido AS "fecha",
    a.hora_pedido AS "hora",
    b.estado_pedido AS "Orderstatus",
    concat(
        c.nombre_cliente,
        ' ',
        c.apellido_cliente
    ) AS "Client"
FROM
    pedidos_catalogo a,
    estados_pedidos b,
    clientes c
WHERE
    a.id_cliente = c.id_cliente
    AND a.id_estado_pedido = b.id_estado_pedido
ORDER BY a.id_pedido_catalogo ASC

CREATE VIEW carritoView AS
SELECT
    a.id_carrito AS "ID",
    a.cantidad AS "Cantidad",
    b.resenia AS "Review",
    c.nombre AS "Product",
    c.descripcion AS "Product desc"
FROM
    carrito a,
    resenia_detalles b,
    productos c
ORDER BY a.id_carrito ASC

SELECT
    c.nombre_categoria,
    COUNT(p.id_producto) AS cantidad_productos
FROM categorias as c
    LEFT JOIN productos p ON c.id_categoria = p.id_categoria
WHERE p.id_producto IS NOT NULL
GROUP BY
    c.id_categoria,
    c.nombre_categoria
ORDER BY c.id_categoria;

SELECT
    c.id_producto,
    p.nombre,
    SUM(c.cantidad) AS total_vendido
FROM carrito c
    INNER JOIN productos p ON c.id_producto = p.id_producto
WHERE
    c.fecha >= NOW() - INTERVAL '1 year'
GROUP BY
    c.id_producto,
    p.nombre
ORDER BY total_vendido DESC
LIMIT 10;

--

SELECT
    c.tipo_producto,
    COUNT(p.id_producto) AS cantidad_productos
FROM tipos_productos c
    LEFT JOIN productos p ON c.id_tipoproducto = p.id_tipoproducto
WHERE p.id_producto IS NOT NULL
GROUP BY
    c.id_tipoproducto,
    c.tipo_producto
ORDER BY c.id_tipoproducto;

SELECT EXTRACT(
        MONTH
        FROM
            pc.fecha
    ) AS mes,
    p.nombre,
    COUNT(*) AS cantidad_pedidos
FROM pedidos_catalogo pc
    JOIN carrito c ON pc.id_pedido_c = c.id_pedido_c
    JOIN productos p ON c.id_producto = p.id_producto
WHERE pc.id_estadopedido = 1
GROUP BY mes, p.nombre
ORDER BY
    mes,
    cantidad_pedidos DESC;

-- Cantidad de pedidos por mes

SELECT EXTRACT(
        MONTH
        FROM
            fecha
    ) AS mes,
    COUNT(*) AS cantidad_pedidos
FROM pedidos_catalogo
GROUP BY mes
ORDER BY mes;

SELECT
    SUM(p.precio) AS total_productos_vendidos
FROM pedidos_catalogo pc
    JOIN carrito c ON pc.id_pedido_c = c.id_pedido_c
    JOIN productos p ON c.id_producto = p.id_producto
WHERE pc.id_estadopedido = 3;

SELECT
    p.nombre,
    SUM(c.cantidad) AS cantidad_vendida
FROM productos p
    JOIN carrito c ON p.id_producto = c.id_producto
GROUP BY p.nombre
ORDER BY cantidad_vendida DESC
LIMIT 10;

SELECT
    nu.nivel_usuario,
    COUNT(*) AS cantidad_clientes
FROM usuarios u
    JOIN niveles_usuarios nu ON u.id_nivelusuario = nu.id_nivelusuario
GROUP BY nu.nivel_usuario;

SELECT * FROM carritoview drop view carritoView 

CREATE VIEW carritoView AS
SELECT
    a.id_carrito AS "ID",
    b.imagen_producto AS "img",
    b.nombre_producto AS "nombre_producto",
    b.precio AS "precio_producto",
    a.cantidad AS "cantidad_producto",
    b.descripcion_producto AS "desc_producto", (a.cantidad * b.precio) AS "total"
FROM carrito a, productos b
ORDER BY id_carrito ASC
LIMIT 8