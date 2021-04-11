const exampleBox1Name = 'transform2dexample';
const exampleBox2Name = 'transformOriginExample';
const exampleBox3Name = 'multiTransformExample';

const transitionExampleBoxBlue = 'transitionExampleBoxBlue';
const animationExampleBox = 'animationExampleBox';

const NONE = 'none';

const transformExample = (transform: string) => components.ExampleBox.UpdateTransform(transform, exampleBox1Name);
const originExample = (origin: string) => components.ExampleBox.UpdateOrigin(origin, exampleBox2Name);
const multipleTransformExample = (transform: string) => {
  const item = components.DisplayValue.get(exampleBox3Name);
  const oldTransform = item?.value;
  const newTransform = transform === NONE || oldTransform === NONE ?
    transform : `${item?.value} ${transform}`;
  components.ExampleBox.UpdateTransform(newTransform, exampleBox3Name);
  item!.value = newTransform;
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

  hideExampleElement?.addEventListener('click', () => {
    hideExampleElement?.classList.toggle('hidden');
  });

  animationEndExampleElement?.addEventListener('click', () => {
    animationEndExampleElement?.classList.add('animated');
  });
  animationEndExampleElement?.addEventListener('animationend', () => {
    animationEndExampleElement?.classList.remove('animated');
    alert('Animation ended')
  });
}
