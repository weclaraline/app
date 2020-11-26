const FAQ_model = require("../../model/Faq").FAQ;
const FAQ_entity = require("../../entity/FaqSchema");
const { getManager } = require("typeorm");

async function addQuestionAndAnswer(question, answer) {
    let new_faq = new FAQ_model(question, answer);

    const response = await getManager().getRepository(FAQ_entity).save(new_faq);
    return response;
}


module.exports = {
    addQuestionAndAnswer
}