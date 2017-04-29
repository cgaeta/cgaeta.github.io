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

var nav;

function stickyNav(scrollY){
  if(scrollY > 40){
    nav.style.cssText = "position:fixed;box-shadow:0 5px 5px 0 rgba(0,0,0,.25);";
  }
  else
    nav.style.cssText = "";
}

var img_albums;

// make AJAX request for images associated with an element
function get_album(dir){
  var req = new XMLHttpRequest();
  
  // prepare AJAX callback
  req.addEventListener("load", function(d){
    let imgs = JSON.parse(req.response);
    
    // prepare container for album
    let album = document.createElement("div");
    album.className = "album";
    
    // prepare container for selected image
    let show = document.createElement("div");
    show.className = "show";
    
    // prepare list of thumbnails
    let thumbnails = document.createElement("ul");
    thumbnails.className = "thumbnails";
    
    // prepare thumbnails
    for(let i = 0; i < imgs.length; i++){
      // select the first loaded thumbnail
      if(i < 1){
        var img = document.createElement("img");
        img.setAttribute("src", "img/"+dir+"/"+imgs[i]);
        img.className = "album_image";

        show.appendChild(img);
      }
      
      let th = document.createElement("li");
      th.className = i < 1 ? "thumbnail selected" : "thumbnail";
      
      let thImg = document.createElement("img");
      thImg.setAttribute("src", "img/"+dir+"/"+imgs[i]);
      thImg.className = "thumbnail_img";
      
      // add mouseover events to thumbnails
        // load mouseovered image
      th.addEventListener("mouseover", function(){
        img.setAttribute("src", "img/"+dir+"/"+imgs[i]);
        
        let selected = document.querySelector(".thumbnail.selected");
        
        if(selected != undefined)
          selected.className = "thumbnail";
        
        this.className = "thumbnail selected";
      });
      
      th.appendChild(thImg);
      thumbnails.appendChild(th);
    }
    
    // add arrow buttons to thumbnail list
    let left = document.createElement("li"), right = document.createElement("li");
    
    left.className = "left_arrow";
    right.className = "right_arrow";
    
    // prepare close button
    let close = document.createElement("span");
    close.innerHTML = "Close &#10060;";
    close.className = "album_close";
    close.addEventListener("click", function(){
      document.body.removeChild(album);
    });
    
    // append album elements
    album.appendChild(show);
    thumbnails.insertBefore(left, thumbnails.childNodes[0]);
    thumbnails.appendChild(right);
    album.appendChild(thumbnails);
    album.appendChild(close);
    document.body.appendChild(album);
      
  });
  
  req.open("get", "./findImgs.php?img_dir=" + dir);
  req.send();
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

  window.addEventListener('scroll', function(e){
    stickyNav(window.scrollY);
  });
  
  stickyNav(window.scrollY);
  
  // check for images that open an album
  img_albums = document.querySelectorAll("img[data]");
  console.log(img_albums);
  
  for(let i = 0; i < img_albums.length; i++)
    //get_album(img_albums[i].getAttribute("data"));
    img_albums[i].addEventListener("click", function(){
      get_album(img_albums[i].getAttribute("data"));
    })
};
