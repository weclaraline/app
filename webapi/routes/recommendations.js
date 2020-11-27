const route = require('express').Router();
const RecomendationService = require("../src/services/recomendation/RecomendationService");

    route.post('/', async (req, res) => {
        const recommendations = await RecomendationService.post(req.body);
        res.send(recommendations);
    });
    route.get('/', async (req, res) => {
        RecomendationService.get()
        .then(result => res.send(result));
    });
    
    route.get('/:key', function (req, res) {
        const key = req.params.key || undefined;
        RecomendationService.get(key)
        .then(result => res.send(result));
    });

module.exports = route;