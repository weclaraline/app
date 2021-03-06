const EntitySchema = require("typeorm").EntitySchema;
const Recomendation = require("../model/Recomendation").Recomendation;

module.exports = new EntitySchema({
    name: "Recomendation",
    target: Recomendation,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        key: {
            type: "varchar"
        },
        concept: {
            type: "varchar"
        },
        text: {
            type: "text"
        }
    }
});