const recast = require("recast");
const acorn = require("acorn");
// const jsx = require("acorn-jsx");
// const jsxParser = acorn.Parser.extend(jsx());
const babelParser = require('@babel/parser');
const builders = recast.types.builders;

const JSXElement = 'JSXElement';
const JSXText = 'JSXText';
const JSXExpressionContainer = 'JSXExpressionContainer';

const FindingType = ['body', 'expression', 'right', 'declarations', 'init'];

const astWalker = function (structure, checker, handle) {
    if (!structure) return;

    if (checker(structure)) {
        return handle(structure);
    }

    if (Array.isArray(structure)) {
        structure.forEach((child, i) => {
            let result = astWalker(child, checker, handle);
            result && (structure[i] = result);
        });
        return;
    }

    FindingType.forEach((key) => {
        let result = astWalker(structure[key], checker, handle);
        result && (structure[key] = result);
    });

    astWalker(structure.arguments, checker, handle);
};

// console.log(jsxParser.parse('<a b={{c: d, e: {f} }} />').body[0].expression.openingElement.attributes[0].value.expression.properties[0])

const JSXElementNode2Sprite = node => {
    const attrMap = node.openingElement.attributes.map(attr => {
        // console.log('attr')
        // console.log(attr)

        let res = builders.property(
            'init',
            attr.name,
            attr.value.type === JSXExpressionContainer ?
                // Expression {{x: 1}} => Object {x: 1}
                attr.value.expression : attr.value
        );

        return res;
    });

    const spriteType = node.openingElement.name.name;

    if (node.children) {
        // avoid JSXText, such as '\n'
        let children = node.children.filter(child => child.type === JSXElement);
        if (children.length) {
            attrMap.push(
                builders.property('init',
                    builders.identifier('children'),
                    builders.arrayExpression(
                        children.map(JSXElementNode2Sprite)
                    )
                )
            );
        }

        // move JSXText to text, avoid '\n'
        // update：使用acorn时raw在child一级属性下，babel里在child.extra里
        // let childrenJSXText = node.children.filter(child => child.type === JSXText && child.raw && String.prototype.trim.call(child.raw));
        let childrenJSXText = node.children.filter(child => child.type === JSXText && child.extra.raw && String.prototype.trim.call(child.extra.raw));
        if (childrenJSXText.length) {
            attrMap.push(
                builders.property('init',
                    builders.identifier('text'),
                    builders.literal(
                        childrenJSXText.map(child => String.prototype.trim.call(child.extra.raw)).join('\n')
                    )
                )
            );
        }
    }

    const objectExpression = builders.objectExpression(attrMap);

    // with new:
    let result = builders.newExpression(builders.identifier(spriteType), [builders.identifier('Easycanvas.sprite'), objectExpression]);
    // without new:
    // let result = builders.callExpression(builders.identifier(spriteType), [objectExpression]);

    return result;
};

const transformer = (source) => {
    // const parsedSource = jsxParser.parse(source, {
    //     sourceType: 'module'
    // });
    const parsedSource = babelParser.parse(source, {
        sourceType: 'module',
        plugins: [
            // enable jsx and flow syntax
            "jsx",
            "typescript",
            "dynamicImport"
        ]
    }).program;

    let hasJSX = false; // 没有JSX时，不做任何处理，确保空格等内容完全不受影响

    astWalker(parsedSource, node => {
        return node.type === JSXElement && (hasJSX = true);
    }, JSXElementNode2Sprite);

    return hasJSX ? recast.print(parsedSource).code : source;
};

const loader = function (source, inputSourceMap) {
    const parsedSource = transformer(source);

    // console.log('source');
    // console.log(source);

    this.callback(null, parsedSource, inputSourceMap);
};

const inBrowser = typeof window !== 'undefined';

if (inBrowser) {
    window.EasycanvasJSXTransformer = transformer;
}

module.exports = loader;
