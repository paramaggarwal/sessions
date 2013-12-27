var connect = require('connect'),
  cookie = require('cookie'),
  uid = require('uid2');

var key = 'mysession';
var store = {};

connect()
  // parse cookies
  .use(function(req, res, next) {
    req.cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : '';
    next();
  })
  // create and handle sessions
  .use(function(req, res, next) {
    var id = req.cookies[key];

    if(!id) {
      // generate unique key
      id = uid(24);

      // set cookie
      res.setHeader('Set-Cookie', cookie.serialize(key, id));
    }

    // if no store for the id, then create one
    if (id && !store[id]) store[id] = {}; 

    // init store
    req.session = store[id];

    next();
  })
  // manipulate sessions
  .use(function(req, res, next){

    if (req.session.views) {

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end('views: ' + req.session.views);
      
      req.session.views++;

    } else {

      req.session.views = 1;  
      res.end('welcome to the session demo. refresh!');
    
    }
  })
  .listen(3000);