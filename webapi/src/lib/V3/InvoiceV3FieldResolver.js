class InvoiceV3FieldResolver {
  constructor() {}

  getUsoCFDI(parsedObject) {
    return parsedObject["cfdi:Comprobante"]["cfdi:Receptor"][0]["$"]["UsoCFDI"];
  }
  getFormaPago(parsedObject) {
    return parsedObject["cfdi:Comprobante"]["$"]["FormaPago"];
  }

  getUUID(parsedObject) {
    return parsedObject["cfdi:Comprobante"]["cfdi:Complemento"][0][
      "tfd:TimbreFiscalDigital"
    ][0]["$"]["UUID"];
  }

  getConcepts(parsedObject) {
    return parsedObject["cfdi:Comprobante"]["cfdi:Conceptos"][0][
      "cfdi:Concepto"
    ];
  }

  conceptGetClaveProdServ(concept) {
    return concept["$"]["ClaveProdServ"];
  }

  getVersion(parsedObject) {
    return parsedObject["cfdi:Comprobante"]["$"]["Version"];
  }

  getDate(parsedObject) {
    return parsedObject["cfdi:Comprobante"]["$"]["Fecha"];
  }

  getTotal(parsedObject) {
    return parsedObject["cfdi:Comprobante"]["$"]["Total"];
  }
}

module.exports = InvoiceV3FieldResolver;
