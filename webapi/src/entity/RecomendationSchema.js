const EntitySchema = require("typeorm").EntitySchema; // import {EntitySchema} from "typeorm";
const Recomendation = require("../model/Recomendation").Recomendation; // import {Post} from "../model/Post";

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
        text: {
            type: "text"
        }
    }
});