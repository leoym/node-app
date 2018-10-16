const https = require('https');

var agent = new https.Agent({
    keepAlive: true
});
//https://recs.chaordicsystems.com/v0/events/recommendations?source=app&complete=true&deviceId=dr9gboG4aCg&productId=B78-3351-026&name=product&campaign=netpro_fcbkads&apiKey=netshoes-br&secretKey=1yKEygGFUmQf4%2BRCe6FZ%2Bg%3D%3D&productFormat=compact

const options = {
  hostname: 'recs.chaordicsystems.com',
  port: 443,
  path: '/v0/events/recommendations?source=app&complete=true&deviceId=dr9gboG4aCg&productId=B78-3351-026&name=product&campaign=netpro_fcbkads&apiKey=netshoes-br&secretKey=1yKEygGFUmQf4%2BRCe6FZ%2Bg%3D%3D&productFormat=compact',
  method: 'GET',
  agent
};

const req = https.request(options, (res) => {
  var start = new Date().getTime();
  //console.log('statusCode:', res.statusCode);
  //console.log('headers:', res.headers);
  res.on('data', (d) => {
    process.stdout.write(d);
    console.log('Completed after '+(new Date().getTime() - start));
  });
});

req.on('error', (e) => {
  console.error(e);
});
req.end();
