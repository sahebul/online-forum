var http = require('http');
var fs=require('fs');
var server = http.createServer(function(req,res) {
console.log('Request made :'+req.url);
  // res.writeHead(200,{'Content-Type':'application/json'});

  if(req.url === "/index"){
    res.writeHead(200,{'Content-Type':'text/html'});
    var myRreadStream=fs.createReadStream(__dirname+'/index.html','utf8');
    // res.pipe(myRreadStream);
    myRreadStream.pipe(res);
  }
  else if (req.url === "/Contact") {
    res.writeHead(200,{'Content-Type':'text/html'});
    var myRreadStream=fs.createReadStream(__dirname+'/contact.html','utf8');
    myRreadStream.pipe(res);
  }
  else {
    res.writeHead(404,{'Content-Type':'text/plain'});
    // res.writeHead(404,{'Content-Type':'text/plain'});
    res.end("404! page not found");
  }

});
server.listen(3000);
console.log("listenig to 3000");























// var http = require('http');
// var fs=require('fs');
// var server = http.createServer(function(req,res) {
// console.log('Request made :'+req.url);
//   res.writeHead(200,{'Content-Type':'text/html'});
//   var myRreadStream=fs.createReadStream(__dirname+'/index.html','utf8');
//   myRreadStream.pipe(res);
// });
// server.listen(3000);
// console.log("listenig to 3000");
