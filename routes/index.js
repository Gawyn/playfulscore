
/*
 * GET home page.
 */

exports.index = function(req, res){
  var matches;
  req.redisClient.set("playfulscore", "match");

  req.redisClient.get("playfulscore", function(e, v){
    matches = v; 
    console.log(matches);
    req.db.matches.find().toArray(function(error, matches){
      if (error) return next(error);
      res.render('index', { title: 'PlayfulScore',
        matches: matches });
      });
    })
};
