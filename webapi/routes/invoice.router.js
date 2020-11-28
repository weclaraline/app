const route = require('express').Router();
const invoiceService = require('../src/services/invoices/InvoicesService');

route.get('/:month/:year', (req, res) => {
    invoiceService.getByDate(req.params, req.headers)
    .then(result => res.send(result))
});


module.exports = route;