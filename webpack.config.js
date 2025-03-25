const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env = {}) => {
  const isStatic = env.static === 'true' || env.static === true;
  
  return {
    mode: 'development',
    entry: './src/renderer/index.tsx',
    target: isStatic ? 'web' : 'electron-renderer',
    devtool: 'inline-source-map',
    devServer: {
      static: path.join(__dirname, 'dist'),
      port: 9000
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'renderer.js'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|svg|jpg|gif|mp3|wav)$/,
          use: ['file-loader'],
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/renderer/index.html')
      })
    ]
  };
}; 