const routes = require('express').Router()


routes.get("/", (req, res, next) => {
    return res.status(200).json({
        message: "Hello from auth!",
    });
});


routes.get("/register", (req, res, next) => {
    return res.status(200).json({
        message: "Hello from auth register!",
    });
});

routes.get("/login", (req, res, next) => {
    return res.status(200).json({
        message: "Hello from auth login!",
    });
});


module.exports.AuthRoutes = routes;
