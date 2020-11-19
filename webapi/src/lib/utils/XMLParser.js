var parseString = require("xml2js").parseString;

module.exports.ParseXMLString = (XMLString) => {
  let parsed = null;
  parseString(XMLString, function (err, result) {
    parsed = result;
  });
  return parsed;
};
