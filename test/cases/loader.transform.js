import { transformSync } from "@babel/core";
import babelPlugin  from '../../src/babel-loader';
import preset from '@babel/preset-env';

const codeFormat = (str) => {
    str = str.replace(/\ \ /g, '');

    if (str[0] === '\n') str = str.substr(1);
    if (str.substr(-1) === '\n') str = str.substr(0, str.length - 1);

    return str;
};

const compareCode = (a, b) => {
    return codeFormat(a) === codeFormat(b);
};

const Code = `
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
                left: Easycanvas.Transition.ease(111, 422, 5500).loop(),
                top: 80,
            }}
        >
            <Sprite
                name='c1'
                content={content}
                style={{
                    width: 20, height: 20,
                    cutLeft: 0, cutTop: 0,
                    left: Easycanvas.Transition.ease(111, 422, 5500).loop(),
                    top: 80,
                }}
            />
        </Sprite>
    );
`;

const result = transformSync(Code, {
    presets: [preset],
    plugins: [
        babelPlugin
    ]
}).code;

describe('Featrue.add Test.', function () {
    it('JSX transformed to JS correctly.', function (done) {
        expect(compareCode(result, `
            "use strict";

            var content = {
            img: './abc.png'
            };
            var a = $app.add(Easycanvas.createElement(Sprite, {
            name: "p1",
            content: content,
            style: {
                width: 40,
                height: 20,
                cutLeft: 0,
                cutTop: 0,
                left: Easycanvas.Transition.ease(111, 422, 5500).loop(),
                top: 80
            }
            }, Easycanvas.createElement(Sprite, {
            name: "c1",
            content: content,
            style: {
                width: 20,
                height: 20,
                cutLeft: 0,
                cutTop: 0,
                left: Easycanvas.Transition.ease(111, 422, 5500).loop(),
                top: 80
            }
            })));
        `)).toBe(true);
        done();
    });
});
