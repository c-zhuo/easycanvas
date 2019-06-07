import Easycanvas, { Image } from 'easycanvas';

class HelloWorld {
    constructor (props) {
        return <Image
            src="https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png"
            style={{
                top: 400,
                left: '50%',
                width: 40,
                height: 40
            }}
            events={{
                click: props.onclick
            }}
        />;
    }
}

export default HelloWorld;
