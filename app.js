var connect = require('connect');
var app = module.exports = connect();

app.use(connect.cookieParser());
app.use(connect.session({ secret: 'your secret here' }));

app.use(connect.errorHandler({ dumpExceptions: true, showStack: true })); 

app.use(function(req, res){
  res.end('hello there mr');
});

app.listen(3000);
console.log("Express server listening on port 3000");
