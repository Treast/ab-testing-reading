var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HTMLWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var metadata = require('./metadata')

module.exports = {
    entry: './app/main.js',
    output: {
        path: path.resolve('app', 'dist'),
        filename: 'app.bundle.js'
    },
    resolve: {
        alias: {
            '@': path.resolve('app', 'components')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test: /\.(s?)css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options : {
                                minimize: true
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192
                    }
                  }
                ]
            },
			{
				test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 50000,
							mimetype: "application/font-woff",
							name: "./fonts/[name].[ext]",
						},
					}
				]
			}
        ]
    },
    plugins: [
		new ExtractTextPlugin('./style.css'),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './app/index.html',
            hash: true,
            inject: true,
			metadata
        }),
        new UglifyJsPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve('app', 'static'),
                to: 'assets/'
            }
        ])
    ]
}