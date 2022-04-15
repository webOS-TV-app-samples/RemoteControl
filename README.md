# Remote Control

This sample app shows the keycode received from external input devices such as magic remote control, conventional remote control, external keyboard, and so on.

webOS TV is compatible with almost all of the keycode of standard keyboards. In addition, webOS TV has its unique keycodes used only for webOS TV. These unique keycodes are entered via the remote control of webOS TV. You can get these keycodes by the parameter of a key event.

You can figure out the whole keycodes of the remote control with this sample. However, we recommend using the keycodes that mentioned in [Remote Control](https://webostv.developer.lge.com/design/webos-tv-system-ui/remote-control/).

## Adding Event Listener

The `keydown` event is fired when users press a key on the keyboard. To handle the `keydown` event, you need to add the event listener to the document element.

```javascript
document.addEventListener('keydown', function (inEvent) {
  // Handling keydown Event
});
```

## Handling Key Event

To handle the received keycode from the `keydown` event, add the below code in your application.

```javascript
var keycode;

if(window.event) {
keycode = inEvent.keyCode;
} else if(e.which) {
keycode = inEvent.which;
}
switch(keycode) {
case 38: doUp(); break;
case 40: doDown(); break;
. . .
}
```

At this sample, the message variable has an HTML tag including keycode received from the `keydown` event. You can see the keycode in a browser.

```javascript
document.addEventListener('keydown', function (inEvent) {
  var message =
    '<h1>' +
    'Keycode is <lg_red>' +
    inEvent.keyCode +
    '</lg_red></h1>' +
    '</br>';
  document.getElementById('results').innerHTML = message;
});
```

The `keydown` and `keyup` events delivered when SHIFT + NUM (0-9) are pressed on an HID (such as a keyboard) may return incorrect codes. Here are some examples:

- **SHIFT + 9:** 41
- **SHIFT + 0:** 40

Note that the `keypress` events for the above inputs return **correct** codes. (e.g. SHIFT + 9: 40, SHIFT + 0: 41)

An undefined input might be delivered as keycode 0. Make sure not to use keycode 0 for event handling.

## Result in the webOS TV Emulator

You can install the sample app and see the sample app result in the webOS TV emulator as below image.

![The result image of the sample app](https://webostv.developer.lge.com/download_file/view_inline/2084/)

## Do's and Don'ts

- **Do** test this sample app on your webOS TV emulator and real webOS   TV.

- **Do** use the JavaScript Switch State when you want to handle different actions according to each keycode.

- **Don't** try to find the keycode of the TV power key. webOS TV does not provide it.
