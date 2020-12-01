const route = require('express').Router();
const UsersService = require("../src/services/Users/UsersService");

    route.post('/', async (req, res) => {
        const recommendations = await UsersService.post(req.body, req.headers);
        res.send(recommendations);
    });

    route.put('/', async (req, res) => {
        const recommendations = await UsersService.put(req.body, req.headers);
        res.send(recommendations);
    });


    route.get('/', async (req, res) => {
        const recommendations = await UsersService.get(req.headers);
        res.send(recommendations);
    });

module.exports = route;