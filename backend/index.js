const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')

const PerimBigQuery = require('./module/bigquery');
const PerimQuery = require('./queries/perim-query');

const port = 3000;

app.use(cors());
app.use(bodyParser.json())

const perimBigQuery = PerimBigQuery.init();
const perimQuery = new PerimQuery(perimBigQuery);

app.get('/', (req, res) => {
  res.send('Hello Pertim');
})

app.get('/licences', async (req, res) => {
  const limit = req.query.limit ?? 5;
  const keyword = req.query.keyword ?? '';

  const licences = await perimQuery.getLicences({ keyword, limit: parseInt(limit) });
  res.json(licences);
});

app.get('/languages', async (req, res) => {
  const limit = req.query.limit ?? 5;
  const keyword = req.query.keyword ?? '';

  const languages = await perimQuery.getLanguages({ keyword, limit: parseInt(limit) });
  res.json(languages);
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});