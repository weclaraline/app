const route = require('express').Router();
const RequirementsService = require("../src/services/requirements/RequirementsService");

    route.post('/', async (req, res) => {
        const recommendations = await RequirementsService.post(req.body);
        res.send(recommendations);
    });

module.exports = route;