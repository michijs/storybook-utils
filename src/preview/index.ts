import { themes } from "@storybook/theming";
import { ToolbarArgType } from '@storybook/addon-toolbars/dist/ts3.9/types';

type GlobalTypes = Record<string, Partial<ToolbarArgType>>;

const storageTheme = localStorage.getItem('theme') || 'light';

const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  docs: {
    theme: themes[storageTheme],
  },
}

const decorator = (Story: () => Element, context) => {
  const theme = context.globals.theme;
  localStorage.setItem('theme', theme);
  return Story();
};

const globalTypes: GlobalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: storageTheme,
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
    },
  },
}

export const preview = {
  parameters,
  globalTypes,
  decorator
}