import Easycanvas from 'src/index.js';
import Loader from 'src/loader.js';

const result = [];

const loader = {
    callback: (u, code) => {
        result.push(code);
    }
};

const codeFormat = (str) => {
    str = str.replace(/\ \ \ \ /g, '');

    if (str[0] === '\n') str = str.substr(1);
    if (str.substr(-1) === '\n') str = str.substr(0, str.length - 1);

    return str;
};

const compareCode = (a, b) => {
    return codeFormat(a) === codeFormat(b);
};

Loader.call(loader, `
    const content = {
        img: './abc.png'
    };

    const a = $app.add(
        <Sprite
            name='p1'
            content={content}
            style={{
                width: 40, height: 20,
                cutLeft: 0, cutTop: 0,
                left: Easycanvas.transition.ease(111, 422, 5500).loop(),
                top: 80,
            }}
        >
            <Sprite
                name='c1'
                content={content}
                style={{
                    width: 20, height: 20,
                    cutLeft: 0, cutTop: 0,
                    left: Easycanvas.transition.ease(111, 422, 5500).loop(),
                    top: 80,
                }}
            />
        </Sprite>
    );
`);

describe('Featrue.add Test.', function () {
    it('JSX transformed to JS correctly.', function (done) {
        expect(compareCode(result[0].replace(/ /g, ''), `
            const content = {
                img: "./abc.png"
            };
            
            const a = $app.add(new Sprite(Easycanvas.sprite, {
                name: "p1",
                content: content,
            
                style: {
                    width: 40,
                    height: 20,
                    cutLeft: 0,
                    cutTop: 0,
                    left: Easycanvas.transition.ease(111, 422, 5500).loop(),
                    top: 80
                },
            
                children: [new Sprite(Easycanvas.sprite, {
                    name: "c1",
                    content: content,
            
                    style: {
                        width: 20,
                        height: 20,
                        cutLeft: 0,
                        cutTop: 0,
                        left: Easycanvas.transition.ease(111, 422, 5500).loop(),
                        top: 80
                    }
                })]
            }));
        `.replace(/ /g, ''))).toBe(true);
        done();
    });
});
