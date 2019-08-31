/** ********** *
 *
 * Accept JSX
 * - TODO: Separate, https://webpack.js.org/contribute/writing-a-loader/#peer-dependencies.
 *
 * ********** **/

const recast = require("recast");
const babelParser = require('@babel/parser');
const builders = recast.types.builders;

const JSXElement = 'JSXElement';
const JSXText = 'JSXText';
const JSXExpressionContainer = 'JSXExpressionContainer';

const FindingType = ['body', 'expression', 'right', 'declarations', 'init', 'arguments', 'argument'];

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
        const transformChildren = [];

        node.children.forEach((child) => {
            if (child.type === JSXElement) {
                transformChildren.push(JSXElementNode2Sprite(child));
            } else if (child.type === JSXExpressionContainer) {
                let innerExpression = child.expression;

                // 对于jsx中的{}，可能内部仍然存在JSXElement
                astWalker(innerExpression, node => {
                    return node.type === JSXElement;
                }, JSXElementNode2Sprite);

                transformChildren.push(innerExpression);
            } else if (child.type === JSXText && child.extra.raw && String.prototype.trim.call(child.extra.raw)) {
                // move JSXText to text, avoid '\n'
                transformChildren.push(builders.literal(
                    childrenJSXText.map(child => String.prototype.trim.call(child.extra.raw)).join('\n')
                ));
            }
        });

        attrMap.push(
            builders.property('init',
                builders.identifier('children'),
                builders.arrayExpression(
                    transformChildren
                )
            )
        );

        // 下面是旧的实现，会导致一个children内部同时含有childrenJSXElement和childrenJSXExpressionContainer时，前者被后者覆盖掉

        // // avoid JSXText, such as '\n'
        // let childrenJSXElement = node.children.filter(child => child.type === JSXElement);
        // if (childrenJSXElement.length) {
        //     attrMap.push(
        //         builders.property('init',
        //             builders.identifier('children'),
        //             builders.arrayExpression(
        //                 childrenJSXElement.map(JSXElementNode2Sprite)
        //             )
        //         )
        //     );
        // }

        // let childrenJSXExpressionContainer = node.children.filter(child => child.type === JSXExpressionContainer);
        // if (childrenJSXExpressionContainer.length) {
        //     let innerExpression = childrenJSXExpressionContainer[0].expression;
        //     // 对于jsx中的{}，可能内部仍然存在JSXElement
        //     astWalker(innerExpression, node => {
        //         return node.type === JSXElement;
        //     }, JSXElementNode2Sprite);
        //     attrMap.push(
        //         builders.property('init',
        //             builders.identifier('children'),
        //             innerExpression
        //         )
        //     );
        // }

        // // move JSXText to text, avoid '\n'
        // // update：使用acorn时raw在child一级属性下，babel里在child.extra里
        // // let childrenJSXText = node.children.filter(child => child.type === JSXText && child.raw && String.prototype.trim.call(child.raw));
        // let childrenJSXText = node.children.filter(child => child.type === JSXText && child.extra.raw && String.prototype.trim.call(child.extra.raw));
        // if (childrenJSXText.length) {
        //     attrMap.push(
        //         builders.property('init',
        //             builders.identifier('text'),
        //             builders.literal(
        //                 childrenJSXText.map(child => String.prototype.trim.call(child.extra.raw)).join('\n')
        //             )
        //         )
        //     );
        // }
    }

    const objectExpression = builders.objectExpression(attrMap);

    // with new:
    let result = builders.newExpression(builders.identifier(spriteType), [objectExpression, builders.identifier('Easycanvas')]);
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
            "dynamicImport",
            "classProperties",
            // 'estree', // is Miscellaneous, not extensions or proposals
            'doExpressions',
            'objectRestSpread',
            'decorators-legacy',
            'classProperties',
            'classPrivateProperties',
            'classPrivateMethods',
            'exportDefaultFrom',
            'exportNamespaceFrom',
            'asyncGenerators',
            'functionBind',
            'functionSent',
            'dynamicImport',
            'numericSeparator',
            'optionalChaining',
            'importMeta',
            'bigInt',
            'optionalCatchBinding',
            'throwExpressions',
            'nullishCoalescingOperator'
        ]
    }).program;

    let hasJSX = false; // 没有JSX时，不做任何处理，确保内容完全不受影响

    astWalker(parsedSource, node => {
        return node.type === JSXElement && (hasJSX = true);
    }, JSXElementNode2Sprite);

    return hasJSX ? recast.print(parsedSource).code : source;
};

const loader = function (source, inputSourceMap) {
    const parsedSource = transformer(source);

    this.callback(null, parsedSource, inputSourceMap);
};

const inBrowser = typeof window !== 'undefined';

if (inBrowser) {
    window.EasycanvasJSXTransformer = transformer;
}

module.exports = loader;
