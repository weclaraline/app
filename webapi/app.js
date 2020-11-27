const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createConnection } = require('typeorm');
const app = express();
const port = 3000;
const portFrontEnd = 5000;
const fileUpload = require('express-fileupload'); 
const InvoiceService = require("./src/services/invoices/InvoicesService");

const faqRouter = require("./routes/faq.router");
const recommendationRouter = require("./routes/recommendations");
const invoicesRouter = require("./routes/invoice");

const supportLinksRouter = require("./routes/supportLinks.router");

app.use(cors());
app.use(fileUpload({
  limits: { fileSize: 1 * 1024 * 1024 },
}));

app.get('/', (req, res) => {
  res.send('Hello Weclaraline!')
})
app.use(bodyParser.urlencoded({ extended: true }));
createConnection({
  type: "postgres",
  host: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  synchronize: true,
  logging: false,
  entities: [
      require("./src/entity/PostSchema"),
      require("./src/entity/InvoiceSchema"),
      require("./src/entity/RecomendationSchema"),
      require("./src/entity/FaqSchema"),
      require("./src/entity/SupportLinksSchema")
  ]
}).then(() => {

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use("/recommendations", recommendationRouter);
  app.use('/faq', faqRouter);
  app.use('/invoices', invoicesRouter);
  app.use('/links', supportLinksRouter);

  
  app.listen(port, () => {
    console.log(`API running in ${process.env.environment}`);
    console.log(`Example app listening at http://localhost:${port}`)
  });
}).catch(error => console.log(error));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.post('/upload', function(req, res) {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send('No files were uploaded.');
//   }
//   let sampleFile = req.files.xml;
//   const analysisRes = InvoiceService.processUpload(sampleFile.data, req.body.uid)
//   res.send(analysisRes)
// });


// app.post("/invoice/commit", async function (req, res) {
//   const result = await InvoiceService.commitInvoice(req.body.uuid, req.body.status);
//   res.send(result)
// });

// Avoid CORS error
app.use(function(req, res, next) {
  const allowedOrigins = [
    `http://localhost:${portFrontEnd}`, 
    `http://localhost:${port}`
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
