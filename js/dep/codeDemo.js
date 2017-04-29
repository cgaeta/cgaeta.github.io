function addDemoClickEv (btn, file, cont) {
  btn.addEventListener("click", function() {
    cont.querySelector('.selected').className = "";
    cont.querySelector('.showing').className = "demo";
    btn.className = "selected";
    file.className = "showing demo";
  });
}

function getDemoConts() {
	var conts = document.querySelectorAll(".demoCont");

	for (var i = 0; i < conts.length; i++) {
		var cont = conts[i],
      btns = cont.querySelector('.demoFiles').childNodes,
      files = cont.querySelectorAll('.demo');

    if (btns.length !== files.length)
      console.warn("Warning: All file tabs should have a corresponding file");

    for (var j = 0; j < btns.length; j++) {
      addDemoClickEv(btns[j], files[j], cont);
    }

    btns[0].className = "selected";
    files[0].className = "showing demo";
	}
}
