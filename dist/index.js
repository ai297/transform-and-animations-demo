"use strict";
const exampleBox1Name = 'transform2dexample';
const exampleBox2Name = 'transformOriginExample';
const exampleBox3Name = 'multiTransformExample';
const NONE = 'none';
const transformExample = (transform) => components.ExampleBox.UpdateTransform(transform, exampleBox1Name);
const originExample = (origin) => components.ExampleBox.UpdateOrigin(origin, exampleBox2Name);
const multipleTransformExample = (transform) => {
    console.log(transform);
    const item = components.DisplayValue.get(exampleBox3Name);
    const oldTransform = item === null || item === void 0 ? void 0 : item.value;
    const newTransform = transform === NONE || oldTransform === NONE ?
        transform : `${item === null || item === void 0 ? void 0 : item.value} ${transform}`;
    components.ExampleBox.UpdateTransform(newTransform, exampleBox3Name);
    item.value = newTransform;
};
components.CommandButton.Commands
    .set('transformExample', (param = NONE) => transformExample(param))
    .set('originExample', (param = 'center') => originExample(param))
    .set('multiTransformExample', (param = NONE) => multipleTransformExample(param))
    .set('default', () => {
    transformExample(NONE);
    originExample('center');
    multipleTransformExample(NONE);
});
components.registerAll();
