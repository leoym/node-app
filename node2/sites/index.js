require('newrelic');
const fetch = require('node-fetch');
const http = require('http');

const hostname = '0.0.0.0';
const port = 3001;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  fetch('http://127.0.0.1/')
    .then(res => res.text())
    .then(body => {
      console.log(body);
      res.end(body);
  }).catch((error) => {
      console.log('Erro');
      res.end('Erro');
  //  res.status(error.response.status).send(error.response.data);
  });

 // res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
