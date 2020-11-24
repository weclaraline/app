const XMLParser = require("../src/lib/utils/XMLParser");
var assert = require("assert");

const {
  getFormaPago,
  getVersion,
  getUsoCFDI,
  getConcepts,
  conceptGetClaveProdServ,
  getUUID,
  getDate,
  getTotal,
} = require("../src/lib/InvoiceFieldResolver");
const fileReader = require("../src/lib/utils/FileReader");

const filePath = "./XML/sgm.xml";
const filePathCashPaid = "./XML/sgmefectivo.xml";
const bankXML = "./XML/banco.xml";

describe("InvoiceFieldResolver", function () {
  describe("Get the cfdi version", function () {
    it("return the correct version 3.3", async function () {
      console.log(__dirname);
      const data = await fileReader.readFile(filePath);
      const parsed = XMLParser.ParseXMLString(data);
      const version = getVersion(parsed);
      assert.strictEqual(version, "3.3");
    });
  });

  describe("Get the use cfdi field", function () {
    it("return the correct cfdi use field D07 of a medical inssurance invoice", async function () {
      const data = await fileReader.readFile(filePath);
      const parsed = XMLParser.ParseXMLString(data);
      const version = getUsoCFDI(parsed);
      assert.strictEqual(version, "D07");
      console.log(version);
    });
  });

  describe("Get the use payment way field", function () {
    it("return the correct cfdi payment way 99 for non defined ", async function () {
      const data = await fileReader.readFile(filePath);
      const parsed = XMLParser.ParseXMLString(data);
      const version = getFormaPago(parsed);
      assert.strictEqual(version, "99");
      console.log(version);
    });
  });

  describe("Get the use payment way field", function () {
    it("return the correct cfdi payment way 01 for cash", async function () {
      const data = await fileReader.readFile(filePathCashPaid);
      const parsed = XMLParser.ParseXMLString(data);
      const paymentWay = getFormaPago(parsed);
      assert.strictEqual(paymentWay, "01");
    });
  });

  describe("Get the concepts", function () {
    it("return the concepts of a invoice", async function () {
      const data = await fileReader.readFile(filePathCashPaid);
      const parsed = XMLParser.ParseXMLString(data);
      const concepts = getConcepts(parsed);
      assert.notDeepStrictEqual(undefined, concepts);
    });
  });

  describe("Get the concept's claveprodserv", function () {
    it("return the concept's claveprodserv of a invoice when the invoice has 84131602", async function () {
      const data = await fileReader.readFile(filePathCashPaid);
      const parsed = XMLParser.ParseXMLString(data);
      const concepts = getConcepts(parsed);
      assert.notDeepStrictEqual(undefined, concepts);
      const claveprodserv = conceptGetClaveProdServ(parsed, concepts[0]);
      assert.strictEqual(claveprodserv, "84131602");
    });
  });

  describe("Get the UUID", function () {
    it("return the uuid of an invoice", async function () {
      const data = await fileReader.readFile(bankXML);
      const parsed = XMLParser.ParseXMLString(data);
      const uuid = getUUID(parsed);
      assert.notDeepStrictEqual(undefined, uuid);
      assert.strictEqual(uuid, "A4F3850C-BF45-4B2A-98E1-C3B95EC3C155");
    });
  });
  describe("Get the date", function () {
    it("return the date of an invoice", async function () {
      const data = await fileReader.readFile(bankXML);
      const parsed = XMLParser.ParseXMLString(data);
      const uuid = getDate(parsed);
      assert.notDeepStrictEqual(undefined, uuid);
      assert.strictEqual(uuid, "2020-09-30T23:59:59");
    });
  });
  describe("Get the total", function () {
    it("return the total of an invoice", async function () {
      const data = await fileReader.readFile(bankXML);
      const parsed = XMLParser.ParseXMLString(data);
      const uuid = getTotal(parsed);
      assert.notDeepStrictEqual(undefined, uuid);
      assert.strictEqual(uuid, "3751.31");
    });
  });
});
