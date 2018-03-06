<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [DRAG_DEFAULTS](#drag_defaults)
-   [Drag](#drag)
    -   [getElementsFromPoint](#getelementsfrompoint)
    -   [updated](#updated)
    -   [destroy](#destroy)
-   [dragend](#dragend)
-   [drag](#drag-1)
-   [dragstart](#dragstart)

## DRAG_DEFAULTS

**Properties**

-   `axis` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Constrains dragging to either axis. Possible values: null, 'x', 'y'
-   `clone` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Set to true to clone the object to drag. In many situations this is
     needed to break out of layout.
-   `cloneCssClass` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Css class added to clone element (defaults is 'is-clone')
-   `clonePosIsFixed` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** If true cloned object will use css style "position: fixed"
-   `cloneAppendTo` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Selector to append to for the clone
    ['body'|'parent'|'jquery object'] default:'body'
-   `containment` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Constrains dragging to within the bounds of the specified element
     or region. Possible values: "parent", "document", "window".
-   `obstacle` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** jQuery Selector of object(s) that you cannot drag into,
-   `underElements` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** If set to true will return list of elements that are
    underneath the drag element
-   `containmentOffset` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** How close to the containment object should we be allowed
    to drag in position form. `{left: 0, top: 0}`

## Drag

Drag/Drop functions with touch support.
TODO: Resize: <http://stackoverflow.com/questions/8258232/resize-an-html-element-using-touches>
Similar: <https://github.com/desandro/draggabilly>

**Parameters**

-   `element` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The component element.
-   `settings` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The component settings.

### getElementsFromPoint

Get elements from given point.

**Parameters**

-   `x` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The x-coordinate of the Point.
-   `y` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The y-coordinate of the Point.

### updated

Update the component and optionally apply new settings.

**Parameters**

-   `settings` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** the settings to update to.

### destroy

Detach all functionality and events.

## dragend

Fires after the drag is completed. Use this to remove / set drag feedback off.

**Properties**

-   `event` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The jquery event object.
-   `ui` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The dialog object

## drag

Fires (many times) while dragging is occuring. Use this for DOM feedback but
be careful about what you do in here for performance.

**Properties**

-   `event` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The jquery event object.
-   `ui` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The dialog object

## dragstart

When the dragging is initiated. Use this to customize/style
the drag/drop objects in the DOM.

**Properties**

-   `event` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The jquery event object.
-   `ui` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The dialog object