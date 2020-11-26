const RecomendationService = require("../src/services/recomendation/RecomendationService");
const InvoiceService = require("../src/services/invoices/InvoicesService");

module.exports = function (app) {
  app.post("/upload", async function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    let sampleFile = req.files.xml;
    const analysisRes = await InvoiceService.processUpload(
      sampleFile.data,
      req.body.uid
    );
    res.send(analysisRes);
  });

  app.post("/invoice/commit", async function (req, res) {
    const result = await InvoiceService.commitInvoice(
      req.body.uuid,
      req.body.status,
      req.body.description
    );
    res.send(result);
  });
};
