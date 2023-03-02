const express = require('express');
const app = express();
const PerimBigQuery = require('./module/bigquery');
const PerimQuery = require('./queries/perim-query');

const port = 3000;

const perimBigQuery = PerimBigQuery.init();
const perimQuery = new PerimQuery(perimBigQuery);

app.get('/', (req, res) => {
  res.send('Hello Pertim');
})

app.get('/licences', async (req, res) => {
  const licences = await perimQuery.getLicences({ keyword: 'gpl' });
  res.json(licences);
});

app.get('/languages', async (req, res) => {
  const languages = await perimQuery.getLanguages({ keyword: 'php' });
  res.json(languages);
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});