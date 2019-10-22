const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const devConfig = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname , '/dist'),
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
    },
    {
      test: /\.s[ac]ss$/i,
      use:[
        'style-loader', 'css-loader', 'sass-loader'
      ]
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
    }),
    new webpack.DefinePlugin({
      FIREBASE_API_KEY:JSON.stringify(process.env.FIREBASE_API_KEY),
      FIREBASE_AUTH_DOMAIN:JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
      FIREBASE_PROJECT_ID:JSON.stringify(process.env.FIREBASE_PROJECT_ID),
      FIREBASE_DATA_SET_URL:JSON.stringify(process.env.FIREBASE_DATA_SET_URL),
      FIREBASE_STORAGE_BUCKET:JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
      FIREBASE_MESSAGING_SENDER_ID:JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
      FIREBASE_APP_ID:JSON.stringify(process.env.FIREBASE_APP_ID),
    })
  ],
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  },
  devtool: 'source-map',
  devServer: {
    open:false,
    contentBase: path.join('/'),
    inline: true,
    historyApiFallback: true,
    hot: true,
    host: '0.0.0.0',
    port: 8080,
  }
};

module.exports = devConfig;