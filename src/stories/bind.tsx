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
  storybookTextColor: string;
  storybookBackground: string;
}>();

const documentStyle = createStyleSheet({
  body: {
    padding: '0 !important',
    color: cssVariables.storybookTextColor.var(),
    backgroundColor: cssVariables.storybookBackground.var(),
  },
  '.dark': {
    [cssVariables.storybookTextColor]: themes['dark'].textColor!,
    [cssVariables.storybookBackground]: themes['dark'].appBg!,
  },
  '.light': {
    [cssVariables.storybookTextColor]: themes['light'].textColor!,
    [cssVariables.storybookBackground]: themes['light'].appBg!,
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
