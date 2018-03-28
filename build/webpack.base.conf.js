const path = require('path')

const templatePath = path.resolve(__dirname, '../src/template')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '../', dir)
}

module.exports = {
  entry: {
    main: resolve('src/main.js'),
    vendor: ['vue', 'vue-router', 'jquery', resolve('lib/mui/js/mui.min.js'), resolve('lib/mui/css/mui.min.css')],
  },
  output: {
    path: resolve('dist'),
    filename: 'js/[name]-[hash].bundle.js',
  },
  resolve: {
    extensions: ['*', '.vue', '.js', '.css', '.json', '.png', '.gif', '.jpg'],
    alias: {
      '@': resolve('src'),
      vue$: 'vue/dist/vue.esm.js',
      Lib: resolve('lib'),
      Views: resolve('src/views'),
      Components: resolve('src/components'),
      JSCommon: resolve('src/js'),
      Images: resolve('src/images'),
      Css: resolve('src/css'),
      NodeModules: resolve('node_modules'),
    },
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader',
          },
        ],
        exclude: /node_modules/,
        // query: {
        //   ignore: [resolve('lib/mui/js/mui.min.js')],
        // },
        // query: {
        // presets: ['es2015'],
        // ignore: [resolve('lib/mui/js/mui.min.js')],
        // }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
        ],
        // loader: ExtractTextPlugin.extract({
        // fallback: "style-loader",
        // use: "css-loader",
        // publicPath: './'
        // })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader?limit=50000&name=images/[hash:8].[name].[ext]',
      },
      {
        test: /\.(eot|ttf)$/,
        loader: 'file-loader?name=fonts/[hash:8].[name].[ext]',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `${templatePath}/index/index.html`,
      chunks: ['vendor', 'main'],
    }),
    new CommonsChunkPlugin({
      name: 'vendor',
    }),
  ],
}
