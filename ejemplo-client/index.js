const express = require('express');
const { Router } = require('express');
const http = require('http');

const app = express();
const routes = Router();

routes.post('/handler', (req, res) => {
  console.log(req.body);
  res.send(`This is what I got ${JSON.stringify(req.body)}`);
});

app.use(express.json());
app.use(routes);

// Subscribe
const data = JSON.stringify({
  url: 'http://localhost:4000/handler',
  eventName: 'hello'
});

const options = {
  host: 'localhost',
  port: 3000,
  path: '/subscribe',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error => {
  console.error(error);
}))

req.write(data);
req.end();

let server = app.listen(4000, () => {
  console.log(`Client listening on port ${server.address().port}`);
});
