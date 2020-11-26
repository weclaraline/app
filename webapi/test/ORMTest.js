var assert = require("assert");
const dotenv = require("dotenv");
const { getManager, getRepository, createConnection } = require("typeorm");
var path = require('path');
var dotEnvPath = path.resolve('../.env');
require('dotenv').config({ path: dotEnvPath})
const { Post } = require("../src/model/Post");
const entity = require("../src/entity/PostSchema");
const { doesNotMatch } = require("assert");

const connection = () => (
    createConnection({
        type: "postgres",
        host: process.env.DB_HOSTNAME,
        port: process.env.DB_PORT,
        username: process.env.DB_USER_NAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
        synchronize: true,
        logging: false,
        entities: [
            require("../src/entity/PostSchema")
        ]
      }).catch(error => console.log(error))
);

    describe("ORM CRUD", function () {
        describe("Create", function () {
          it("return everything is ok on a perfect insert", async function () {
            await connection();
            const tests = new Post("Test22", "some tests");
            const insertResult = await getManager().getRepository(entity).save(tests);
            console.log(insertResult.id);
            assert.strictEqual(insertResult.id, 14);
          });
        });


        // describe("GET ONE", function () {
        //     it("return everything is ok on a perfect get", async function () {
        //       await connection();
        //       const resultData = await getManager().getRepository(entity).findOne({
        //         where: {
        //             id: 13
        //         }
        //     });
        //     console.log(resultData);
        //     assert.strictEqual(resultData.id, 12);
        //     });
        //   });

        // describe("GET ALL", function () {
        //     it("return everything is ok on a perfect get", async function () {
        //       await connection();
        //       const resultData = await getManager().getRepository(entity).find({
        //         where: {
        //             title: "Test2"
        //         }
        //     });
        //     console.log(resultData.length);
        //     assert.strictEqual(resultData.length, 10);
        //     });
        //   });
        // describe("UPDATE", function () {
        //     it("return everything is ok on a perfect update", async function () {
        //         await connection();
        //         const clientNewData = new Post("data", "test new data");
        //         const resultData = await getManager().getRepository(entity).update({id: 2}, clientNewData);
        //         console.log(resultData);
        //         assert.strictEqual(resultData.affected, 1);
        //     });
        //   });
      });