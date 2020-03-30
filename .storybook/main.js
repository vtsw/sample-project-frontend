module.exports = {
  stories: ['../stories/**/*.stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/react'],
  webpackFinal: async config => {
    // do mutation to the config

    return config;
  },
};
