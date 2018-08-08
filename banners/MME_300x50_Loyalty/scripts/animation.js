
$(document).ready(function(e) {

  var get = document.getElementById.bind(document);

  //set up variables for each animated elements

  //frame 1
  var logoMM = get("logoMM");
  var logoHL = get("logoHL");
  var txtLegal= get("txtLegal");
  var txtHeadline = get("txtHeadline1");
  var btnCTA = get("btnCTA");

  // GSAP Animation Commands for Banner
  function animate() {

    //frame1
    TweenLite.to([logoMM, logoHL, txtLegal], .5, {opacity:1, ease:Sine.easeOut, delay:.1});
    TweenLite.to(txtHeadline, .5, {opacity: 1, y: -50, ease:Sine.easeOut, delay: .6});
    TweenLite.to(btnCTA, .5, {opacity: 1, y: "-=50", ease:Sine.easeOut, delay: 1.1});

  }

  animate();

});

btnCTA.onmouseover = function(e) {
  TweenLite.to(btnCTA, .25, {
    opacity: 1,
    scale: 1.1,
    ease: Quad.easeOut
  });
}

btnCTA.onmouseout = function(e) {
  TweenLite.to(btnCTA, .25, {
    opacity: 1,
    scale:1,
    ease: Quad.easeOut
  });
}
