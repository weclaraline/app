const Invoice = require("../../model/Invoice").Invoice;
const { getManager, getRepository, createConnection } = require("typeorm");
const entity = require("../../entity/InvoiceSchema");

const xmlParser = require("../../lib/utils/XMLParser");
const InvoiceAnalyzer = require("../../lib/analysis/InvoiceAnalyzer");

const { getDate } = require("../../lib/InvoiceFieldResolver");
const commited = "save";

async function processUpload(fileData, uid) {
  var str = fileData.toString("utf-8");
  let parsed = xmlParser.ParseXMLString(str);
  let analyzer = new InvoiceAnalyzer();
  const analysisResult = analyzer.analyze(parsed);
  const schema = BuildSchema(parsed, str, uid, analysisResult);
  await create(schema);
  return analysisResult;
}

async function commitInvoice(uuid, status, description, uid) {
  if (status === "save") {
    let persisted = await GetbyUUID(uuid, uid);
    persisted.commited = status;
    persisted.description = description;
    update(persisted);
  } else if (status === "dispose") {
    deleteInvoicebyUUID(uuid);
  }
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
  toSave.commited = "pending";
  return toSave;
}

async function create(invoice) {
  const insertResult = await getManager().getRepository(entity).save(invoice);
}

async function GetbyUUID(uuid, uid) {
  const resultData = await getManager()
    .getRepository(entity)
    .findOne({
      where: {
        UUID: uuid,
        ownerId: uid
      },
    });
    return resultData;
}

async function update(invoice) {
  const resultData = await getManager()
    .getRepository(entity)
    .update({ id: invoice.id }, invoice);
}

async function deleteInvoicebyUUID(uuid) {
  const resultData = await getManager()
    .getRepository(entity)
    .delete({ UUID: uuid });
}

async function getByDate({ month = 01, year= 2020 }, { userid }) {
  return getManager()
    .createQueryBuilder(entity, "invoice")
    .where("EXTRACT(MONTH FROM invoice.date) = :month", { month })
    .andWhere("EXTRACT(YEAR FROM invoice.date) = :year", { year })
    .andWhere("invoice.ownerId = :userId", { userId: userid })
    .andWhere("invoice.commited = :commited", { commited })
    .getMany();
}

module.exports = {
  processUpload: processUpload,
  commitInvoice: commitInvoice,
  getByDate,
};
