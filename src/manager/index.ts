import { themes } from '@storybook/theming';
import { STORY_RENDERED, DOCS_RENDERED } from '@storybook/core-events';
import { API } from '@storybook/api/dist/ts3.9/index'
import { Config } from '@storybook/addons';

const storageTheme = localStorage.getItem('theme') || 'light';

const michijsThemeListener = {
  name: '@michijs/theme-listener',
  config: {
    theme: themes[storageTheme],
  } as Config,
  registerCallback: (api: API) => {
    const channel = api.getChannel();
    channel.on(STORY_RENDERED, () => {
      const newStorageTheme = localStorage.getItem('theme') || 'light';
      api.setOptions({
        theme: themes[newStorageTheme],
      });
    });
    channel.on(DOCS_RENDERED, () => {
      const newStorageTheme = localStorage.getItem('theme') || 'light';
      api.setOptions({
        theme: themes[newStorageTheme],
      });
    });
  }
}

export const manager = {
  michijsThemeListener
}