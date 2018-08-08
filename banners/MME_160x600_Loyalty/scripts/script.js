
/* SIZMEK ----------------------------------- */
var adDiv;

function initEB() {
    if (!EB.isInitialized()) {
        EB.addEventListener(EBG.EventName.EB_INITIALIZED, startAd);
    } else {
        startAd();
    }
}

function startAd() {
    adDiv = document.getElementById("ad");

    addEventListeners();
}

function addEventListeners() {
    document.getElementById("clickthrough-button").addEventListener("click", clickthrough);
    
    /*CUSTOM*/
//    document.getElementById("buttonCTA").addEventListener("mouseover", buttonMouseOver);
//    document.getElementById("buttonCTA").addEventListener("mouseout", buttonMouseOut);
}

function clickthrough() {
    EB.clickthrough();
}

window.addEventListener("load", initEB);