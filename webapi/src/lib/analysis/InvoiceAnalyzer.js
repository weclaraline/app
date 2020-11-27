const {
  getFormaPago,
  getUsoCFDI,
  getConcepts,
  conceptGetClaveProdServ,
  getTotal,
  getUUID
} = require("../../lib/InvoiceFieldResolver");

const MEDICAL_EXPENSES_KEY = 'D01'; //Gastos medicos
const MEDICAL_INSURANCE_KEY = 'D07'; //Primas de seguros
const SCHOLAR_MONTHLY_TARIF = 'D10'; //Colegiaturas
const FUNERAL_EXPENSES = 'D03'; //Gastos Funerales 
const MORTGAGE_CREDIT = 'D05'; //Creditos hipotecarios   
const DONATIONS = 'D04'; //Donativos  
const RETIREMENT_APORTATION = 'D06'; //Aportaciones al retiro
 
const CORRECT_INVOICE_STATUS = 'ok';

const INCORRECT_INVOICE_STATUS = 'notok';
const CASH_PAID_KEY = '01';
const CASH_PAID_MESSAGE = 'La factura fue pagada en efectivo';
const CASH_PAID_CODE = '1';
const CRITIC_LEVEL_KEY = 'critic';

const MEDICAL_INSURANCE_CONCEPT ='Seguro de gastos médicos';
const MEDICAL_EXPENSE_CONCEPT ='Gastos médicos';
const CONCEPT_DOES_NOT_MEDICAL = 'El concepto no corresponde con un gasto medico clave: '
const CONCEPT_DOES_NOT_MEDICAL_CODE = '2';


class InvoiceAnalyzer {
  constructor() {}

  analyze(invoice) {
    const analyzer = this.getAnalyzer(invoice);
    return analyzer.analyze(invoice);
  }

  getAnalyzer(invoice) {
    const paymentForm = getUsoCFDI(invoice);
    if (paymentForm === MEDICAL_INSURANCE_KEY) {
      return new MedicalInsuranceInvoiceAnalyzer();
    } else if (paymentForm === MEDICAL_EXPENSES_KEY) {
      return new MedicalExpenseInvoiceAnalyzer();
    }
  }
}

class InvoiceGeneralAnalyzer {
  constructor() {}
  analyze(invoice) {
    const paymentForm = getFormaPago(invoice);
    const total = getTotal(invoice);
    const UUID = getUUID(invoice);

    let res = {
      concept: "",
      description: '',
      total: total,
      uuid: UUID,
      analysisResult: {
        status: CORRECT_INVOICE_STATUS,
        observations: [],
      },
    };

    if (paymentForm === CASH_PAID_KEY) {
      res.analysisResult.status = INCORRECT_INVOICE_STATUS
      res.analysisResult.observations.push({
        description: CASH_PAID_MESSAGE,
        level: CRITIC_LEVEL_KEY,
        code: CASH_PAID_CODE,
      });

      
    }
    return res;
  }
}

class MedicalInsuranceInvoiceAnalyzer {
  constructor() {}

  analyze(invoice) {
    const invoiceAnalyzer = new InvoiceGeneralAnalyzer();

    let generalObservations = invoiceAnalyzer.analyze(invoice);

    generalObservations.concept = MEDICAL_INSURANCE_CONCEPT

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
    generalObservations.concept = MEDICAL_EXPENSE_CONCEPT

    const concepts = getConcepts(invoice);

    concepts.forEach((concept) => {
      const satKey = conceptGetClaveProdServ(invoice, concept);
      const foundParentSatKey = this.validProductSATKeys.filter((parentKey) => {
        return satKey.startsWith(parentKey);
      });

      if (foundParentSatKey.length !== 1) {
        generalObservations.analysisResult.status = INCORRECT_INVOICE_STATUS
        generalObservations.analysisResult.observations.push({
          description:
          CONCEPT_DOES_NOT_MEDICAL + satKey,
          level: CRITIC_LEVEL_KEY,
          code: CONCEPT_DOES_NOT_MEDICAL_CODE,
        });
      }
    });

    return generalObservations;
  }
}

module.exports = InvoiceAnalyzer;
