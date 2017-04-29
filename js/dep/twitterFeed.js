// try to make an AJAX request for Twitter feed
function reqTwitterFeed(){

  var req = new XMLHttpRequest();

  req.open('GET', 'https://node-twitter-feed.herokuapp.com/api/tweetList');

  req.onreadystatechange = function(){

    if(req.readyState === 4)
      if(req.status >= 200 && req.status < 400){

        var footer = document.querySelector(".footer");
        var tweetCont = document.createElement("div");
        tweetCont.className = "tweetCont fs-4 fo-3 fs-6-1280 fo-1-1280 fs-8-800 fo-1-800 fs-10-640 fo-1-640";

        tweetCont.innerHTML = req.responseText;

        footer.appendChild(tweetCont);

      }
  }

  req.send();

}
