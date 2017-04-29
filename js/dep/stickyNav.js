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
