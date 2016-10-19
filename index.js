var express = require('express');
var app = express();
var http = require('http').Server(app);

var fb = require('fb');

app.use(express.static('full-player/public'));

app.get('/test', function(req, res){

   var FB = require('fb');

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


      FB.api('1316099708408345', function (res) {
         if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
         }
         console.log(res.id);
         console.log(res.name);
         
      });

   });

   // var authUrl = fb.getOauthUrl({
   //    "client_id":     1614514965519026
   //  , "redirect_uri":  'http://localhost:3000'
   // });
   //
   // // shows dialog
   // //res.redirect(authUrl);
   //
   // // after user click, auth `code` will be set
   // // we'll send that and get the access token
   // fb.authorize({
   //    "client_id":      1614514965519026
   //  , "redirect_uri":   'http://localhost:3000'
   //  , "client_secret":  'ead8e9a0aab4582ac35c2a4ec7a47e38'
   // //  , "code":           req.query.code
   // }, function (err, facebookRes) {
   //    fb.get("1316099708408345", function(err, res) {
   //      console.log(res);  // { id: '4', name: 'Mark Zuckerberg'... }
   //    });
   // })



});



app.get('/', function(req, res){
   res.sendFile(__dirname + '/full-player/public');
});


http.listen(3000, function(){
   console.log('listening on *:3000');
});
