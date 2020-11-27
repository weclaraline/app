const route = require('express').Router();
const SupportLinksService = require('../src/services/SupportLinks/SupportLinksService');

route.post('/', (req, res) => {
    SupportLinksService.addSupportLink(req.body.link, req.body.description)
        .then(result => res.status(200).send({message : result}));
});

route.get('/', (req, res) => {
    SupportLinksService.getSupportLinks()
        .then(result => res.send(result));
});

route.get('/:id', (req, res) => {
    let id = req.params.id;
    SupportLinksService.getSupportLinks(id)
        .then(result => res.send(result));
});

module.exports = route;