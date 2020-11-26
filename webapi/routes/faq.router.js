const route = require('express').Router();
const FAQService = require('../src/services/FAQ/FAQService');

route.post('/', (req, res) => {
    console.log(req.body);
    result = FAQService.addQuestionAndAnswer(req.question, req.answer);
    res.status(200).send({message : result})
});


module.exports = route;