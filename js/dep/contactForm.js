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
