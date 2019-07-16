import path from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  },
  //TODO: generate maps
  devtool: 'source-map',
  entry: {
    main: path.resolve(__dirname, 'src/index'),
    vendor: ['whatwg-fetch']
  },
  target: 'web',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js"
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin(),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
        canPrint: true
      })
    ],
    splitChunks: {
      cacheGroups: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all'
      }
    }
  },
  plugins: [
    // Create HTML file that includes reference to bundled JS
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].css",
      chunkFilename: "[name].[chunkhash].css"
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
}
