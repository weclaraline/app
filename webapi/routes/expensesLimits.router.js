const route = require('express').Router();
const expensesLimitsService = require('../src/services/expensesLimits/ExpensesLimitsService');

route.post('/', (req, res) => {
    expensesLimitsService.addExpenseLimit(req.body.concept, req.body.amount)
        .then(result => res.status(200).send({message: result}));
});

route.get('/', (req, res) => {
    expensesLimitsService.getExpensesLimits()
        .then(result => res.send(result));
});

route.get('/:id', (req, res) => {
    let id = req.params.id;
    expensesLimitsService.getExpensesLimits(id)
        .then(result => res.send(result));
});

route.get('/:concept', (req, res) => {
    let concept = req.params.concept;
    expensesLimitsService.getExpensesLimitByConcept(concept)
        .then(result => res.send(result));
});

route.get('/current/:ownerId/:concept', (req, res) => {
    let ownerId = req.params.ownerId;
    let concept = req.params.concept;
    expensesLimitsService.getCurrentExpense(ownerId, concept)
        .then(result => res.send(result));
})


module.exports = route;