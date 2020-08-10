import express from 'express';
import fs from 'fs';
import path from 'path';

const app = new express();
const folder = path.join(__dirname, 'v1');

app.use((req, res, next) => {
  console.log(`API: ${req.url}`);

  let url = req.path;
  if (url.endsWith('/')) {
    url = url.substring(0, url.length - 1);
  }

  const filepath = path.join(folder, `${url}.json`);

  if (fs.existsSync(filepath)) {
    res.json(JSON.parse(fs.readFileSync(filepath, 'utf8')));
  } else {
    next();
  }
});

module.exports = {
	path: '/api/v1',
	handler: app,
};
