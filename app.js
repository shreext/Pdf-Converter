console.log("Convert2PDF By Anant Shree");

// Module Imported
const express = require('express')
const path = require('path')
const validUrl = require('valid-url');
const bodyParser = require("body-parser");
const pug = require('pug');
const fs = require('fs');
var Api2Pdf = require('api2pdf');
var a2pClient = new Api2Pdf('42ad5101-43a6-448f-8c3e-a29b1733984b');
const download = require('download')
const app = express()
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static('static'))

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Setting View
app.get('/', (req, res) => {
  const con = "Convert2PDF"
  const params = { 'title': 'Convert2PDF Home', "content": con }
  res.status(200).render('index.pug', params);
});

// Privacy Policy Page
app.get('/policy', (req, res) => {
  const con = "Convert2PDF"
  const params = { 'title': 'Convert2PDF Privacy Policy', "content": con }
  res.status(200).render('policy.pug', params);
});

// Terms and Condition Page
app.get('/terms', (req, res) => {
  const con = "Convert2PDF"
  const params = { 'title': 'Convert2PDF Terms & Conditions', "content": con }
  res.status(200).render('terms.pug', params);
});

// Disclaimer Page
app.get('/disclaimer', (req, res) => {
  const con = "Convert2PDF"
  const params = { 'title': 'Convert2PDF Disclaimer', "content": con }
  res.status(200).render('disclaimer.pug', params);
});

// Download Method
app.post('/download', (req, res) => {
  let urlText = req.body.inputUrl;
  console.log(urlText);
  let d = new Date().getTime();
  let downloadPath = `download${d}.pdf`;

  // Checking Url
  if (urlText != " ") {
    if (validUrl.isUri(urlText)) {
      // Getting Pdf
      var options = { orientation: 'potrait', pageSize: 'A4' };
      a2pClient.wkUrlToPdf(urlText,
        {
          inline: false, filename: `${downloadPath}`
        })
        .then(function (result) {

          console.log(result);
          var responseId = result.ResponseId
          var filename = result.FileUrl

          console.log(filename);
          // Downloading Pdf
          res.redirect(filename);
        
        }, function (rejected) {
          console.log(rejected); //an error occurred
        });
    }
    else {
      console.log("Not a Valid Url");
    }
  }
  else {
    res.off;
    console.log("Field is empty");
  }
})

// Listening Port
app.listen(process.env.PORT || port, () => console.log(`Listening on port http://localhost:${port}`))