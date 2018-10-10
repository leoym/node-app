const fetch = require('node-fetch');

function getDevices() {
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

  return "response";
};

function teste(req, res) {
     fetch(buildChaordicUrl(req))
        .then(handleErrors)
        .then(response => response.json())
        .then(data => 'OK')
        .catch(err => {
            console.error('Failed retrieving chaordic recommendations', err);
            req.next(err);
     });
};
