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
