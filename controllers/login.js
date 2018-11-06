
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });


module.exports = function(app){
  app.post('/register', urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    var user={
      "name":req.body.name,
      "email":req.body.email,
      'password':req.body.psw
    }
    const db=require('../database');
    db.query('INSERT INTO tbl_users SET ?',user,function(error,results,fields){
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

  //check login user
var sess;
  app.post('/checkLoginUser',urlencodedParser,function(req,res){
    if (!req.body) return res.redirect('/login');
    var sql='SELECT * FROM tbl_users WHERE email = "'+req.body.email+'" AND password = "'+req.body.psw+'"';
    const db = require('../database');
    db.query(sql,function(error,results){
      if(error){
        console.log("error ="+error);
      }else {
        console.log(results);
        if(results.length > 0){
          if(results[0].password == req.body.psw){
            sess=req.session;
            sess.email=results[0].email;
            sess.user_id=results[0].user_id;
            sess.user=results[0];
          res.redirect('/');
          }else {
            res.redirect('/login');
          }

        }else {
          res.redirect('/login');
        }

      }
    });

  });
}
