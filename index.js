var app = require('express')();
var fileUpload = require('express-fileupload');
var mongoose = require('mongoose');

var server = require('http').Server(app);

app.use(fileUpload());

var port = process.env.PORT || 8080;
server.listen(port, function(){
  console.log('Now listening on port ', port);
});

var mongoURI = process.env.MONGOURI || require("./secrets").MONGOURI;
mongoose.connect(mongoURI);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var template = require('./template.js');
app.get('/template', template.get);

var upload = require('./upload.js');
app.post('/', upload.post);
