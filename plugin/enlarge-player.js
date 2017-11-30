videojs.registerPlugin('enlargePlayer', function() {
    //Get a reference to it
    var myPlayer = this,
     // Set the large and small sizes
     // You could also all options to be passed in to set these sizes
     largeWidth = 640,
     largeHeight = 360,
     smallWidth = 272,
     smallHeight = 153,
     // Get a reference to the player wrapper
     // If that element doesn't exist in the HTML, this plugin will fail
     playerWrapper = document.getElementById('playerWrapper');

     /**
      * Make the player large
      */
     function makePlayerLarge() {
         playerWrapper.setAttribute('style', 'width:' + largeWidth + 'px;height:' + largeHeight + 'px;transition: width .4s ease-in-out, height .4s ease-in-out;');
     }

     /**
      * Make the player small
      */
     function makePlayerSmall() {
         playerWrapper.setAttribute('style', 'width:' + smallWidth + 'px;height:' + smallHeight + 'px;transition: width .4s ease-in-out, height .4s ease-in-out;');
     }

     /**
      * Add the mouseout event listener
      */
     function mouseoutOn() {
         // add the event listener to make the player small on mouseout
         playerWrapper.addEventListener('mouseout', makePlayerSmall);
         // make the player small now
         makePlayerSmall();
     }

     /**
      * Remove the mouseout event listener
      */
     function mouseoutOff() {
         // Remove the mouseout event listener
         playerWrapper.removeEventListener('mouseout', makePlayerSmall);
     }

     // Make sure the player wrapper exists - otherwise, do nothing
     if (playerWrapper !== null) {
         // Initially, make sure the player is small
         makePlayerSmall();
         // On mouseover make the player large
         playerWrapper.addEventListener('mouseover', makePlayerLarge);
         // On mouseout, make the player small
         mouseoutOn();
         // On play, keep the player large
         myPlayer.on('play', mouseoutOff);
         // On pause or video end, make the player small
         myPlayer.on('pause', mouseoutOn);
         myPlayer.on('ended', mouseoutOn);
     }

});
