module.exports = api => {
  const babelEnv = api.env();
  const plugins = ['react-native-reanimated/plugin'];
  plugins.push([
    'module-resolver',
    {
      root: ['./src'],
      extensions: [
        '.ios.js',
        '.android.js',
        '.js',
        '.ts',
        '.jsx',
        '.tsx',
        '.json',
      ],
      alias: {
        assets: './src/assets',
        components: './src/components',
        hooks: './src/hooks',
        api: './src/api',
        lib: './src/lib',
        routes: './src/routes',
        screens: './src/screens',
        types: './src/types',
      },
    },
  ]);
  if (babelEnv !== 'development') {
    plugins.push(['transform-remove-console', {exclude: ['error', 'warn']}]);
  }

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins,
  };
};
