
$(document).ready(function(e) {

  var get = document.getElementById.bind(document);

  //set up variables for each animated elements

  //frame 1
  var logoMM = get("logoMM");
  var logoHL = get("logoHL");
  var txtLegal= get("txtLegal");
  var txtHeadline1 = get("txtHeadline1");
  var txtHeadline2_1 = get("txtHeadline2_1");
  var txtHeadline2_2 = get("txtHeadline2_2");
  var txtHeadline2_3 = get("txtHeadline2_3");
  var txtHeadline3 = get("txtHeadline3");
  var btnCTA = get("btnCTA");

  // GSAP Animation Commands for Banner
  function animate() {

    var f2 = 3.6;
    var f3 = f2 + 5;

    TweenLite.defaultEase = Sine.easeOut;

    //frame1
    TweenLite.to([logoMM, logoHL], .5, {opacity:1, delay:.1});
    TweenLite.to(txtHeadline1, .5, {opacity: 1, y: -90, delay: .6});

    //frame2
    fadeout(txtHeadline1, f2);
    slidein(txtHeadline2_1, f2+.25);
    slidein(txtHeadline2_2, f2+.5);
    slidein(txtHeadline2_3, f2+.75);

    //frame3
    fadeout([txtHeadline2_1, txtHeadline2_2, txtHeadline2_3], f3);
    slidein(txtHeadline3, f3+.5);
    TweenLite.to([btnCTA, txtLegal], .5, {opacity: 1, delay: f3+1});

  }

  animate();

});

function slidein(el, d) { TweenLite.to(el, .5, {opacity: 1, y: 90, delay: d}); }

function fadeout(el, d) { TweenLite.to(el, .5, {opacity: 0, delay: d}); }

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
