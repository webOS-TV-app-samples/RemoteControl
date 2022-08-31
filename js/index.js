var eventRegister = (function () {
  var lastClickedId = null;
  var itemArray = document.getElementsByClassName("item");
  var updateText = function (query, value) {
    var element = document.querySelectorAll(query);
    if (element && element.length > 0) {
      element[0].innerText = value;
    }
  };
  var showXYCoordinates = function (details) {
    updateText("span.x_coor", details.pageX);
    updateText("span.y_coor", details.pageY);
  };
  var _onClickEvent = function (e) {
    if (lastClickedId) {
      document.getElementById(lastClickedId).classList.remove("clicked");
    }
    document.getElementById(e.target.id).classList.add("clicked");
    lastClickedId = e.target.id;
    updateText("p.ok_select", lastClickedId);
  };

  var _onMouseOverEvent = function (e) {
    for (var i = 0; i < itemArray.length; i++) {
      _removeFocus(itemArray[i]);
    }
    document.getElementById(e.target.id).focus();
  };
  var _removeFocus = function (item) {
    item.blur();
  };
  var _itemKeyDownHandler = function (e) {
    if (e.keyCode === 13) {
      document.getElementById(e.target.id).classList.add("active");
    }
  };
  var _itemKeyUpHandler = function (e) {
    if (e.keyCode === 13) {
      document.getElementById(e.target.id).classList.remove("active");
      _onClickEvent(e);
    }
  };
  var _itemMouseOutHandler = function (e) {
    _removeFocus(document.getElementById(e.target.id));
  };
  var addEventListeners = function () {
    window.addEventListener("mouseover", showXYCoordinates);
    for (var i = 0; i < itemArray.length; i++) {
      itemArray[i].addEventListener("mouseover", _onMouseOverEvent);
      itemArray[i].addEventListener("mouseout", _itemMouseOutHandler);
      itemArray[i].addEventListener("click", _onClickEvent);
      itemArray[i].addEventListener("keyup", _itemKeyUpHandler);
      itemArray[i].addEventListener("keydown", _itemKeyDownHandler);
    }
  };
  var cursorVisibilityChange = function (event) {
    var visibility = event.detail.visibility;
    if (visibility) {
      console.log("Cursor appeared");
    } else {
      console.log("Cursor disappeared");
      updateText("span.x_coor", "-");
      updateText("span.y_coor", "-");
    }
  };
  var keyEventHandler = function (event) {
    var keyCode = event.keyCode;
    var type = event.type;
    var key = event.key || event.keyIdentifier;

    if (key) {
      updateText("span.key_name", key);
      updateText("span.key_code", keyCode);
      updateText("span.key_status", type);
    }
    //cursor hide for webOS 1.x
    if (type === "keydown" && keyCode === 1537) {
      console.log(type + "  " + keyCode + "  " + key);
      updateText("span.x_coor", "-");
      updateText("span.y_coor", "-");
    }
  };
  return {
    addEventListeners,
    cursorVisibilityChange,
    keyEventHandler,
  };
})();

window.addEventListener("load", function () {
  SpatialNavigation.init();
  SpatialNavigation.add({
    selector: ".item",
  });
  SpatialNavigation.makeFocusable();
  eventRegister.addEventListeners();
  document.addEventListener(
    "cursorStateChange",
    eventRegister.cursorVisibilityChange,
    false
  );
  document.addEventListener("keydown", eventRegister.keyEventHandler, false);
  document.addEventListener("keyup", eventRegister.keyEventHandler, false);
});
