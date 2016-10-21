u = new Utils();

var socket = io.connect('http://localhost:3000');

var scroller;
$(document).ready(function(){

   u.addWindowResizeFunction( u.verticalCenter )

   // socket.emit('test');
   scroller = new ScrollInstrument();
   scroller.scrollCallback = function() {
      console.log("test");

      socket.emit('scroll', { scrollTop: $(window).scrollTop() });
   }
   console.log("MMHL FullPlayer: Ready");

})


// socket.on('welcome', function (data) {
//  console.log("hello",data);
// });
