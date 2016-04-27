/**
 * Created by Thomas on 21-04-2016.
 */

var id = '';
var request = new XMLHttpRequest();
request.open("GET", "../../tasks/sprog/OnePlus/Tasks.json", false);
request.send(null)
var allTasks = JSON.parse(request.responseText);
//alltasks.


// the base "class" to hold our information
// img = path to image
// snd = path to sound
// ms  = milliseconds before switching to next
var AudioImage = function (img, snd, ms)
{
  this.image = img;
  this.sound = snd;
  this.showTime = ms;
  // next AudioImage to go to; null means this is the last AudioImage
  this.next = null;

  // show this AudioImage and schedule the next one to be shown after 'showTime' milliseconds
  this.show = function ()
  {
    // show the image
    document.getElementById('image').src = this.image;
    // play the sound
    new Audio(this.sound).play();

    if (this.next == null) return; // end of the chain; stop execution

    // below we jump through hoops to get past javascript's weird context rules
    temp = this;

    var nxt = function ()
    {
      temp.next.show();
    };
    setTimeout(nxt, this.showTime);
  };
};

// helper function to build chains of AudioImages
var chainAudioImages = function (/*invisible argument list*/)
{
  if (arguments.length == 0)
  {
    return null; // no arguments given; stop execution
  }
  var first = arguments[0];
  var current = first;
  for (var i = 1; i < arguments.length; i++) // notice i=1, so we skip first element
  {
    current.next = arguments[i];
    current = current.next;
  }
  return first;
};


var setId = function (fetchedURL)
{
  url = fetchedURL;
  id = url.substring(url.lastIndexOf("id=") + 1);
}

var showChallenge = function ()
{
  //TODO
}


var chain = chainAudioImages(new AudioImage(allTasks.tasks[id - 1].image1, allTasks.tasks[id-1].aud1, allTasks.tasks[id-1].ms1),
  new AudioImage(allTasks[id].image2, allTasks[id].aud2, allTasks[id].ms2),
  new AudioImage(allTasks[id].image3, allTasks[id].aud3, allTasks[id].ms3));


// building our chain
// ms=3000 for the last one doesn't matter, as it's "next" will be null

// function to call when document is loaded
var init = function ()
{
  chain.show();
};
