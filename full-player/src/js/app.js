u = new Utils();
$(document).ready(function(){

   var socket = io.connect("/", { secure: true, transports: [ "flashsocket","polling","websocket" ] } );

   var scroller;

   u.addWindowResizeFunction( u.verticalCenter )

   // socket.emit('test');
   scroller = new ScrollInstrument();
   scroller.scrollCallback = function() {

      var scrollTop = $(window).scrollTop();
      var normalizedScroll = scrollTop / ($('body,html').height()-$(window).height());
      var pct = Math.round(normalizedScroll*100);
      $('.porcentaje').html(pct)
      socket.emit('scroll', { scrollTop: normalizedScroll });

   }

   var rndI = Math.floor( Math.random() * $('.synth_type').length );

   $('.synth_type').eq( rndI ).addClass('selected')
   socket.emit('synthSelected', { index: rndI })

$('.synth_type').click(function(){
      $(this).siblings().removeClass('selected')
      $(this).addClass('selected')

      socket.emit('synthSelected', { index: $(this).index() })

   })



   var numGifs = 42;
   for (var i = 0; i < numGifs; i++) {
console.log("creategif", i);
      var img = $('<img>').attr('src', 'gifs/'+i+'.gif').addClass('w-100');

      $('.space').first().clone().removeClass('hidden').html( img  ).appendTo('#contents');
   }

   console.log("MMHL FullPlayer: Ready");

});


// socket.on('welcome', function (data) {
//  console.log("hello",data);
// });
