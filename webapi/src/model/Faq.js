
class FAQ {
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
        this.created_at = new Date();
    }
}

module.exports = { FAQ };