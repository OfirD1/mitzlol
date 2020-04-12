const express = require('express');
const parseArgs = require('minimist');
const fs = require('fs');
const wordRepo = require('./Repository/wordRepository');

const dbConfig = parseArgs(process.argv.slice(2));
const dbTarget = parseArgs(fs.readFileSync('mitzlolDbTarget.config', 'utf8').split(' '), {});
wordRepo.createConnection({
  client: 'mysql',
  connection: {
    host: dbConfig.host,
    user: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database
  }
});
wordRepo.setDbTarget({
  targetTable: dbTarget.table,
  whereColumn: dbTarget.whereColumn,
  selectColumn: dbTarget.selectColumn
});

const app = express();
app.get('/api/words/:word', async (req, res) => {
  getDataAsync(req.params.word)
    .then((handledData) => {
      res.send(handledData);
    })
    .catch((error) => {
      console.log(error);
    });
});
app.listen(3000, '0.0.0.0', () => console.log('listening on port 3000...'));

function getDataAsync(toMatch) {
  const promises = [
    wordRepo.matchPrefix(toMatch),
    wordRepo.matchPrefixReversed(toMatch),
    wordRepo.matchPostfix(toMatch),
    wordRepo.matchPostfixReversed(toMatch),
    wordRepo.matchPostfixFinalForm(toMatch),
    wordRepo.matchPostfixReversedFinalForm(toMatch),
    wordRepo.matchInfix(toMatch),
    wordRepo.matchInfixReversed(toMatch),
    ...wordRepo.matchNonConsecutive(toMatch),
    ...wordRepo.matchConsonances(toMatch)
  ];
  const res = Promise.all(promises)
    .then((results) => {
      const packed = {
        words: results,
        total: results.reduce((agg, item) => agg + (item.words.length || 0), 0)
      };
      return packed;
    })
    .catch((error) => {
      console.log(error);
    });
  return res;
}
