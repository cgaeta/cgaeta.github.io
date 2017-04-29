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
