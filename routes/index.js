
/*
 * GET home page.
 */

exports.index = function(req, res){
  var redis = require("redis");
  client = redis.createClient();
  client.on("error", function (err) {
    console.log("Error " + err);
  });

  var matches;
  client.set("playfulscore", "match");

  client.get("playfulscore", function(e, v){
    matches = v; 
    res.render('index', { title: 'PlayfulScore',
      matches: matches });
  });
};
