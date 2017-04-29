/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
__webpack_require__(2);
__webpack_require__(1);

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
  navBack = document.querySelector("#navBack");
  var view = document.querySelector(".parallax") || window;
  var ticking = false;
  var scroll;

  if (window.location.pathname.lastIndexOf('/') === window.location.pathname.length - 1) {
    view.addEventListener('scroll', function(e) {
      scroll = view.scrollY || view.scrollTop;
      if (ticking) {
        return;
      }
      ticking = true;
      window.requestAnimationFrame(function() {
        stickyNav(scroll, view.scrollY === undefined);
        ticking = false;
      })
    });

    stickyNav(view.scrollY || view.scrollTop, view.scrollTop);

  } else {
    nav.className = "fs-12 scrolled";
  }

  // check for images that open an album
  img_albums = document.querySelectorAll("img[data]");

  for(let i = 0; i < img_albums.length; i++)
    //get_album(img_albums[i].getAttribute("data"));
    img_albums[i].addEventListener("click", function(){
      get_album(img_albums[i].getAttribute("data"));
    });

  // try to retrieve Twitter feed
  //reqTwitterFeed();

  getDemoConts();

  loadImgs();

  var img = document.querySelector("#frontImg"),
    st1 = document.querySelector("#stop1"),
    st2 = document.querySelector("#stop2");

  if(img)
    hoverMask(img, st1, st2);

};


/***/ })
/******/ ]);