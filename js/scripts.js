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
    fb.innerHTML = d.responseText;

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

var nav;

function stickyNav(scrollY){
  if(scrollY > 40){
    nav.style.cssText = "position:fixed;box-shadow:0 5px 5px 0 rgba(0,0,0,.25);";
  }
  else
    nav.style.cssText = "";
}

window.onload = function(){
  nav = document.querySelector("#navigation");

  window.addEventListener('scroll', function(e){
    stickyNav(window.scrollY);
  });
  
  stickyNav(window.scrollY);
};
