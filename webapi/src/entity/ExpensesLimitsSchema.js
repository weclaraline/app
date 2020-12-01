const EntitySchema = require("typeorm").EntitySchema;
const ExpensesLimits = require('../model/ExpensesLimits').ExpensesLimits; 

module.exports = new EntitySchema({
    name: "ExpensesLimits",
    target: ExpensesLimits,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        concept: {
            type: "varchar"
        },
        amount: {
            type: "int"
        }
    }
});