const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: 'c:/www/cute_avatar',
    }),
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      exclude: /node_modules/,
      parallel: true,
      uglifyOptions: {
        output: {
          comments: false,
          beautify: false,
        },
        compress: {
          drop_console: true,
        },
      },
    }),
  ],
})

module.exports = webpackConfig
