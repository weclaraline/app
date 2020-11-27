const { getManager, getRepository } = require("typeorm");
const usersEntity = require("../../entity/UsersSchema");
const { Users } = require("../../model/Users");

async function post({ name = '', rfc = '', email = '', address = '' }, { userid }) {
    const user = new Users(userid, name, rfc, address, email);
    const insertResult = await getManager().getRepository(usersEntity).save(user);
    return insertResult;
  }

async function get({ userid }) {
    return getManager().getRepository(usersEntity).find({ where: { id: userid } });
}
  
  module.exports = {
    post,
    get,
  };