class PerimQuery {
  constructor(bigquery) {
    this.bigquery = bigquery;
  }

  async getLicences() {
    const query = `
      SELECT licenses.license AS license, count(*) AS total
      FROM \`bigquery-public-data.github_repos.sample_repos\` AS repo
      INNER JOIN \`bigquery-public-data.github_repos.licenses\` AS licenses ON repo.repo_name = licenses.repo_name
      GROUP BY license
      ORDER BY total DESC
      LIMIT 5
    `;

    const options = {
      query: query,
      location: 'US',
    };

    const [rows] = await this.bigquery.query(options);

    return rows;
  }

  async getLanguages() {
    const query = `
      SELECT arr.name AS LANGUAGE,
      sum(arr.bytes) AS total_bytes
      FROM \`bigquery-public-data.github_repos.languages\`,
      UNNEST(LANGUAGE) arr
      GROUP BY LANGUAGE
      ORDER BY total_bytes DESC
      LIMIT 10
    `;

    const options = {
      query: query,
      location: 'US',
    };

    const [rows] = await this.bigquery.query(options);

    return rows;
  }
}

module.exports = PerimQuery;