
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
