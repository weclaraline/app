const { getManager, getRepository } = require("typeorm");
const { groupBy, flatten } = require('ramda');
const recommendationEntity = require("../../entity/RecomendationSchema");
const { Recomendation } = require("../../model/Recomendation");

const groupByKey = groupBy(recommendations => `${recommendations.key}`);

const buildRecommendation = recommendationsData => {
  const recommGrouped = groupByKey(recommendationsData);

  return Object.keys(recommGrouped).map(recommKey => {
    const recommArray = [];
    recommGrouped[recommKey].forEach(recommendation => recommArray.push({ "description": recommendation.text }));
    return ({
      "key": recommKey,
      "deduction": recommGrouped[recommKey][0].concept,
      "recommendations": recommArray
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

    return buildRecommendation(recommendationsData);
  }

  const recommendationsData = await getManager().getRepository(recommendationEntity).find();
  return buildRecommendation(recommendationsData);
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
