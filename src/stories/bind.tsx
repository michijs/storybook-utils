import { renderSync, ClassJSXElement, FragmentJSXElement, FunctionJSXElement, ObjectJSXElement, css, updateStyleSheet, declareCssVariables, createStyleSheet } from "@michijs/michijs";
import { themes } from '@storybook/theming';

export const cssVariables = declareCssVariables<{
  michijsStorybookTextColor: string,
  michijsStorybookBackground: string
}>()

export const documentStyle = css`
  body {
    padding: 0 !important;
  }
  html,
  body,
  #root-inner,
  #root {
    height: 100%;
    margin: 0;
    color: ${cssVariables.michijsStorybookTextColor.var()};
    background-color: ${cssVariables.michijsStorybookBackground.var()}; 
  }
  .container {
    display: contents
  }
`

export const themeStyle = createStyleSheet({
  '#root': {
    [cssVariables.michijsStorybookTextColor]: themes['light'].textColor,
    [cssVariables.michijsStorybookBackground]: themes['light'].appBg
  }
})

document.adoptedStyleSheets = [...document.adoptedStyleSheets, documentStyle]

export function bind(Story: JSX.Element) {
  const typedJSXElement = Story as ObjectJSXElement | FunctionJSXElement | FragmentJSXElement | ClassJSXElement;
  const auxFunction = (attrs, { globals }) => {
    const { theme, backgrounds } = globals as {
      theme: 'dark' | 'light', backgrounds?: {
        value: '#F8F8F8' | '#333333' | 'transparent'
      }
    };
    const storyTheme = backgrounds?.value && backgrounds?.value !== 'transparent' ? (backgrounds.value === '#333333' ? 'dark' : 'light') : undefined;
    const finalTheme = storyTheme ?? theme;
    updateStyleSheet(themeStyle, {
      '#root': {
        [cssVariables.michijsStorybookTextColor]: themes[finalTheme].textColor,
        [cssVariables.michijsStorybookBackground]: themes[finalTheme].appBg
      }
    })

    typedJSXElement.attrs = { ...typedJSXElement.attrs, ...attrs }

    const fragment = document.createElement('div');
    fragment.className = 'container'
    renderSync(Story, fragment);
    return fragment;
  };
  const templateBind = auxFunction.bind({});
  (templateBind as typeof templateBind & { args: typeof typedJSXElement.attrs }).args = typedJSXElement.attrs ?? {};
  return templateBind;
}