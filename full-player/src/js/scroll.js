
function ScrollInstrument() {


   var scrolling = false;
   var scroller = this;
   var scrollCallback;


   this.initialize = function() {
      scroller.setupScroll();
   }

   this.setupScroll = function() {

      $(window).scroll(function(){
         if( ! scroller.scrolling ) {
            scroller.scrolling = setTimeout(function(){

               scroller.scrollCallback();

               scroller.scrolling = false;

            },200);
         }
      })

   }


   scroller.initialize();

}
