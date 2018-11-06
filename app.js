var express=require('express');
var session = require('express-session');
var login = require('./controllers/login');
var posts = require('./controllers/post_controller');
var app=express();
// var router = express.Router();

app.set('view engine','ejs');
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: "sosecret",
  saveUninitialized: false,
  resave: false
}));

app.use(function(req, res, next) {
  if(req.session.email){
    res.locals.user = req.session.email;
    res.locals.user_id = req.session.user_id;
  }else {
    res.locals.user="";
  }

  next();
});
var all_post="";
app.get('/',function(req,res){
  var post_model=require('./models/posts_model');

  //call Fn for db query with callback
post_model.get_all_posts("yourname", function(err,data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);
        } else {
            // code to execute on data retrieval
            all_post=data;
            console.log("result from db is : ",all_post[0]);
        }

});
console.log(all_post);
  res.render('index',{userSession:res.locals.user,all_post:all_post});
});
app.get('/login',function(req,res){
  if(res.locals.user){
    res.redirect('/');
  }else {
    res.render('login',{userSession:res.locals.user});
  }

});
app.get('/signup',function(req,res){
  if(res.locals.user){
    res.redirect('/');
  }else {
    res.render('signup',{userSession:res.locals.user});
  }

});

app.get('/add-post',function(req,res){
  if(res.locals.user){
    res.render('add_post',{userSession:res.locals.user,user_id:res.locals.user_id});
  }else {
    res.redirect('/login');
  }

});

//fire login controller
login(app);
//fire add post
posts(app);
app.get('/profile/:id',function(req,res){
var data={name:"saheb",age:'27',hoby:['eating','fightinggg','cucling']};
  res.render('profile',{data:data,id:req.params.id});
})

app.listen(3000);
