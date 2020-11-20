const { getFormaPago, getUsoCFDI } = require("../../lib/InvoiceFieldResolver");

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
  constructor() {}

  analyze(invoice) {
    const invoiceAnalyzer = new InvoiceGeneralAnalyzer();

    let generalObservations = invoiceAnalyzer.analyze(invoice);

    return generalObservations;
  }
}

module.exports = InvoiceAnalyzer;
