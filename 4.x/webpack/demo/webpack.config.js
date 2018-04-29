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
    publicPath: "",
    libraryTarget: "amd"
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
      // file-loader appears to be needed for calcite-web sass
      // and was previously installed/configured by @arcgis/webpack-plugin:
      // https://github.com/Esri/arcgis-webpack-plugin/blob/50a3e9148c6207e78233af22e13530b804bc56f3/index.js#L110-L119
      // but after removing that plugin, we have to and configure here
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
      // index.html includes a <script> that will require() the app's bundle(s)
      // after the ArcGIS API <script> has loaded, so don't inject it here
      inject: false
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
  externals: [
    (context, request, callback) => {
      // exclude any esri or dojo modules from the bundle
      // these are included in the ArcGIS API for JavaScript
      // and its Dojo loader will pull them from its own build output
      if (/^dojo/.test(request) ||
          /^dojox/.test(request) ||
          /^dijit/.test(request) ||
          /^esri/.test(request)
      ) {
          return callback(null, 'amd ' + request);
      }
      callback();
    }
  ],
  node: {
    process: false,
    global: false
  }
};
