const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = (env) => ({
  name: 'client webpack config',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  entry: './client/index.jsx',
  target: 'web',
  mode: env.production ? 'production' : 'development',
  devtool: env.production ? 'source-map' : 'inline-source-map',
  devServer: {
    static: './dist',
    compress: true,
    port: 3003,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/assets/index.html',
    }),
    new webpack.EnvironmentPlugin({
      REACT_APP_BACKEND_URL: null
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
})
