const { AuthRoutes } = require('./auth.routes');
const { ProductRoutes } = require('./products.routes');
const { UserRoutes } = require('./users.routes');

const routes = require('express').Router()

routes.use('/products', ProductRoutes)
routes.use('/users', UserRoutes)
routes.use('/auth', AuthRoutes)


module.exports.Routes = routes;
