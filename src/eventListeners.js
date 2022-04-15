/*
 * Copyright (c) 2020 LG Electronics Inc.
 * SPDX-License-Identifier: CC0-1.0
 */
var lastClickedId = null;
var itemArray = document.getElementsByClassName("item");

function addEventListeners () {
    for (var i = 0; i < itemArray.length; i++){
        itemArray[i].addEventListener("mouseover", _onMouseOverEvent);
        itemArray[i].addEventListener("click", _onClickEvent);
        itemArray[i].addEventListener("keydown", function(e) {
            if (e.keyCode === 13) {
                _onClickEvent(e);
            }
        })
    }
}

function _onClickEvent (e) {
    if (lastClickedId) {
        document.getElementById(lastClickedId).classList.remove("clicked");
    }
    document.getElementById(e.target.id).classList.add("clicked");
    lastClickedId = e.target.id;
    console.log(lastClickedId + " is clicked!")
}

function _onMouseOverEvent (e) {
    for (var i = 0; i < itemArray.length; i++){
        itemArray[i].blur();
     }
    document.getElementById(e.target.id).focus();
}
