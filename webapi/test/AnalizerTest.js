const XMLParser = require("../src/lib/utils/XMLParser");
const InvoiceAnalyzer = require("../src/lib/analysis/InvoiceAnalyzer");
var assert = require("assert");

const fileReader = require("../src/lib/utils/FileReader");

const filePath = "/Users/luis.tejeda/Documents/Source/GitHub/weclaraline/app/webapi/XML/sgm.xml";
const filePathCashPaid = "/Users/luis.tejeda/Documents/Source/GitHub/weclaraline/app/webapi/XML/sgmefectivo.xml";


describe("InvoiceAnalyzer", function () {
  describe("Analyze", function () {
    it("return everything is ok on a perfect invoice of medical insurance", async function () {
   
      const data = await fileReader.readFile(filePath);
      const parsed = XMLParser.ParseXMLString(data);

      let analyzer = new InvoiceAnalyzer();

      const res = analyzer.analyze(parsed);
      assert.strictEqual(undefined, res);
      
    });
  });

  describe("Analyze", function () {
    it("return errors of medical insurance invoice paid with cash", async function () {
   
      const data = await fileReader.readFile(filePathCashPaid);
      const parsed = XMLParser.ParseXMLString(data);

      let analyzer = new InvoiceAnalyzer();

      const res = analyzer.analyze(parsed);
      assert.strictEqual(1, res.length);
      assert.strictEqual(1, res[0].code);
      
    });
  });
 

});