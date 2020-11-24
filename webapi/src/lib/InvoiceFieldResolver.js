const InvoiceV3FieldResolver = require("./V3/InvoiceV3FieldResolver");

function getFormaPago(parsedObject) {
  const resolver = getResolver(getVersion(parsedObject));
  return resolver.getFormaPago(parsedObject);
}

function getUsoCFDI(parsedObject) {
  const resolver = getResolver(getVersion(parsedObject));
  return resolver.getUsoCFDI(parsedObject);
}

function getUUID(parsedObject) {
  const resolver = getResolver(getVersion(parsedObject));
  return resolver.getUUID(parsedObject);
}

function getDate(parsedObject) {
  const resolver = getResolver(getVersion(parsedObject));
  return resolver.getDate(parsedObject);
}

function getTotal(parsedObject) {
  const resolver = getResolver(getVersion(parsedObject));
  return resolver.getTotal(parsedObject);
}

function getVersion(parsedObject) {
  return parsedObject["cfdi:Comprobante"]["$"]["Version"];
}

function getConcepts(parsedObject) {
  const resolver = getResolver(getVersion(parsedObject));
  return resolver.getConcepts(parsedObject);
}

function conceptGetClaveProdServ(parsedObject, concept) {
  const resolver = getResolver(getVersion(parsedObject));
  return resolver.conceptGetClaveProdServ(concept);
}

function getResolver(version) {
  if (version === "3.3") {
    return new InvoiceV3FieldResolver();
  }
  return new InvoiceV3FieldResolver();
}

module.exports = {
  getFormaPago: getFormaPago,
  getVersion: getVersion,
  getUsoCFDI: getUsoCFDI,
  getConcepts: getConcepts,
  conceptGetClaveProdServ: conceptGetClaveProdServ,
  getUUID: getUUID,
  getDate: getDate,
  getTotal: getTotal,
};
