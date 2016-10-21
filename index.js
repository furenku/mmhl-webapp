var express = require('express');
var app = express();
var http = require('http').Server(app);
var promise = require('promise');

var io = require('socket.io')(http);

var FB = require('fb');

app.use(express.static('full-player/public'));

app.get('/test', function(req, res){

   var imgs = '';



   function pictures() {
      console.log("agyaaa");
      return new Promise(function(resolve,reject) {
         FB.api(users[i].id+"/picture?type=square", {redirect: false}, function (res) {
            if(!res || res.error) {
               console.log(!res ? 'error occurred' : res.error);
               return;
            }
            console.log("///////////////////////////////////////////");


            console.log("picture");
            console.log(res.data.url);
            imgs += '<img src="'+res.data.url+'">';

         });
      });
   }
   pictures().then(function(data) {
      console.log("promise after", data);
   });

   FB.api('oauth/access_token', {
      client_id: '1614514965519026',
      client_secret: 'ead8e9a0aab4582ac35c2a4ec7a47e38',
      grant_type: 'client_credentials'
   }, function (res) {
      if(!res || res.error) {
         console.log(!res ? 'error occurred' : res.error);
         return;
      }

      var accessToken = res.access_token;

      FB.setAccessToken(accessToken);

   })

});



app.get('/', function(req, res){
   res.sendFile(__dirname + '/full-player/public');
});


http.listen(3000, function(){
   console.log('listening on *:3000');
});






/* SOCKET.IO API: */

io.on('connection', function (socket) {

  socket.emit('welcome', { hello: 'world' });


  socket.on('scroll', function (data) {
    console.log("client " + 1, "scrolltop: ", data);
  });

});
