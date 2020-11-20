const {
  getFormaPago,
  getUsoCFDI,
  getConcepts,
  conceptGetClaveProdServ,
} = require("../../lib/InvoiceFieldResolver");

class InvoiceAnalyzer {
  constructor() {}

  analyze(invoice) {
    const analyzer = this.getAnalyzer(invoice);
    return analyzer.analyze(invoice);
  }

  getAnalyzer(invoice) {
    const paymentForm = getUsoCFDI(invoice);
    if (paymentForm === "D07") {
      return new MedicalInsuranceInvoiceAnalyzer();
    } else if (paymentForm === "D01") {
      return new MedicalExpenseInvoiceAnalyzer();
    }
  }
}

class InvoiceGeneralAnalyzer {
  constructor() {}
  analyze(invoice) {
    const paymentForm = getFormaPago(invoice);

    let observations = [];

    if (paymentForm === "01") {
      observations.push({
        description: "La factura fue pagada en efectivo",
        level: "critic",
        code: 1,
      });

      return observations;
    }
  }
}

class MedicalInsuranceInvoiceAnalyzer {
  constructor() {}

  analyze(invoice) {
    const invoiceAnalyzer = new InvoiceGeneralAnalyzer();

    let generalObservations = invoiceAnalyzer.analyze(invoice);

    return generalObservations;
  }
}

class MedicalExpenseInvoiceAnalyzer {
  validProductSATKeys = [
    "851215",
    "851216",
    "851217",
    "851218",
    "851219",
    "851220",
    "851221",
    "851222",
  ];

  constructor() {}

  analyze(invoice) {
    const invoiceAnalyzer = new InvoiceGeneralAnalyzer();

    let generalObservations = invoiceAnalyzer.analyze(invoice);

    const concepts = getConcepts(invoice);

    concepts.forEach((concept) => {
      // let found = false;
      const satKey = conceptGetClaveProdServ(invoice, concept);

      // validProductSATKeys.forEach((parentKey) => {
      //   if (satKey.startsWith(parentKey)) {
      //     found = true;
      //   }
      // });

       const foundParentSatKey = this.validProductSATKeys.filter(parentKey =>{ 
        return satKey.startsWith(parentKey)
       })

      if (foundParentSatKey.length !== 1) {
        generalObservations.push({
          description:
            "El concepto no corresponde con un gasto medico clave: " + satKey,
          level: "critic",
          code: 2,
        });
      }
    });

    return generalObservations;
  }
}

module.exports = InvoiceAnalyzer;
