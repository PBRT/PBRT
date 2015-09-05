module.exports = {
  entry: './client/app.jsx',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel'},
      { test: /\.js?$/, loader: 'babel', exclude: /(node_modules)/ },
      { test: /\.(js|jsx)$/, loader: 'eslint-loader', exclude: /node_modules/},
      { test: /\.css$/, loader: 'style!css' }
    ]
  }
};
