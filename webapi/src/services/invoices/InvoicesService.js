// app.post('/upload', function(req, res) {
//     if (!req.files || Object.keys(req.files).length === 0) {
//       return res.status(400).send('No files were uploaded.');
//     }

//     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//     let sampleFile = req.files.xml;
//     var str = sampleFile.data.toString('ascii')
//     // // Use the mv() method to place the file somewhere on your server
//     // sampleFile.mv('/somewhere/on/your/server/filename.jpg', function(err) {
//     //   if (err)
//     //     return res.status(500).send(err);

//     //   res.send('File uploaded!');
//     // });
//     res.send(str)
//   });
const xmlParser = require("../../lib/utils/XMLParser");
const InvoiceAnalyzer = require("../../lib/analysis/InvoiceAnalyzer");


function processUpload(fileData, description) {
  var str = fileData.toString("utf-8");
  let parsed = xmlParser.ParseXMLString(str);
  let analyzer = new InvoiceAnalyzer();
  const res = analyzer.analyze(parsed, description);
  return res;
}

module.exports = {
  processUpload: processUpload,
};
