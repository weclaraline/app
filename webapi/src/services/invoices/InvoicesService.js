const Invoice = require("../../model/Invoice").Invoice;

const xmlParser = require("../../lib/utils/XMLParser");
const InvoiceAnalyzer = require("../../lib/analysis/InvoiceAnalyzer");

const {
  getDate,
} = require("../../lib/InvoiceFieldResolver");

function processUpload(fileData, description) {
  var str = fileData.toString("utf-8");
  let parsed = xmlParser.ParseXMLString(str);
  let analyzer = new InvoiceAnalyzer();
  const analysisResult = analyzer.analyze(parsed, description);
  const schema = BuildSchema(parsed, str, 'ownerId', analysisResult);
  create(schema);
  return schema;
}

function BuildSchema(parsedXXML, xmlString, ownerId, analysisResult) {
  let toSave = new Invoice();

  toSave.UUID = analysisResult.uuid;
  toSave.concept = analysisResult.concept;
  toSave.description = analysisResult.description;
  toSave.total = analysisResult.total;
  toSave.date = getDate(parsedXXML);
  toSave.xml = xmlString;
  toSave.analysisResult = analysisResult.analysisResult;
  toSave.ownerId = ownerId;
  toSave.commited = 'pending';
  return toSave;
}

function create(invoice)
{

}



module.exports = {
  processUpload: processUpload,
};
