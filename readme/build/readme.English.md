## Easycanvas

![https://github.com/chenzhuo1992/easycanvas/blob/master/demos/index.html](https://github.com/chenzhuo1992/easycanvas/blob/master/demos/index.gif?raw=true)

## Starts

Import Easycanvas and bind to a canvas dom:

```
    import EasyCanvas from 'easycanvas';

    // create a Easycanvas instance
    var $Painter = new EasyCanvas.painter();

    // create a Easycanvas instance
    $Painter.register(document.getElementById('foo'));

    // start Easycanvas paints loop
    $Painter.start();
```

You can set event handlers, max FPS and FPS handler with `register` function.
Once `register` is called, width and height of the dom will be cached, so you can set the size this way:

```
    let $app = document.getElementById('app');

    // can set width and height in HTML and CSS as well
    $app.style.width = w;
    $app.style.height = h;
    $app.width = w * 2;
    $app.height = h * 2;        

    var $Doc = new Easycanvas.painter();

    $Doc.register($app);
```

Tips: Size in html means the pixel size, in css means the display size. In some condition, let the pixel twice larger than the display size will avoid the word from being blurry. If only images in canvas, it is no need.

Now we have an empty instance, with no container, no image and no text inside.
    
## Add images

The most useful API is `add`, which can add a sprite to the instance. Style, content, events and scrolling can be set within `add`, or later. Examples:

```
    var $Painter = new EasyCanvas.painter();

    EasyCanvas.imgLoader('./G.png', function (img) {
        var sprite1 = $Painter.add({
            content: {
                img: img,
            },
            style: {
                tx: 200,
                ty: 100,
            }
        });

        sprite1.style.tx = 150;
    });
```

'sprite1' is a `sprite` instance, it is same as:

```
    var $Painter = new EasyCanvas.painter();

    EasyCanvas.imgLoader('./G.png', function (img) {
        var sprite1 = new Easycanvas.class.sprite({
            content: {
                img: img,
            },
            style: {
                tx: 200,
                ty: 100,
            }
        });

        sprite1.style.tx = 150;

        $Painter.add(sprite1);
    });
```

`EasyCanvas.imgLoader` will return an Image Object. The callback will trigger after the image loaded. More information later.

The result looks the same as a `<img src="./G.png">` with following css:

```
    position: absolute;
    left: 200;
    top: 100;
    transform: translateX(-50%) translateY(-50%);
```

The image center is `(200, 100)` by default. You can set 'lt' to `locate` in `style`. 'Center' in default means if you want put the button in the middle of a screen, you can set `tx` with half of the screen width, without considering the button itself. For example, here are two solutions with same effect:

```
    style: {
        tx: $Painter.width / 2,
        ty: 300
    }

    style: {
        tx: $Painter.width / 2 - this.content.img.width / 2,
        ty: 300 - this.content.img.height / 2,
        locate: 'lt'
    }
```

## Animation

Animation in Easycanvas means transforming the `style` of sprite. For example, you can set the style in `style` with a function:

```
    style: {
        tx: function () {
            return new Date().getTime() % 500;
        }
    }
```

Or use `transition` provided by Easycanvas:

```
    style: {
        tx: Easycanvas.transition.linear(100, 600, 1000),
        ty: Easycanvas.transition.linear(300, 400, 1000).loop(),
    }
```

Or other libs like Tween.js:

```
    TWEEN.onUpdate(function (obj) {
        sprite1.style.tx = obj.tx;
    });
```

Or modify the style in hooks(more information later):

```
    style: {
        tx: 100
    },
    hooks: {
        ticked: function () {
            this.style.tx++;
        }
    },
```

Or setInterval :)

## Events

Almost all events in browsers are supported in Easycanvas, including wheel events(except wheel clicking, someone using it?). Besides, `hold` event is added which means a long press. Example:

```
    var $Painter = new EasyCanvas.painter();
    EasyCanvas.imgLoader('./G.png', function (img) {
        var sprite1 = $Painter.add({
            content: {
                img: img,
            },
            style: {
                tx: 200,
                ty: 100,
            },
            events: {
                eIndex: 1,
                click: function (e) {
                    this.style.tx = e.canvasX;
                    this.style.ty = e.event.layerY;
                }
            },
        });
    });
```

'this' points to 'sprite1', 'e.event' points to native 'Event', 'e.canvasX' means position in Canvas coordinate. If your pixel size is different with display size, 'canvasX' is more convenient.

Events will pass from higher `eIndex`, and stop when a handler 'return true', Or 'bubble up' to the root instance. The following example shows how to handle events in root instance:

```
    $Painter.register(document.getElementById('foo'), {
        events: {
            touchmove: function (e) {
                e.event.preventDefault();
            }
        }
    });
```

You can set `through` to false to hold up all events. This is equal to 'return true' in every event handler.

## Hooks

Hooks supported in Easycanvas include: `ticked`, `removed`, `beforeTick`.

```
    var box = new Easycanvas.class.sprite({
        content: {
            img: img,
        },
        hooks: {
            ticked: function () {
                // Exec per tick, after rendering
            },
            removed: function () {
                // Exec after the sprite removed
            },
        },
    });
```

## Basic API List

`content` contains `img` and `text`, for rendering images and texts.

`style` has these styles:

```
    tx, ty, tw, th: target left, top position and width, height size
    // Number, Function(Exec per tick, must return the result)

    sx, sy: cut position of content.img, if image exists(see Canvas.drawImage prototype)
    sw, th: cut size of content.img, if image exists(see Canvas.drawImage prototype)
    // Number, Function(Exec per tick, return the result)

    locate: layout type: lt/center/rd(like translate in css)
    scale: scale size(like scale in css)
    opacity: transparency(like opacity in css)
    zIndex: layout level(like zIndex in css)

    // the following works only if the content has texts
    textAlign: horizontal align(like text-align in css)
    textFont: font style, such as '14px Arial'
    textVerticalAlign: vertical align(like vertical-align in css)
    color: font color(like color in css)
    lineHeight: height of each line(like line-height in css, in pixel)
    // value of 'align' and 'color' referenced to css
```

## Nesting

Easycanvas use `children` to describe the nesting, for example:

```
    var $Painter = new Easycanvas.painter();
    $Painter.register(document.getElementById('foo'));
    $Painter.start();

    Easycanvas.imgLoader('https://github.com/chenzhuo1992/easycanvas/blob/master/demos/G30x30.png?raw=true', function (img) {
        // create a sprite
        var sprite1 = $Painter.add({
            content: {
                img: img,
            },
            style: {
                tx: 100, ty: 100,
                locate: 'lt',
                opacity: 0.5,
                rotate: 40,
            },

            children: [
                {
                    content: {
                        img: img,
                    },
                    inherit: ['opacity'],
                    style: {
                        tx: 500, ty: 0,
                        zIndex: 1,
                        opacity: 0.5,
                        locate: 'center',
                    },
                },
                {
                    inherit: ['tx', 'ty', 'rotate'],
                    content: {
                        img: img,
                    },
                    style: {
                        tx: 500, ty: 500,
                        opacity: 0.7,
                        zIndex: 1,
                        locate: 'center',
                    },
                },
            ],
        });
    });
```

Or dynamically:

```
    var parent = new Easycanvas.class.sprite({
        content: {
            img: box,
        },
    });
    var child = new Easycanvas.class.sprite({
        content: {
            img: ball,
        },
    });
    parent.add(child);
    parent.remove(child); // or child.remove();
```

Only `tx`, `ty` and `scale` is inherited from parents by default. Use `inherit` to set your own rules, like this:

```
    var child = new Easycanvas.class.sprite({
        content: {
            img: ball,
        },
        inherit: ['tx', 'ty', 'locate', 'rotate']
    });
```

## Animating Sprite

The following case created a sprite when a global clicking occur to the canvas instance, then display an animation which is transformed from an image file stitching up 9 frames.

```
    var $Painter = new Easycanvas.painter();
    $Painter.register(document.getElementById('foo'), {
        events: {
            click: function (e) {
                $Painter.add(createFire(e.canvasX, e.canvasY));
            }
        }
    });

    var Fire = Easycanvas.imgLoader(https://github.com/chenzhuo1992/easycanvas/blob/master/demos/Fire.png?raw=true);

    var createFire = function (initX, initY) {
        return {
            content: {
                img: Fire,
                // 'sequence' can split an image into frames
                // size of each frame, -9 means 1/9 of image width, like 'Fire.width / 9'
                sequence: {
                    w: -9,
                    h: -1,
                    interval: 50,
                    loop: false
                }
            },

            style: {
                tx: initX, ty: initY,
            },
        };
    };

    $Painter.start();
```
