const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const devConfig = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname , 'dist'),
    publicPath: '/',
    filename: "bundle-dev.js",
  },
  module: {
    rules: [
      {
      test: /\.js$/,
      include: [ path.resolve(__dirname, 'src') ],
      exclude: /node_modules/,
      use:{ loader: 'babel-loader' }
    },
    {
      test:/\.html$/,
      use:[{ loader:"html-loader" }]
    },
    {
      test:/\.css$/,
      use:[ MiniCssExtractPlugin.loader,'css-loader']
    }
  ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename:'[id].css'
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ],
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  },
  devtool: 'source-map',
  devServer: {
    open:false,
    contentBase: path.join('/dist/'),
    inline: true,
    hot: true,
    host: '0.0.0.0',
    port: 8080,
  }
};

module.exports = devConfig;