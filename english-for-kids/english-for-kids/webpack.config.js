const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
/*var ghpages = require('gh-pages');
ghpages.publish('dist', {
  dest: 'english-for-kids',
  function(err) {console.error(err);}
});*/

module.exports = {
  mode:  'production',
  //mode: 'development',

  entry: './src/app.ts',
  module: {
    rules: [
        { test: /\.(png|jpe?g|gif|svg|mp3)$/i, type: 'asset/resource' },
        { test: /\.(woff(2)?|eot|ttf|otf)$/i, type: 'asset/resource' },
        { test: /\.html$/i, loader: 'html-loader' },
        //{ test: /\.svg$/, use: 'svg-inline-loader' },
        { test: /\.s[ac]ss$/i, use: ["style-loader", "css-loader", "sass-loader"] },
        { test: /\.ts$/, exclude: /node_modules/, use: 'ts-loader' },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    open: true,
    hot: true,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({template: 'src/index.html'}),
    new ESLintPlugin({ extensions: ['ts', 'js'] }),
    new CopyPlugin({patterns: [{ from: 'public' },] }),
  ]
} 