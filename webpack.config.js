var config = {

  devtool: 'eval',
  debug: true,
  watch: true,

  output: {
    filename: 'bundle.js'
  },

  module: {
    loaders: [

      /* ES6 + JSX */
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: [
          'jsx-loader?insertPragma=React.DOM&harmony&harmony', 
          'babel?stage=0&optional[]=runtime&loose=all&cacheDirectory'
        ]
      },

      /* Static Assets */
      {
        test: /\.(png|jpg|eot|woff|woff2|ttf|svg)$/, 
        loader: 'url-loader?limit=8192'
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
  }
  
}


module.exports = config;