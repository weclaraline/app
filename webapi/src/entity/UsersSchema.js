const EntitySchema = require("typeorm").EntitySchema;
const Users = require("../model/Users").Users;

module.exports = new EntitySchema({
    name: "Users",
    target: Users,
    columns: {
        id: {
            primary: true,
            type: "varchar"
        },
        name: {
            type: "varchar"
        },
        email: {
            type: "varchar"
        },
        rfc: {
            type: "text"
        },
        address: {
            type: "text"
        }
    }
});