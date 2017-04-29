const extract = require('extract-text-webpack-plugin');

const extractSass = new extract({
  filename: "test.css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: './dep/main.js',
  output: {
    filename: 'test.js',
    path: './'
  },
  module: {
    rules: [{
      test: [/\.scss$/, /\.css$/],
      use: extractSass.extract({
        use: [{
          loader: "css-loader",
          options: { sourceMap: true }
        }, {
          loader: "sass-loader",
          options: { sourceMap: true }
        }],
        fallback: "style-loader"
      })
    }]
  },
  plugins: [ extractSass ]
};
