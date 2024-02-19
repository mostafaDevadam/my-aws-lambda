const routes = require('express').Router()


routes.get("/", (req, res, next) => {
    return res.status(200).json({
        message: "Hello from products!",
    });
});


module.exports.ProductRoutes = routes;
