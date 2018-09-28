var express = require('express');
var router = express.Router();

var elasticsearch = require('elasticsearch');
var client = elasticsearch.Client({
  host: 'localhost:9200'
});

/* GET reports track listing. */
router.get('/', function(req, res, next) {
  client.search({
    index: 'reports',
    type: 'track',
    body: {
      query: {
      match_all: {}
      }
    }
  }).then(function(response) {
    var hits = response.hits.hits;
    res.send(response.hits.hits);
  }, function(error) {
  console.trace(error.message);
  });
});

/* GET reports track listing. */
router.get('/add', function(req, res, next) {
  var rn = require('random-number');
  var options = {
    min: 0
    , max: 1000000
    , integer: true
  }

  var rand = rn(options);
  var data = new Date();
  var corp = 'ABC';
  var device = req.query.device;
  var temp = req.query.temp;
  var umid = req.query.umid;
  var sensor = req.query.sensor;
  console.log(device);
  var act  = 'teste 1234';
  var desc = '34324324324';
 
  client.create({
    index: 'reports',
    type: 'track',
    id: String(data.getTime()),
    body: {
      hash: rand,
      corp: corp,
      act: act,
      desc: desc, 
      device: device,
      temp: temp,
      umid: umid,
      sensor: sensor,
      acao: 'log',
      published: true,
      published_at: data ,
      counter: 1
    }
  });

  res.send(String(data.getTime()) + "-"+ rand);
});

module.exports = router;
