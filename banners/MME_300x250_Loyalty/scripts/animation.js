
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

    var f2 = 4.1;
    var f3 = f2 + 7.5;

    TweenLite.defaultEase = Sine.easeOut;

    //frame1
    TweenLite.to([logoMM, logoHL, txtLegal], .5, {opacity:1, delay:.1});
    slidein(txtHeadline1, .6);

    //frame2
    slideout(txtHeadline1, f2);
    TweenLite.to(txtHeadline2_1, .5, {opacity: 1, x: 300, delay: f2+.5});
    TweenLite.to(txtHeadline2_2, .5, {opacity: 1, scale: 1, delay: f2+3});
    TweenLite.to(txtHeadline2_3, .5, {opacity: 1, x: -300, delay: f2+4});

    //frame3
    slideout([txtHeadline2_1, txtHeadline2_2, txtHeadline2_3], f3);
    slidein(txtHeadline3, f3+.5);
    TweenLite.to(btnCTA, .5, {opacity: 1, delay: f3+1});

  }

  animate();

});

function slidein(el, d) { TweenLite.to(el, .5, {opacity: 1, x: -300, delay: d}); }

function slideout(el, d) { TweenLite.to(el, .5, {opacity: 0, x: "-=300", delay: d}); }

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
