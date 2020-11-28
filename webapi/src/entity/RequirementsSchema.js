const EntitySchema = require("typeorm").EntitySchema;
const Requirements = require("../model/Requirements").Requirements;

module.exports = new EntitySchema({
    name: "Requirements",
    target: Requirements,
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