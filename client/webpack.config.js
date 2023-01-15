const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const path = require('path')
const { InjectManifest } = require('workbox-webpack-plugin')

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    //bundle output
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    // adding plugins
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'jate'
      }),
      //injecting service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: './src-sw.js'
      }),
      //creating manifest.json
      new WebpackPwaManifest({
        fingerprints: false,
        name: 'text-editor',
        short_name: 'jate',
        description: 'just another text editor',
        background_color: '#ececec',
        theme_color: '#31a9e1',
        start_url: './',
        publicPath: './',
        icons: [
          {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons') 
          }
        ]
      })
    ],

    //adding css loaders
    module: {
      rules: [  
        {
          test: /\.css$/i,
          use:['style-loader', 'css-loader']
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          //adding babel-loader
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime']
            }
          }
        }
      ],
    },
  }
}
