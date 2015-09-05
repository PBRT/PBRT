// External libs
var Webpack = require('webpack');

// Put React as a global variable
var providePlugin = new Webpack.ProvidePlugin({
  'React': 'react',
  $: 'jquery',
  '_': 'underscore',
});

var config = {
  entry: './client/app.jsx',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel'},
      { test: /\.js?$/, loader: 'babel', exclude: /(node_modules)/ },
      { test: /\.jsx?$/, loader: 'eslint-loader', exclude: /node_modules/},
      { test: /\.css$/, loader: 'style!css' }
    ]
  },
  plugins: [
    providePlugin,
  ],
};

module.exports = config;
