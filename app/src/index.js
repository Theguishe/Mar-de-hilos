const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const productRoutes = require('./routes/products.routes');
const clientRoutes = require('./routes/clients.routes');
const userRoutes = require('./routes/users.routes');
const orderCatalog = require('./routes/catalog_orders.routes');
const cart = require('./routes/carts.routes');

const app = express();

app.listen(5000);
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(productRoutes, clientRoutes, userRoutes, orderCatalog, cart);

app.use((err, req, res, next) => {
    return res.json({
        message: "Error!!"
        
    })
    console.log(error.message);
});

console.log("Server on port 5000");