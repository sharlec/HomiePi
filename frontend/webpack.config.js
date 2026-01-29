const path = require("path");
const webpack = require("webpack");


module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "../backend/web/static/web"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },

        {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify("development"),
      },
    }),
  ],
};
