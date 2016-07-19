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
app.use(express.static(path.resolve(__dirname, '../public')));

// Parse json for mails
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Favicon
app.use(favicon(path.join(__dirname, 'logo.ico')));

// View render
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// Resume endpoint
app.get('/resume', function(req, res){
  var file = path.join(__dirname, 'Resume.pdf');
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
        'from_email': 'pbrt@pbrt.co',
        'to':[{'email':'beardpierre@gmail.com'}],
        'subject': 'subj: ' + req.body.name + ' email: '  + req.body.email + ' from PBRT',
        'text': req.body.details,
        'merge': true,
        'merge_language': 'mailchimp',
        'global_merge_vars': [].concat(
          req.body.mergeVars,
          {name: 'sender', content: req.body.email},
          {name: 'text', content: req.body.details}),
      },
      'template_name': 'pbrt',
      'template_content': [],
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
var server = app.listen((process.env.PORT || 9000), function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
