const EntitySchema = require("typeorm").EntitySchema; // import {EntitySchema} from "typeorm";
const Invoice = require("../model/Invoice").Invoice; // import {Post} from "../model/Post";

module.exports = new EntitySchema({
    name: "Invoice",
    target: Invoice,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        ownerId: {
            type: "varchar"
        },
        date: {
            type: "timestamp"
        },
        concept: {
            type: "varchar"
        },
        description: {
            type: "varchar"
        },
        total: {
            type: "decimal"
        },
        UUID: {
            type: "varchar"
        },
        xml: {
            type: "text"
        },
        analysisResult: {
            type: "text"
        },
        commited: {
            type: "text"
        }
    }
});

 