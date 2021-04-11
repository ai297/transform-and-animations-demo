"use strict";
const exampleBox1Name = 'transform2dexample';
const exampleBox2Name = 'transformOriginExample';
const exampleBox3Name = 'multiTransformExample';
const transitionExampleBoxBlue = 'transitionExampleBoxBlue';
const animationExampleBox = 'animationExampleBox';
const NONE = 'none';
const transformExample = (transform) => components.ExampleBox.UpdateTransform(transform, exampleBox1Name);
const originExample = (origin) => components.ExampleBox.UpdateOrigin(origin, exampleBox2Name);
const multipleTransformExample = (transform) => {
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
window.onload = () => {
    const hideExampleElement = components.ExampleBox.get(transitionExampleBoxBlue);
    const animationEndExampleElement = components.ExampleBox.get(animationExampleBox);
    hideExampleElement === null || hideExampleElement === void 0 ? void 0 : hideExampleElement.addEventListener('click', () => {
        hideExampleElement === null || hideExampleElement === void 0 ? void 0 : hideExampleElement.classList.toggle('hidden');
    });
    animationEndExampleElement === null || animationEndExampleElement === void 0 ? void 0 : animationEndExampleElement.addEventListener('click', () => {
        animationEndExampleElement === null || animationEndExampleElement === void 0 ? void 0 : animationEndExampleElement.classList.add('animated');
    });
    animationEndExampleElement === null || animationEndExampleElement === void 0 ? void 0 : animationEndExampleElement.addEventListener('animationend', () => {
        animationEndExampleElement === null || animationEndExampleElement === void 0 ? void 0 : animationEndExampleElement.classList.remove('animated');
        alert('Animation ended');
    });
};
