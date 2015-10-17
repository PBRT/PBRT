var ejs = require('ejs');
var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var compression = require('compression');
var mandrill = require('mandrill-api/mandrill');

var app = express();
var mandrill_client = new mandrill.Mandrill(process.env.MANDRILL_KEY);

// Enable gzip
app.use(compression());

// Serve dist
app.use(express.static(path.resolve(__dirname, './dist/public')));

// Parse json for mails
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Favicon
app.use(favicon(path.join(__dirname,'logo.ico')));

app.set('views', path.join(__dirname, './dist/views'));
// app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');


// Allows headers
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Resume endpoint
app.get('/resume', function(req, res){
  var file = path.join(__dirname,'./dist/public/' ,'test.pdf');
  res.download(file);
});

// Render files
app.get('*', function (req, res) {
  res.render('index', {reactContent: ''});
});


// Mail endpoint
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

// Launch app
var server = app.listen((process.env.PORT || 8080), function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
