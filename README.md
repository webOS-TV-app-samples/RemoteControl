# Magic Remote Control

This sample app shows how to handle user inputs with the LG Magic Remote. For more information about LG Magic Remote, see [Magic Remote](https://webostv.developer.lge.com/design/webos-tv-system-ui/remote-control/).

## Basic Magic Remote Control Behavior

The following list describes the basic processing principles for user inputs of LG Magic Remote.

- Selectable UI elements must be fully navigable by the screen cursor and 4-way navigation keys: Up, Down, Left, Right.

- A selection effect is mandatory to show what element is activated. The possible selection effects are animation, highlight, color, or size change, etc.

- One of the UI elements must be focused. This is a common mistake that developers make, so check the following:

  - When the cursor disappears from the screen by entering the navigation keys, the focus by the cursor must be changed to the focus by the navigation keys.

  - Contrary to the above, when the cursor is activated and is moving onto the UI element, the focus by the navigation keys must be changed to the focus by the cursor position.

- The page and list scroll can be appropriately controlled using the wheel of the Magic Remote.

For more information about UI guidelines, see [UX Checklist](https://webostv.developer.lge.com/design/overview/ux-checklist/).

## Adding Event Listeners

The `mouseover` event is fired when a pointing device (LG Magic Remote or mouse) is used to move the cursor onto an element or one of its child elements. To handle the `mouseover` event, add the event listener to the document element.

```javascript
var lastClickedId = null;
var itemArray = document.getElementsByClassName('item');

function addEventListeners() {
  for (var i = 0; i < itemArray.length; i++) {
    itemArray[i].addEventListener('mouseover', _onMouseOverEvent);
    itemArray[i].addEventListener('click', _onClickEvent);
    itemArray[i].addEventListener('keydown', function (e) {
      if (e.keyCode === 13) {
        _onClickEvent(e);
      }
    });
  }
}

function _onClickEvent(e) {
  if (lastClickedId) {
    document.getElementById(lastClickedId).classList.remove('clicked');
  }
  document.getElementById(e.target.id).classList.add('clicked');
  lastClickedId = e.target.id;
  console.log(lastClickedId + ' is clicked!');
}

function _onMouseOverEvent(e) {
  for (var i = 0; i < itemArray.length; i++) {
    itemArray[i].blur();
  }
  document.getElementById(e.target.id).focus();
}
```

Depending on the version of the TV or emulator, the error that cannot load the script file of the external URL might occur. In this case, download the file and package it in the sample app as follows.

1. Download the spatial_navigation.js file provided by the [js-spatial-navigation](https://github.com/luke-chang/js-spatial-navigation) repository of GitHub and put it in the src directory of the sample app.

2. Modify the code in the index.html file as follows.

    ```javascript
    // Before
    <script src="https://luke-chang.github.io/js-spatial-navigation/spatial_navigation.js"></script>

    // After
    <script src="./src/spatial_navigation.js"></script>
    ```

3.  Repackage the sample app using the [ares-package](https://webostv.developer.lge.com/sdk/tools/using-webos-tv-cli/?wos_flag=ares-package#ares-package) command of the CLI.

## Result in the webOS TV

You can install the sample app and see the sample app result in the webOS TV emulator as below image.

![com.sample.mrcu.jpg](https://webostv.developer.lge.com/download_file/view_inline/12963/)

## Do's and Don'ts

- **Do** test this sample app on your webOS TV emulator and real webOS TV.

## Reference

To move focus between UI elements by 4-way navigation keys, [spatial navigation](https://github.com/luke-chang/js-spatial-navigation) is used.
