const EntitySchema = require("typeorm").EntitySchema;
const Faq = require('../model/Faq').FAQ; 

module.exports = new EntitySchema({
    name: "FAQ",
    target: Faq,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        question: {
            type: "varchar"
        },
        answer: {
            type: "varchar"
        },
        created_at: {
            type: "timestamp"
        }
    }
});