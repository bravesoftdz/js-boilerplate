import path from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  },
  devtool: 'source-map',
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true
    })
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
            {loader: "style-loader"},
            {loader: "css-loader"}
          ]
      }
    ]
  }
}
