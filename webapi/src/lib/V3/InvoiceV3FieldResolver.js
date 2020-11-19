
class InvoiceV3FieldResolver {
  constructor( ) {
  }

  getUsoCFDI(parsedObject){
    return parsedObject['cfdi:Comprobante']['cfdi:Receptor'][0]['$']['UsoCFDI']

  }
  getFormaPago(parsedObject) {
    return parsedObject['cfdi:Comprobante']['$']['FormaPago']
  }
  getVersion(parsedObject) {
    return parsedObject['cfdi:Comprobante']['$']['Version']
  }
}

module.exports = InvoiceV3FieldResolver;