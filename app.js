var connect = require('connect');
var cookie = require('cookie');

connect()
  .use(function(req, res, next) {
    var pairs = req.headers.cookie.split(/[;,] */);
    req.cookies = {};
    req.signedCookies = {};
    
    pairs.forEach(function(pair) {
        var eq_idx = pair.indexOf('=')

        // skip things that don't look like key=value
        if (eq_idx < 0) {
            return;
        }

        var key = pair.substr(0, eq_idx).trim()
        var val = pair.substr(++eq_idx, pair.length).trim();

        // quoted values
        if ('"' == val[0]) {
            val = val.slice(1, -1);
        }

        // only assign once
        if (undefined == req.cookies[key]) {
            try {
                req.cookies[key] = decodeURIComponent(val);
            } catch (e) {
                req.cookies[key] = val;
            }
        }
    });

    next();
  })
  .use(connect.session({ secret: 'secret' }))
  .use(function(req, res, next){
    var sess = req.session;
    if (sess.views) {
      res.setHeader('Content-Type', 'text/html');
      res.write('<p>views: ' + sess.views + '</p>');
      res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>');
      res.end();
      sess.views++;
    } else {
      sess.views = 1;
      res.end('welcome to the session demo. refresh!');
    }
  })
  .listen(3000);