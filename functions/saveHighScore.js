const { table, getHighScores } = require('./utils/airtable');
const {
  getAccessTokenFromHeaders,
  validateAccessToken,
} = require('./utils/auth');

exports.handler = async (event) => {
  const token = getAccessTokenFromHeaders(event.headers);
  const user = await validateAccessToken(token);
  if (!user) {
    return {
      statusCode: 403,
      body: JSON.stringify({ err: 'Unauthorization action' }),
    };
  }

  if (event.httpMethod != 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ err: 'That method is not allowed' }),
    };
  }

  const { score } = JSON.parse(event.body);
  const name = user['https://learnbuildtype/username'];
  if (typeof score === 'undefined' || !name) {
    return {
      statusCode: 400,
      body: JSON.stringify({ err: 'bad request' }),
    };
  }

  try {
    const records = await getHighScores(false);

    const lowestRecord = records[9];
    if (
      typeof lowestRecord.fields.score === 'undefined' ||
      score > lowestRecord.fields.score
    ) {
      // update record
      const updatedRecord = { id: lowestRecord.id, fields: { name, score } };
      await table.update([updatedRecord]);
      return {
        statusCode: 200,
        body: JSON.stringify(updatedRecord),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({}),
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        err: 'Failed to save high score in Airtable: ' + err,
      }),
    };
  }
};
