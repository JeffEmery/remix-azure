module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  ignore: [/node_modules/],
  assumptions: {
    enumerableModuleMeta: false,
  },
  plugins: [
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-optional-chaining',
    // [
    //   '@babel/plugin-transform-modules-commonjs',
    //   {
    //     importInterop: 'node',
    //     loose: false,
    //     strict: false,
    //   },
    // ],
    ...(process.env.NODE_ENV === 'production'
      ? [
          [
            'transform-remove-console',
            { exclude: ['error', 'warn', 'log', 'info'] },
          ],
        ]
      : []),
  ],
}
