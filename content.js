
var elements = [];
var pause = 5000;
var scrollUp    = { dx:  0, dy: -1 };
var scrollDown  = { dx:  0, dy:  1 };
var scrollLeft  = { dx: -1, dy:  0 };
var scrollRight = { dx:  1, dy:  0 };
var scrollCycle = [scrollUp, scrollRight, scrollDown, scrollLeft];
var scrollPhase = 0;

function scroll() {

}

setInterval(function() {

    // scroll to the next selected element
    if (elements.length > 0) {
        var element = elements.shift();
        element.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });

/*         var r = document.body.getBoundingClientRect();
        var ex = document.documentElement.scrollLeft;
        var ey = document.documentElement.scrollTop;
        var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;
        console.log("wx,wy,ex,ey="+x + ' × ' + y+","+r.width+","+r.height+","+ex+","+ey);
 */
    } else {
        chrome.storage.sync.get("cssdog_active", function(data) {
            if (data.cssdog_active) {
                chrome.storage.sync.get("cssdog_selector", function(data) {
                    if (!chrome.runtime.error && data.cssdog_selector != "") {
                      var nodeList = document.querySelectorAll(data.cssdog_selector);
                      if (nodeList.length > 0) {
                          elements = Array.prototype.slice.call(nodeList);
                      }
                    }
                });        
            }
        });
    }

    // update the pause duration
    chrome.storage.sync.get("cssdog_pause", function(data) {
        if (!chrome.runtime.error && data.cssdog_pause != "") {
            pause = parseInt(data.cssdog_pause);
            if (pause == NaN) {
                pause = 5000;
            }
        }
    });

}, pause);
