const EntitySchema = require("typeorm").EntitySchema;
const SupportLinks = require('../model/SupportLinks').SupportLinks;

module.exports = new EntitySchema({
    name: "SupportLinks",
    target: SupportLinks,
    columns: {
        id: {
            primary: true,
            type: "int", 
            generated: true
        },
        link: {
            type: "varchar"
        }, 
        description: {
            type: "varchar"
        },
        created_at: {
            type: "timestamp"
        }
    }
});