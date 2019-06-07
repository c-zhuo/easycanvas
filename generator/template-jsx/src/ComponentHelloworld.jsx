import Easycanvas, { Transition, View, Text } from 'easycanvas';

class HelloWorld {
    constructor (props) {
        const HelloWorld = 'Hello World';
        const Size = props.width * 0.05;

        return <View name="root-element">
            {
                HelloWorld.split('').map((word, index) => {
                    return <Text
                        style={{
                            left: props.width * (0.2 + index * 0.05),
                            top: Transition.pendulum(120, 240, 3000, {
                                start: index * 60
                            }).loop(),
                            rotate: Transition.pendulum(-20, 20, 3000, {
                                start: index * 60
                            }).loop(),
                            width: Size,
                            height: Size,
                            color: '#F00',
                            locate: 'lt',
                            fontSize: Size,
                        }}
                        events={{
                            mousemove: this.onWordClick
                        }}
                    >{word}</Text>
                })
            }
        </View>;
    }

    onWordClick () {
        this.style.color = '#0F0';
    }
}

export default HelloWorld;
