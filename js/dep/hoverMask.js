// first argument is a containing SVG element,
  //additional arguments are gradient stops
function hoverMask() {
  if (arguments.length < 2)
    return;

  var cont = arguments[0],
  stops = [];
  for (var i = 1; i < arguments.length; i++)
    stops.push(arguments[i]);
  cont.addEventListener("mousemove", function(e) {
    var offset = 100 * e.offsetX / cont.getBoundingClientRect().width;

    for (var i = 0; i < stops.length; i++) {
      stops[i].setAttribute("offset", (offset+(i*5) + "%"));
    }
  });
}
