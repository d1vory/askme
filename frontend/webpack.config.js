module.exports = {
  entry:  [ './src/index.js'],
  output:  {
      path: `${__dirname}/frontend/static/frontend`,
      filename: 'main.js'
  },
  resolve: {
      extensions: [ '.js', '.jsx', '.scss']

  },
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          query: {
           presets: ["@babel/preset-env", "@babel/react"],
           plugins: ["@babel/plugin-transform-runtime","@babel/plugin-proposal-class-properties"]
         }
        }

      },

      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
        {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      }
    ]
  }
};
