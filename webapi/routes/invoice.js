const route = require('express').Router();
const InvoiceService = require("../src/services/invoices/InvoicesService");

  route.post("/upload", async function (req, res) {
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

  route.post("/commit", async function (req, res) {
    const result = await InvoiceService.commitInvoice(
      req.body.uuid,
      req.body.status,
      req.body.description,
      req.body.uid
    );
    res.send(result);
  });


  route.get('/:month/:year', (req, res) => {
    InvoiceService.getByDate(req.params, req.headers)
    .then(result => res.send(result))
  });

  module.exports = route;