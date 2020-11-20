const fileReader = require("./lib/utils/FileReader");
const xmlParser = require("./lib/utils/XMLParser");
const InvoiceAnalyzer = require("./lib/analysis/InvoiceAnalyzer");
const {
  getFormaPago,
  getVersion,
  getUsoCFDI,
} = require("./lib/InvoiceFieldResolver");

// fileReader.readFile("../XML/sgm.xml", function (data) {
//   let parsed = xmlParser.ParseXMLString(data);
//   console.log(parsed);
// });

async function app() {
  let data = await fileReader.readFile("../XML/hmotrosconceptos.xml");
  let parsed = xmlParser.ParseXMLString(data);

  console.log(parsed);

  console.log(getVersion(parsed));

  console.log(getFormaPago(parsed));
  console.log(getUsoCFDI(parsed));
  let analyzer = new InvoiceAnalyzer();

  const res = analyzer.analyze(parsed);
  console.log(res)
}

app();
