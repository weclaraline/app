const XMLParser = require("../src/lib/utils/XMLParser");
const InvoiceAnalyzer = require("../src/lib/analysis/InvoiceAnalyzer");
var assert = require("assert");

const fileReader = require("../src/lib/utils/FileReader");

const filePath =
  "/Users/luis.tejeda/Documents/Source/GitHub/weclaraline/app/webapi/XML/sgm.xml";
const filePathCashPaid =
  "/Users/luis.tejeda/Documents/Source/GitHub/weclaraline/app/webapi/XML/sgmefectivo.xml";
const filePathHMOOtros =
  "/Users/luis.tejeda/Documents/Source/GitHub/weclaraline/app/webapi/XML/hmotrosconceptos.xml";

describe("InvoiceAnalyzer", function () {
  describe("Analyze", function () {
    it("return everything is ok on a perfect invoice of medical insurance", async function () {
      const data = await fileReader.readFile(filePath);
      const parsed = XMLParser.ParseXMLString(data);

      let analyzer = new InvoiceAnalyzer();

      const res = analyzer.analyze(parsed, "description");
      assert.strictEqual(res.analysisResult.status, "ok");
      assert.strictEqual(res.analysisResult.observations.length, 0);
    });
  });

  describe("Analyze", function () {
    it("return errors of medical insurance invoice paid with cash", async function () {
      const data = await fileReader.readFile(filePathCashPaid);
      const parsed = XMLParser.ParseXMLString(data);

      let analyzer = new InvoiceAnalyzer();

      const res = analyzer.analyze(parsed, "desc");
      assert.strictEqual(res.analysisResult.status, "notok");
      assert.strictEqual(res.analysisResult.observations[0].code, '1');
    });
  });

  describe("Analyze", function () {
    it("return errors of medical expense invoice paing other concepts", async function () {
      const data = await fileReader.readFile(filePathHMOOtros);
      const parsed = XMLParser.ParseXMLString(data);

      let analyzer = new InvoiceAnalyzer();

      const res = analyzer.analyze(parsed, "desc");
      assert.strictEqual(res.analysisResult.status, "notok");
      console.log(res);

      assert.strictEqual(res.analysisResult.observations[0].code, '1');
      assert.strictEqual(res.analysisResult.observations[1].code, '2');
    });
  });
});
