const { getManager, getRepository } = require("typeorm");
const requirementsEntity = require("../../entity/RequirementsSchema");
const { Requirements } = require("../../model/Requirements");

async function post({ key = '', concept = '', text = '' }) {
    const requirement = new Requirements(key, concept, text);
    const insertResult = await getManager().getRepository(requirementsEntity).save(requirement);
    return insertResult;
  }
  
  module.exports = {
    post,
  };