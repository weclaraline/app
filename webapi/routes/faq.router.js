const route = require('express').Router();
const FAQService = require('../src/services/FAQ/FAQService');

route.post('/', (req, res) => {
    FAQService.addQuestionAndAnswer(req.body.question, req.body.answer)
        .then(result => res.status(200).send({message : result}));
});

route.get('/', (req, res) => {
    FAQService.getQuestionsAndAnswers()
        .then(result => res.send(result));
});

module.exports = route;