"use strict";

var path         = require("path");
var webpack      = require("webpack");
// var HtmlWebpackPlugin = require("html-webpack-plugin");
var definePlugin = new webpack.DefinePlugin({
	__DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
	__PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});
module.exports   = {
	devtool: "eval-source-map",
	entry: {
		main: "./react-ui/main.jsx"
	},
	output: {
		path: __dirname + "/public/js",
		filename: "[name].js"
	}
	,
	plugins: [
		definePlugin
	],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: "babel-loader",
				exclude: /(node_modules|bower_components)/,
				query: {
					presets: ["react", "es2015", "stage-2"],
					plugins: ["react-html-attrs", "transform-class-properties", "transform-decorators-legacy"]
				}
			},
			{
				test: /\.js?$/,
				loader: "babel-loader",
				exclude: /(node_modules|bower_components)/,
				query: {
					presets: ["react", "es2015", "stage-2"],
					plugins: ["react-html-attrs", "transform-class-properties", "transform-decorators-legacy"]
				}
			}
			, {
				test: /\.css$/,
				loader: "style-loader!css-loader"
			}
			, {
				test: /\.(ttf|eot|svg|woff(2)?)(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url-loader"
			}
			, {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"}
			, {test: /\.json$/, loader: "json-loader"}
			, {
				test: /\.scss$/,
				exclude: /node_modules/,
				loader: "style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap&includePaths[]=node_modules/compass-mixins/lib"
			}, {
				test: /\.json?$/,
				loader: "json-loader"
			}
		]
	},
	resolve: {
		extensions: [ ".js", ".jsx"]
	}
};
