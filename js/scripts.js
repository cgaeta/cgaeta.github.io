// setup eventlisteners for AJAX request and send email
function AJAXReq(form){
  if(!form) return;

  // not supporting old IE versions
  var req = new XMLHttpRequest();

  var fb = document.querySelector(".feedback");
  req.addEventListener("progress", function(){
    fb.innerHTML= "Wait for it...";
  fb.classList.add("show");
  });

  req.addEventListener("load", function(d){
    fb.innerHTML = "Thanks! Chris will get back to you as soon as he can.";

    window.setTimeout(function(){
      fb.classList.remove("show");
    }, 2000);

  });

  req.addEventListener("error", function(){
    fb.innerHTML = "Sorry, I couldn't send your email to Chris... Try again later?";
  });

  req.open("post", form.action);
  req.send(new FormData(form));
}

function getSrc(img) {
  return img.nodeName.toLowerCase() === "img" ?
    img.src :
    img.getAttribute("xlink:href");
}

function setSrc(img, src) {
  img.nodeName.toLowerCase() === "img" ?
    img.src = src :
    img.setAttribute("xlink:href", src);
}

function setImgLoaders(img) {
  var src = getSrc(img);

  var small = new Image();
  small.onload = function() {
    var large = new Image();
    large.onload = function() {
      setSrc(img, large.src);
      img.className = img.className + " loaded";
    }
    large.src = src.replace(/_pre\./, '.')
  }
  small.src = src;
}

function loadImgs() {
  var imgs = document.querySelectorAll('img, image');

  for (var i = 0; i < imgs.length; i++) {

    if (!/_pre\./.test(getSrc(imgs[i]))) {
      continue;
    }

    setImgLoaders(imgs[i]);
  }
}

var nav, navBack;

function stickyNav(scrollY, parallax){
  if(scrollY > 20) {
    nav.className = "fs-12 scrolled";
    //console.log(parallax);
    if(parallax) {
      var translate = "translateY("+scrollY+"px)";
      nav.style.transform = translate;
      navBack.style.transform = translate;
    }
  }
  else {
    nav.className = "fs-12";
    if(parallax) {
      nav.style.transform = "none";
      navBack.style.transform = "none";
    }
  }

  if(parallax) {
    slowParallax(scrollY);
  }
}

function slowParallax(scroll) {
  var el = document.querySelector('#vstar'),
  parallax = document.querySelector('#vstar .back'),
  n = document.querySelector('nav');
  var offset = el.offsetTop + el.parentElement.offsetTop + el.parentElement.parentElement.offsetTop - 2 * nav.offsetHeight - 180;
  if(scroll > offset) {
    parallax.classList.add("slow");
  } else {
    parallax.classList.remove("slow");
  }
}

function addDemoClickEv (btn, file, cont) {
  btn.addEventListener("click", function() {
    cont.querySelector('.selected').className = "";
    cont.querySelector('.showing').className = "demo";
    btn.className = "selected";
    file.className = "showing demo";
  });
}

function getDemoConts() {
	var conts = document.querySelectorAll(".demoCont");

	for (var i = 0; i < conts.length; i++) {
		var cont = conts[i],
      btns = cont.querySelector('.demoFiles').childNodes,
      files = cont.querySelectorAll('.demo');

    if (btns.length !== files.length)
      console.warn("Warning: All file tabs should have a corresponding file");

    for (var j = 0; j < btns.length; j++) {
      addDemoClickEv(btns[j], files[j], cont);
    }

    btns[0].className = "selected";
    files[0].className = "showing demo";
	}
}

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


window.onload = function(){

  // select inputs and textarea and add
    // eventlisteners to them for onchange
  var inputs = document.querySelectorAll("input, textarea");
  for(var i = 0; i < inputs.length; i++){
    if(inputs[i].className !== "submit")
      inputs[i].addEventListener("input", function(){
        if(this.value === "")
          this.classList.remove("filled");
        else
          this.classList.add("filled");
      });
  }

  // set navigation bar to be "sticky"
  nav = document.querySelector("#navigation");
  navBack = document.querySelector("#navBack");
  var view = document.querySelector(".parallax") || window;
  var ticking = false;
  var scroll;

  if (window.location.pathname.lastIndexOf('/') === window.location.pathname.length - 1) {

    view.addEventListener('scroll', function(e) {
      scroll = view.scrollY || view.scrollTop;

      if (ticking) {
        return;
      }
      ticking = true;
      window.requestAnimationFrame(function() {
        stickyNav(scroll, view.scrollY === undefined);
        ticking = false;
      });

    });

    stickyNav(view.scrollY || view.scrollTop, view.scrollTop);

  } else {
    nav.className = "fs-12 scrolled";
  }

  // check for images that open an album
  img_albums = document.querySelectorAll("img[data]");

  for(let i = 0; i < img_albums.length; i++)
    //get_album(img_albums[i].getAttribute("data"));
    img_albums[i].addEventListener("click", function(){
      get_album(img_albums[i].getAttribute("data"));
    });

  // try to retrieve Twitter feed
  //reqTwitterFeed();

  getDemoConts();

  loadImgs();

  var img = document.querySelector("#frontImg"),
    st1 = document.querySelector("#stop1"),
    st2 = document.querySelector("#stop2");

  if(img)
    hoverMask(img, st1, st2);

};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhY3RGb3JtLmpzIiwiaW1hZ2VMb2FkZXIuanMiLCJzdGlja3lOYXYuanMiLCJjb2RlRGVtby5qcyIsImhvdmVyTWFzay5qcyIsIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHNldHVwIGV2ZW50bGlzdGVuZXJzIGZvciBBSkFYIHJlcXVlc3QgYW5kIHNlbmQgZW1haWxcclxuZnVuY3Rpb24gQUpBWFJlcShmb3JtKXtcclxuICBpZighZm9ybSkgcmV0dXJuO1xyXG5cclxuICAvLyBub3Qgc3VwcG9ydGluZyBvbGQgSUUgdmVyc2lvbnNcclxuICB2YXIgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG4gIHZhciBmYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmVlZGJhY2tcIik7XHJcbiAgcmVxLmFkZEV2ZW50TGlzdGVuZXIoXCJwcm9ncmVzc1wiLCBmdW5jdGlvbigpe1xyXG4gICAgZmIuaW5uZXJIVE1MPSBcIldhaXQgZm9yIGl0Li4uXCI7XHJcbiAgZmIuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XHJcbiAgfSk7XHJcblxyXG4gIHJlcS5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbihkKXtcclxuICAgIGZiLmlubmVySFRNTCA9IFwiVGhhbmtzISBDaHJpcyB3aWxsIGdldCBiYWNrIHRvIHlvdSBhcyBzb29uIGFzIGhlIGNhbi5cIjtcclxuXHJcbiAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICBmYi5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcclxuICAgIH0sIDIwMDApO1xyXG5cclxuICB9KTtcclxuXHJcbiAgcmVxLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBmdW5jdGlvbigpe1xyXG4gICAgZmIuaW5uZXJIVE1MID0gXCJTb3JyeSwgSSBjb3VsZG4ndCBzZW5kIHlvdXIgZW1haWwgdG8gQ2hyaXMuLi4gVHJ5IGFnYWluIGxhdGVyP1wiO1xyXG4gIH0pO1xyXG5cclxuICByZXEub3BlbihcInBvc3RcIiwgZm9ybS5hY3Rpb24pO1xyXG4gIHJlcS5zZW5kKG5ldyBGb3JtRGF0YShmb3JtKSk7XHJcbn1cclxuIiwiZnVuY3Rpb24gZ2V0U3JjKGltZykge1xyXG4gIHJldHVybiBpbWcubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpbWdcIiA/XHJcbiAgICBpbWcuc3JjIDpcclxuICAgIGltZy5nZXRBdHRyaWJ1dGUoXCJ4bGluazpocmVmXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRTcmMoaW1nLCBzcmMpIHtcclxuICBpbWcubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpbWdcIiA/XHJcbiAgICBpbWcuc3JjID0gc3JjIDpcclxuICAgIGltZy5zZXRBdHRyaWJ1dGUoXCJ4bGluazpocmVmXCIsIHNyYyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldEltZ0xvYWRlcnMoaW1nKSB7XHJcbiAgdmFyIHNyYyA9IGdldFNyYyhpbWcpO1xyXG5cclxuICB2YXIgc21hbGwgPSBuZXcgSW1hZ2UoKTtcclxuICBzbWFsbC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBsYXJnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgbGFyZ2Uub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHNldFNyYyhpbWcsIGxhcmdlLnNyYyk7XHJcbiAgICAgIGltZy5jbGFzc05hbWUgPSBpbWcuY2xhc3NOYW1lICsgXCIgbG9hZGVkXCI7XHJcbiAgICB9XHJcbiAgICBsYXJnZS5zcmMgPSBzcmMucmVwbGFjZSgvX3ByZVxcLi8sICcuJylcclxuICB9XHJcbiAgc21hbGwuc3JjID0gc3JjO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkSW1ncygpIHtcclxuICB2YXIgaW1ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZywgaW1hZ2UnKTtcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbWdzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgaWYgKCEvX3ByZVxcLi8udGVzdChnZXRTcmMoaW1nc1tpXSkpKSB7XHJcbiAgICAgIGNvbnRpbnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEltZ0xvYWRlcnMoaW1nc1tpXSk7XHJcbiAgfVxyXG59XHJcbiIsInZhciBuYXYsIG5hdkJhY2s7XHJcblxyXG5mdW5jdGlvbiBzdGlja3lOYXYoc2Nyb2xsWSwgcGFyYWxsYXgpe1xyXG4gIGlmKHNjcm9sbFkgPiAyMCkge1xyXG4gICAgbmF2LmNsYXNzTmFtZSA9IFwiZnMtMTIgc2Nyb2xsZWRcIjtcclxuICAgIC8vY29uc29sZS5sb2cocGFyYWxsYXgpO1xyXG4gICAgaWYocGFyYWxsYXgpIHtcclxuICAgICAgdmFyIHRyYW5zbGF0ZSA9IFwidHJhbnNsYXRlWShcIitzY3JvbGxZK1wicHgpXCI7XHJcbiAgICAgIG5hdi5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2xhdGU7XHJcbiAgICAgIG5hdkJhY2suc3R5bGUudHJhbnNmb3JtID0gdHJhbnNsYXRlO1xyXG4gICAgfVxyXG4gIH1cclxuICBlbHNlIHtcclxuICAgIG5hdi5jbGFzc05hbWUgPSBcImZzLTEyXCI7XHJcbiAgICBpZihwYXJhbGxheCkge1xyXG4gICAgICBuYXYuc3R5bGUudHJhbnNmb3JtID0gXCJub25lXCI7XHJcbiAgICAgIG5hdkJhY2suc3R5bGUudHJhbnNmb3JtID0gXCJub25lXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZihwYXJhbGxheCkge1xyXG4gICAgc2xvd1BhcmFsbGF4KHNjcm9sbFkpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2xvd1BhcmFsbGF4KHNjcm9sbCkge1xyXG4gIHZhciBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN2c3RhcicpLFxyXG4gIHBhcmFsbGF4ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ZzdGFyIC5iYWNrJyksXHJcbiAgbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ25hdicpO1xyXG4gIHZhciBvZmZzZXQgPSBlbC5vZmZzZXRUb3AgKyBlbC5wYXJlbnRFbGVtZW50Lm9mZnNldFRvcCArIGVsLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5vZmZzZXRUb3AgLSAyICogbmF2Lm9mZnNldEhlaWdodCAtIDE4MDtcclxuICBpZihzY3JvbGwgPiBvZmZzZXQpIHtcclxuICAgIHBhcmFsbGF4LmNsYXNzTGlzdC5hZGQoXCJzbG93XCIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBwYXJhbGxheC5jbGFzc0xpc3QucmVtb3ZlKFwic2xvd1wiKTtcclxuICB9XHJcbn1cclxuIiwiZnVuY3Rpb24gYWRkRGVtb0NsaWNrRXYgKGJ0biwgZmlsZSwgY29udCkge1xyXG4gIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICBjb250LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZCcpLmNsYXNzTmFtZSA9IFwiXCI7XHJcbiAgICBjb250LnF1ZXJ5U2VsZWN0b3IoJy5zaG93aW5nJykuY2xhc3NOYW1lID0gXCJkZW1vXCI7XHJcbiAgICBidG4uY2xhc3NOYW1lID0gXCJzZWxlY3RlZFwiO1xyXG4gICAgZmlsZS5jbGFzc05hbWUgPSBcInNob3dpbmcgZGVtb1wiO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREZW1vQ29udHMoKSB7XHJcblx0dmFyIGNvbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kZW1vQ29udFwiKTtcclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb250cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGNvbnQgPSBjb250c1tpXSxcclxuICAgICAgYnRucyA9IGNvbnQucXVlcnlTZWxlY3RvcignLmRlbW9GaWxlcycpLmNoaWxkTm9kZXMsXHJcbiAgICAgIGZpbGVzID0gY29udC5xdWVyeVNlbGVjdG9yQWxsKCcuZGVtbycpO1xyXG5cclxuICAgIGlmIChidG5zLmxlbmd0aCAhPT0gZmlsZXMubGVuZ3RoKVxyXG4gICAgICBjb25zb2xlLndhcm4oXCJXYXJuaW5nOiBBbGwgZmlsZSB0YWJzIHNob3VsZCBoYXZlIGEgY29ycmVzcG9uZGluZyBmaWxlXCIpO1xyXG5cclxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgYnRucy5sZW5ndGg7IGorKykge1xyXG4gICAgICBhZGREZW1vQ2xpY2tFdihidG5zW2pdLCBmaWxlc1tqXSwgY29udCk7XHJcbiAgICB9XHJcblxyXG4gICAgYnRuc1swXS5jbGFzc05hbWUgPSBcInNlbGVjdGVkXCI7XHJcbiAgICBmaWxlc1swXS5jbGFzc05hbWUgPSBcInNob3dpbmcgZGVtb1wiO1xyXG5cdH1cclxufVxyXG4iLCIvLyBmaXJzdCBhcmd1bWVudCBpcyBhIGNvbnRhaW5pbmcgU1ZHIGVsZW1lbnQsXHJcbiAgLy9hZGRpdGlvbmFsIGFyZ3VtZW50cyBhcmUgZ3JhZGllbnQgc3RvcHNcclxuZnVuY3Rpb24gaG92ZXJNYXNrKCkge1xyXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMilcclxuICAgIHJldHVybjtcclxuXHJcbiAgdmFyIGNvbnQgPSBhcmd1bWVudHNbMF0sXHJcbiAgc3RvcHMgPSBbXTtcclxuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgIHN0b3BzLnB1c2goYXJndW1lbnRzW2ldKTtcclxuICBjb250LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgdmFyIG9mZnNldCA9IDEwMCAqIGUub2Zmc2V0WCAvIGNvbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdG9wcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBzdG9wc1tpXS5zZXRBdHRyaWJ1dGUoXCJvZmZzZXRcIiwgKG9mZnNldCsoaSo1KSArIFwiJVwiKSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuIiwiXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpe1xyXG5cclxuICAvLyBzZWxlY3QgaW5wdXRzIGFuZCB0ZXh0YXJlYSBhbmQgYWRkXHJcbiAgICAvLyBldmVudGxpc3RlbmVycyB0byB0aGVtIGZvciBvbmNoYW5nZVxyXG4gIHZhciBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXQsIHRleHRhcmVhXCIpO1xyXG4gIGZvcih2YXIgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspe1xyXG4gICAgaWYoaW5wdXRzW2ldLmNsYXNzTmFtZSAhPT0gXCJzdWJtaXRcIilcclxuICAgICAgaW5wdXRzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKHRoaXMudmFsdWUgPT09IFwiXCIpXHJcbiAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoXCJmaWxsZWRcIik7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKFwiZmlsbGVkXCIpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIHNldCBuYXZpZ2F0aW9uIGJhciB0byBiZSBcInN0aWNreVwiXHJcbiAgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuYXZpZ2F0aW9uXCIpO1xyXG4gIG5hdkJhY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hdkJhY2tcIik7XHJcbiAgdmFyIHZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhcmFsbGF4XCIpIHx8IHdpbmRvdztcclxuICB2YXIgdGlja2luZyA9IGZhbHNlO1xyXG4gIHZhciBzY3JvbGw7XHJcblxyXG4gIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUubGFzdEluZGV4T2YoJy8nKSA9PT0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLmxlbmd0aCAtIDEpIHtcclxuXHJcbiAgICB2aWV3LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgc2Nyb2xsID0gdmlldy5zY3JvbGxZIHx8IHZpZXcuc2Nyb2xsVG9wO1xyXG5cclxuICAgICAgaWYgKHRpY2tpbmcpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgdGlja2luZyA9IHRydWU7XHJcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc3RpY2t5TmF2KHNjcm9sbCwgdmlldy5zY3JvbGxZID09PSB1bmRlZmluZWQpO1xyXG4gICAgICAgIHRpY2tpbmcgPSBmYWxzZTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgc3RpY2t5TmF2KHZpZXcuc2Nyb2xsWSB8fCB2aWV3LnNjcm9sbFRvcCwgdmlldy5zY3JvbGxUb3ApO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgbmF2LmNsYXNzTmFtZSA9IFwiZnMtMTIgc2Nyb2xsZWRcIjtcclxuICB9XHJcblxyXG4gIC8vIGNoZWNrIGZvciBpbWFnZXMgdGhhdCBvcGVuIGFuIGFsYnVtXHJcbiAgaW1nX2FsYnVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbWdbZGF0YV1cIik7XHJcblxyXG4gIGZvcihsZXQgaSA9IDA7IGkgPCBpbWdfYWxidW1zLmxlbmd0aDsgaSsrKVxyXG4gICAgLy9nZXRfYWxidW0oaW1nX2FsYnVtc1tpXS5nZXRBdHRyaWJ1dGUoXCJkYXRhXCIpKTtcclxuICAgIGltZ19hbGJ1bXNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgIGdldF9hbGJ1bShpbWdfYWxidW1zW2ldLmdldEF0dHJpYnV0ZShcImRhdGFcIikpO1xyXG4gICAgfSk7XHJcblxyXG4gIC8vIHRyeSB0byByZXRyaWV2ZSBUd2l0dGVyIGZlZWRcclxuICAvL3JlcVR3aXR0ZXJGZWVkKCk7XHJcblxyXG4gIGdldERlbW9Db250cygpO1xyXG5cclxuICBsb2FkSW1ncygpO1xyXG5cclxuICB2YXIgaW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmcm9udEltZ1wiKSxcclxuICAgIHN0MSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3RvcDFcIiksXHJcbiAgICBzdDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N0b3AyXCIpO1xyXG5cclxuICBpZihpbWcpXHJcbiAgICBob3Zlck1hc2soaW1nLCBzdDEsIHN0Mik7XHJcblxyXG59O1xyXG4iXX0=
