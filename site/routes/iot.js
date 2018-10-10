var express = require('express');
var router = express.Router();
const axios = require('axios');
const iotService = require('../services/iot2');

/* GET home page. */
router.get('/', function(req, res, next) {
  // Make a request for a user with a given ID
  axios.get('/')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

  res.send({ title: 'OK'});
});

/* GET List page. */
router.get('/list', function(req, res, next) {
  console.log(myData());
  var query = myData();  
  iotService.teste();
  res.send(query);
});

function myData() { 
   return 123; 
} 

module.exports = router;
