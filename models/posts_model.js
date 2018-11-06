const db=require('../database');
module.exports = {
  get_all_posts:function(name,callback){
    var sql="SELECT tp.post_id,tp.title,tp.description,tp.visitors,tp.created_date,tu.name as posted_by"+
      " FROM tbl_posts as tp "+
      "LEFT JOIN tbl_users as tu ON tp.posted_by=tu.user_id";
      db.query(sql,function(err,results,fields){

        if (err)
          callback(err,null);
      else
          callback(null,results);
      });
  }
}
