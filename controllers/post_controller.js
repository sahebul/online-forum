
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){
  app.post('/add_post', urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    var posts={
      "title":req.body.title,
      "description":req.body.description,
      'posted_by':req.body.user_id
    }
    const db=require('../database');
    db.query('INSERT INTO tbl_posts SET ?',posts,function(error,results,fields){
      if(error){
        res.send({
          "code":404,
          "failed":"error occured"+error
        });
      }else {
        return res.redirect('/login');
      }
    });
  })

}
