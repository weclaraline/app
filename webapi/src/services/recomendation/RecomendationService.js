function get(filterKey) {
  if (filterKey) {
    return "some recomendations" + filterKey;
  }
  return "some recomendations";
}

module.exports = {
  get: get,
};
