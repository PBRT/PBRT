var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('bG0fTx05VGrqjiZ53YcCFw');

app.use(express.static(__dirname + '../dist/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('*', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.post('/mail', function(req, res) {

  if (req.body.email && req.body.name && req.body.details) {
    var params = {
      'message': {
        'from_email':req.body.email,
        'to':[{'email':'beardpierre@gmail.com'}],
        'subject': req.body.name + ' from PBRT',
        'text': req.body.details,
      }
    };

    mandrill_client.messages.send(params, function(resMandrill) {
      res.send({res: resMandrill});
    },
    function(err) {
      res.send({err: err});
    });
  } else {
    res.send({err: 'Missing fields'});
  }
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
