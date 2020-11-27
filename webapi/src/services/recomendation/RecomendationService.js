const { getManager, getRepository } = require("typeorm");
const { groupBy, flatten } = require('ramda');
const recommendationEntity = require("../../entity/RecomendationSchema");
const requirementsEntity = require("../../entity/RequirementsSchema");
const { Recomendation } = require("../../model/Recomendation");

const groupByKey = groupBy(recommendations => `${recommendations.key}`);

const buildRecommendation = (recommendationsData, requirementsData) => {
  const recommGrouped = groupByKey(recommendationsData);

  return Object.keys(recommGrouped).map(recommKey => {
    const recommArray = [];
    const reqArray = [];
    recommGrouped[recommKey].forEach(recommendation => recommArray.push({ "description": recommendation.text }));
    const requirementsFiltered = requirementsData.filter(req => req.key === recommKey);
    requirementsFiltered.forEach(requi => reqArray.push({ "description": requi.text }));

    return ({
      "key": recommKey,
      "deduction": recommGrouped[recommKey][0].concept,
      "recommendations": recommArray,
      "requirements": reqArray
    });
  });
};

async function get(filterKey) {
  if (filterKey) {
    const recommendationsData = await getManager().getRepository(recommendationEntity).find({
      where: {
        key: filterKey
      }
    });

    const requirementsData = await getManager().getRepository(requirementsEntity).find({
      where: {
        key: filterKey
      }
    });
    return buildRecommendation(recommendationsData, requirementsData);
  }

  const recommendationsData = await getManager().getRepository(recommendationEntity).find();
  const requirementsData = await getManager().getRepository(requirementsEntity).find();
  return buildRecommendation(recommendationsData, requirementsData);
}

async function post({ key = '', concept = '', text = '' }) {
  const recommendation = new Recomendation(key, concept, text);
  const insertResult = await getManager().getRepository(recommendationEntity).save(recommendation);
  return insertResult;
}

module.exports = {
  get,
  post,
};
