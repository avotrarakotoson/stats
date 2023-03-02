class PerimQuery {
  constructor(bigquery) {
    this.bigquery = bigquery;
  }

  async getLicences(params) {
    const { keyword, limit } = params;

    let query = `
      SELECT licenses.license AS license, count(*) AS total
      FROM \`bigquery-public-data.github_repos.sample_repos\` AS repo
      INNER JOIN \`bigquery-public-data.github_repos.licenses\` AS licenses ON repo.repo_name = licenses.repo_name
    `;

    if (keyword) {
      const search = `%${keyword.trim().toLowerCase()}%`;
      query += `
        WHERE LOWER(license) LIKE '${search}'
      `
    }

    query += `
      GROUP BY license
      ORDER BY total DESC
      LIMIT @limit
    `;

    const options = {
      query: query,
      location: 'US',
      params: { limit }
    };

    const [rows] = await this.bigquery.query(options);

    return rows;
  }

  async getLanguages(params) {
    const { keyword, limit } = params;
    let query = `
      SELECT arr.name AS LANGUAGE,
      sum(arr.bytes) AS total_bytes
      FROM \`bigquery-public-data.github_repos.languages\`,
      UNNEST(LANGUAGE) arr
    `;

    if (keyword) {
      const search = `%${keyword.trim().toLowerCase()}%`;
      query += `
        WHERE LOWER(arr.name) LIKE '${search}'
      `
    }

    query += `
      GROUP BY LANGUAGE
      ORDER BY total_bytes DESC
      LIMIT @limit
    `;

    const options = {
      query: query,
      location: 'US',
      params: { limit }
    };

    const [rows] = await this.bigquery.query(options);

    return rows;
  }
}

module.exports = PerimQuery;