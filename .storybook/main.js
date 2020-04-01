const { resolve } = require('path')

module.exports = {
  stories: ['../stories/**/*.stories.js'],
  addons: [
    '@storybook/react',
    '@storybook/addon-links/register',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
      },
    },
    '@storybook/addon-actions/register', 
    '@storybook/addon-knobs/register',

  ],
  webpackFinal: async config => {
    // do mutation to the config

    return config;
  },
};
