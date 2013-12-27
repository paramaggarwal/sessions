var express = require('express');
var app = module.exports = express.createServer();

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({ secret: 'your secret here' }));
app.use(app.router);

app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 

app.get('/', function(req, res){
  res.send('hello there mr');
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
