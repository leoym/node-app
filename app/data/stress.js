const http = require('https');
const https = require('https');

var agent = new https.Agent({
    keepAlive: true
});

function doRequest(cb) {
    var start = new Date().getTime();
    var callback = {
        onSuccess: function(res) {
            console.log('Completed after '+(new Date().getTime() - start));
            cb();
        },
        onFailure: function(ex) {
            cb(ex);
        }
    };
    var options = {
        host: 'objecthub.io',
        port: 443,
        path: '/admin/metrics/main.json',
        method: 'GET',
        agent: agent
    };
    var req = https.request(options, function(res) {
        var str = "";
        res.on('data', function (chunk) {
            str += chunk;
        });
        res.on('end', function () {
            callback.onSuccess(str);
        });
    });
    req.write('');
    req.end();
    req.on('error', function(e) {
        callback.onFailure(e);
    });  
}


doRequest();


var ops = [];
for (var i=0;i<10;i++) {
    ops.push(doRequest);
}
//Flow.sequential(ops).apply(cb);
