/**
 * Created by Thomas on 21-04-2016.
 */

// the base "class" to hold our information
// img = path to image
// snd = path to sound
// ms  = milliseconds before switching to next
var AudioImage = function(img, snd, ms)
{
  this.image = img;
  this.sound = snd;
  this.showTime = ms;
  // next AudioImage to go to; null means this is the last AudioImage
  this.next = null;

  // show this AudioImage and schedule the next one to be shown after 'showTime' milliseconds
  this.show = function()
  {
    // show the image
    document.getElementById('image').src = this.image;
    // play the sound
    new Audio(this.sound).play();

    if(this.next == null) return; // end of the chain; stop execution

    // below we jump through hoops to get past javascript's weird context rules
    temp = this;

    var nxt = function()
    {
      temp.next.show();
    };
    setTimeout(nxt, this.showTime);
  };
};




// helper function to build chains of AudioImages
var chainAudioImages = function(/*invisible argument list*/) {
  if(arguments.length == 0)
  {
    return null; // no arguments given; stop execution
  }
  var first = arguments[0];
  var current = first;
  for(var i = 1; i < arguments.length; i++) // notice i=1, so we skip first element
  {
    current.next = arguments[i];
    current = current.next;
  }
  return first;
};

// building our chain
var chain = chainAudioImages(new AudioImage('../../img/BlueTriangle.png', '../../aud/Trekant.mp3', 1000),
  new AudioImage('../../img/RedCircle.png', '../../aud/Cirkel.mp3', 2000),
  new AudioImage('../../img/GreenSquare.png', '../../aud/Firkant.mp3', 3000)); // ms=3000 for the last one doesn't matter, as it's "next" will be null

// function to call when document is loaded
var init = function() {
  chain.show();
};
