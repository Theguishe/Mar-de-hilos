// We import the needed extensions to be used
const express = require('express');
const morgan = require('morgan'); // We use morgan to make register http request from our server
const cors = require('cors'); // We use cors to establish headers to urls and make better petitions using customized domains to redirect to our server responses

// We import here the different controller to be used in the server
const productRoutes = require('./routes/products.routes');
const clientRoutes = require('./routes/clients.routes');
const userRoutes = require('./routes/users.routes');
const orderCatalog = require('./routes/catalog_orders.routes');
const cart = require('./routes/carts.routes');

// We establish an express variable to connect to our server
const app = express();

// We create a response, where we want to stablish our server responses
app.listen(5000);
app.use(cors()); // Cors to make our domains header in the url
app.use(morgan('dev')); // Morgan to save our http requests
app.use(express.json()); // We convert our responses into json format to transfer our data in the well form possible

// We declare all the controllers to take into account in server
app.use(productRoutes, clientRoutes, userRoutes, orderCatalog, cart);

// Here we manage the possible mistakes
app.use((err, req, res, next) => {
    return res.json({
        message: "Error!!"
        
    })
});

// We print a message in the console that specified our port server
console.log("Server on port 5000");