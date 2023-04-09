import {
  renderSync,
  ClassJSXElement,
  FragmentJSXElement,
  FunctionJSXElement,
  ObjectJSXElement,
  declareCssVariables,
  createStyleSheet,
} from '@michijs/michijs';
import { themes } from '@storybook/theming';

const cssVariables = declareCssVariables<{
  textColor: string;
  background: string;
}>();

const documentStyle = createStyleSheet({
  body: {
    padding: '0 !important',
    color: cssVariables.textColor.var(),
    backgroundColor: cssVariables.background.var(),
  },
  '.dark': {
    [cssVariables.textColor]: themes['dark'].textColor!,
    [cssVariables.background]: themes['dark'].appBg!,
  },
  '.light': {
    [cssVariables.textColor]: themes['light'].textColor!,
    [cssVariables.background]: themes['light'].appBg!,
  },
  '#storybook-root': {
    display: 'contents',
  },
});

document.adoptedStyleSheets = [...document.adoptedStyleSheets, documentStyle];

interface Options {
  overwriteJSX?: JSX.Element;
}

export function bind(Story: JSX.Element, options?: Options) {
  const typedJSXElement = Story as
    | ObjectJSXElement
    | FunctionJSXElement
    | FragmentJSXElement
    | ClassJSXElement;
  const auxFunction = (attrs) => {
    typedJSXElement.attrs = { ...typedJSXElement.attrs, ...attrs };

    const fragment = document.createDocumentFragment();
    renderSync(options?.overwriteJSX ?? Story, fragment);
    return fragment;
  };
  const templateBind = auxFunction.bind({});
  const { children, ...attrsWithoutChildren } = typedJSXElement.attrs;
  (
    templateBind as typeof templateBind & { args: typeof attrsWithoutChildren }
  ).args = attrsWithoutChildren ?? {};
  return templateBind;
}
