
/*
 * GET home page.
 */

exports.index = function(req, res){
  req.db.matches.find().toArray(function(error, matches){
    if (error) return next(error);
    res.render('index', { title: 'PlayfulScore',
      matches: matches });
  });
};
