const EntitySchema = require("typeorm").EntitySchema; // import {EntitySchema} from "typeorm";
const Post = require("../model/Post").Post; // import {Post} from "../model/Post";

module.exports = new EntitySchema({
    name: "Post",
    target: Post,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        title: {
            type: "varchar"
        },
        text: {
            type: "text"
        }
    }
});