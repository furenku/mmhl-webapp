var express = require('express');
var app = express();
var http = require('http').Server(app);
var promise = require('promise');
var osc = require("osc");


var clients = [];

// var io = require('socket.io')(http, {origins:'*'})
var io = require('socket.io')(http, {origins:'*:* *'})
io.set('transports', [ 'websocket', 'flashsocket', 'polling', 'xhr-polling'  ] );

// io.set('origins', '*:*');
var FB = require('fb');
// Add headers
app.use(function (req, res, next) {
   //
   //    res.statusCode = 200;
   // //...
   // res.setHeader("Access-Control-Allow-Origin", "*");
   // res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

   //  // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', '*');
   //
   //  // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   //
   //  // Request headers you wish to allow
   //  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, *');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
   //
   //  // Set to true if you need the website to include cookies in the requests sent
   //  // to the API (e.g. in case you use sessions)
   res.setHeader('Access-Control-Allow-Credentials', true);

   // Pass to next layer of middleware
   next();
});

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(express.static('full-player/public'));




http.listen(80, "0.0.0.0", function(){
   console.log('listening on *:80');
});




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






/* SOCKET.IO API: */

io.on('connection', function (socket) {

   clients.push( socket.id );
   console.log("clients:",clients.length);

   var msg = {
      address: "/create",
      args: socket.id
   };

   udpPort.send(msg);

   socket.on('scroll', function (data) {

      var msg = {
         address: "/scroll",
         args: [socket.id, data.scrollTop]
      };

      udpPort.send(msg);


   });

   socket.on('synthSelected', function (data) {
      console.log("/synthSelected",data.index);
      var msg = {
         address: "/synthSelected",
         args: [socket.id, data.index ]
      };

      udpPort.send(msg);


   });

   socket.on('disconnect', function() {

      var msg = {
         address: "/kill",
         args: socket.id
      };


      udpPort.send(msg);
      var index = clients.indexOf( socket.id );
      clients.splice( index, 1 );
      console.log("clients:",clients.length);

   });


});











/* OSC */


var udpPort = new osc.UDPPort({
   // This is the port we're listening on.
   localAddress: "127.0.0.1",
   localPort: 57121,

   // This is where sclang is listening for OSC messages.
   remoteAddress: "127.0.0.1",
   remotePort: 57120
});

// Open the socket.
udpPort.open();
