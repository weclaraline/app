const XMLParser = require("../src/lib/utils/XMLParser");
var assert = require("assert");

const {
  getFormaPago,
  getVersion,
  getUsoCFDI,
  getConcepts,
  conceptGetClaveProdServ,
} = require("../src/lib/InvoiceFieldResolver");
const fileReader = require("../src/lib/utils/FileReader");

const filePath = "./XML/sgm.xml";
const filePathCashPaid = "./XML/sgmefectivo.xml";

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
});
