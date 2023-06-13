console.log("Hello World");

const express = require('express')
const path = require('path')
const puppeteer = require('puppeteer');
const validUrl = require('valid-url');
const bodyParser = require("body-parser");
const pug = require('pug');
const fs = require('fs');

const app = express()
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static('static'))

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  const con = "This is the best content on the internet so far so use it wisely"
  const params = { 'title': 'PubG is the best game', "content": con }
  res.status(200).render('index.pug', params);
  // res.sendFile(path.join(__dirname, "/index.html"))
});

app.get('/policy', (req, res) => {
  const con = "This is the best content on the internet so far so use it wisely"
  const params = { 'title': 'PubG is the best game', "content": con }
  res.status(200).render('policy.pug', params);
});

app.get('/terms', (req, res) => {
  const con = "This is the best content on the internet so far so use it wisely"
  const params = { 'title': 'PubG is the best game', "content": con }
  res.status(200).render('terms.pug', params);
});

app.get('/disclaimer', (req, res) => {
  const con = "This is the best content on the internet so far so use it wisely"
  const params = { 'title': 'PubG is the best game', "content": con }
  res.status(200).render('disclaimer.pug', params);
});



app.post('/download', (req, res) => {
  let urlText = req.body.inputUrl;
  console.log(urlText);
  let d = new Date().getTime();
  let downloadPath = `download${d}.pdf`;

  if (urlText != " ") {

    if (validUrl.isUri(urlText)) {
      (async () => {

        const browser = await puppeteer.launch({ executablePath: 'C:\Program Files\Google\Chrome\Application',
           headless: false, args: ["--no-sandbox"] });

        // const browser = await puppeteer.launch({ headless: false, args: ["--no-sandbox"] });

        const page = await browser.newPage();

        const website_url = urlText;

        await page.goto(website_url, { timeout: 0 });
        await page.emulateMediaType('screen');

        let pdfC = await page.pdf({
          path: `${downloadPath}`,
          margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
          printBackground: true,
          format: 'A4',
        });

        res.download(downloadPath, (error) => {
          if (!error) {
            console.log(`File downloaded ${downloadPath}`);
            console.log(path.join(__dirname, `/${downloadPath}`));
          } else {
            console.log("File not downloaded");
          }
        })

        await browser.close();
      })();
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

app.listen(process.env.PORT || port, ()=>console.log(`Listening on port http://localhost:${port}`))

// app.listen(port, () => {
//   console.log(`Listening on port http://localhost:${port}`);
// })