const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin")

const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    index: "./src/index.tsx"
  },
  output: {
    filename: "[name].bundle.js",
    publicPath: ""
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: false }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      // this appears to be needed for calcite-web sass
      // and was previously handled by @arcgis/webpack-plugin:
      // https://github.com/Esri/arcgis-webpack-plugin/blob/50a3e9148c6207e78233af22e13530b804bc56f3/index.js#L110-L119
      // so have to install file-loader and configre here after removing that plugin
      {
        test: /.(wsv|ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "build/[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      chunksSortMode: "none"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    // compress assets so that they can be served as gzip files
    new CompressionPlugin()
  ],
  resolve: {
    modules: [path.resolve(__dirname, "/src"), "node_modules/"],
    extensions: [".ts", ".tsx", ".js", ".scss"]
  },
  node: {
    process: false,
    global: false
  }
};
