const express = require('express');
const bodyParser = require('body-parser');
const { createConnection } = require('typeorm');
const app = express();
const port = 3000;
const fileUpload = require('express-fileupload'); 
const InvoiceService = require("./src/services/invoices/InvoicesService");

const faqRouter = require("./routes/faq.router");
app.use(fileUpload({
  limits: { fileSize: 1 * 1024 * 1024 },
}));

app.get('/', (req, res) => {
  res.send('Hello Weclaraline!')
})

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
      require("./src/entity/FaqSchema")
  ]
}).then(() => {

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  require("./routes/recommendations")(app);
  app.use('/faq', faqRouter);
  
  app.listen(port, () => {
    console.log(`API running in ${process.env.environment}`);
    console.log(`Example app listening at http://localhost:${port}`)
  });
}).catch(error => console.log(error));


app.post('/upload', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  let sampleFile = req.files.xml;
  const analysisRes = InvoiceService.processUpload(sampleFile.data, req.body.Description)
  res.send(analysisRes)
});

