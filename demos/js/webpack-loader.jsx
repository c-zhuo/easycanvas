import Easycanvas, { Painter, Transition } from '../../src/index.js';
import Text from '../../src/components/Text.js';
import View from '../../src/components/View.js';

window.Painter = Painter;

var $app = new Painter();
$app.register(document.getElementById('app'));
$app.start();

$app.add(
    <View name="root-element">
        {
            'Hello World'.split('').map((word, index) => {
                return <Text
                    style={{
                        left: $app.width * (0.2 + index * 0.05),
                        top: Transition.pendulum(120, 240, 3000, {
                            start: index * 60
                        }).loop(),
                        rotate: Transition.pendulum(-20, 20, 3000, {
                            start: index * 60
                        }).loop(),
                        color: '#F00',
                        width: 50,
                        height: 50,
                        fontSize: $app.width * 0.05,
                    }}
                    events={{
                        click() {
                            this.style.fontSize = 60;
                        }
                    }}
                >{word}</Text>
            })
        }
    </View>
);

// class HelloWorld {
//     constructor (App) {
//         return <View name="root-element">
//             {
//                 'Hello World'.split('').map((word, index) => {
//                     return <Text
//                         style={{
//                             left: (20 + index * 5) + '%',
//                             top: Transition.pendulum(220, 440, 3000, {
//                                 start: index * 60
//                             }).loop(),
//                             rotate: Transition.pendulum(-20, 20, 3000, {
//                                 start: index * 60
//                             }).loop(),
//                             width: 50,
//                             height: 50,
//                             color: '#F00',
//                             locate: 'lt',
//                             fontSize: '5%',
//                         }}
//                         events={{
//                             click: this.onclick
//                         }}
//                     >{word}</Text>
//                 })
//             }
//         </View>;
//     }

//     onclick () {
//         this.style.color = '#0F0';
//         console.log(this);
//     }
// }

// $app.add(new HelloWorld($app));

// Easycanvas.ImgLoader('https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png', function (img) {
//     let content = {
//         img: img
//     };

//     window.Sprite_JSX_1 = $app.add(
//         <View
//             name='root'
//             content={content}
//             style={{
//                 width: 40, height: 20,
//                 cutLeft: 0, cutTop: 0,
//                 left: Transition.ease(111, 422, 5500).loop(),
//                 top: 80,
//             }}
//             events={{
//                 eIndex: 12,
//                 mousemove: function (e) {
//                     console.log(this, e);
//                 },
//             }}
//         >
//             <View
//                 name='c1'
//                 content={content}
//                 style={{
//                     width: 20, height: 20,
//                     cutLeft: 0, cutTop: 0,
//                     left: Transition.ease(111, 422, 5500).loop(),
//                     top: 80,
//                 }}
//             />
//         </View>
//     );

//     window.Sprite_JSX_2 = $app.add({
//         name: 'root',
//         content: {
//             img: img,
//         },
//         style: {
//             width: 40, height: 20,
//             cutLeft: 0, cutTop: 0,
//             left: Transition.ease(111, 422, 6500).loop(),
//             top: 160,
//             opacity: 0.2,
//             rotate: 20,
//             locate: 'center',
//             zIndex: 1,
//         },
//         events: {
//             eIndex: 2,
//             mousemove: function (e) {
//                 console.log(this, e);
//             },
//         },
//     });

//     let top = 100;
//     setInterval(() => {
//         top++;
//     }, 100);

//     window.Sprite_JSX_3 = $app.add(
//         <Image
//             src='https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png'
//             style={{
//                 left: Transition.ease(111, 222, 3500).loop(),
//                 top: 240,
//                 width: 40, height: 20,
//                 cutLeft: 0, cutTop: 0,
//             }}
//             events={{
//                 eIndex: 12,
//                 mousemove: function (e) {
//                     console.log(this, e);
//                 },
//             }}
//         >
//             <Image
//                 src='https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png'
//                 style={{
//                     left: Transition.ease(111, 222, 3500).loop(),
//                     top: 40,
//                     width: 40, height: 20,
//                     cutLeft: 0, cutTop: 0,
//                 }}
//                 events={{
//                     eIndex: 12,
//                     mousemove: function (e) {
//                         console.log(this, e);
//                     },
//                 }}
//             />
//             <Text
//                 text='这里是一段多行文本abcdefg7654321！？：.,?'
//                 style={{
//                     left: Transition.ease(111, 222, 3500).loop(),
//                     top: 40,
//                     width: 240,
//                     color: '#F00',
//                     locate: 'lt',
//                 }}
//             />
//             <Text
//                 style={{
//                     left: Transition.ease(111, 222, 3500).loop(),
//                     top: function () {return this.style.width},
//                     width: 240,
//                     color: '#F00',
//                     locate: 'lt',
//                 }}
//             >
//                 这里是一段多行文本abcdefg1234567！？：.,?
//             </Text>
//         </Image>
//     );
// });

console.log('source');
