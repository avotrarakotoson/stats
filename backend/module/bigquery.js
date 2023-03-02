const { BigQuery } = require('@google-cloud/bigquery');
const PROJECT_ID = 'grand-landing-379411';
const KEY_PATH = '../backend/access.json'

class PerimBigQuery {
  static init() {
    return new BigQuery({
      projectId: PROJECT_ID,
      keyFilename: KEY_PATH,
    });
  }
};

module.exports = PerimBigQuery;