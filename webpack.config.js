var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
//var ExtractTextPlugin = require("extract-text-webpack-plugin");
var theme = require('./theme')
module.exports = {
    entry: {
        common: ['antd'],
        'account/login': './src/js/account/login.js',
        main: './src/js/main.js',
        p1: './src/js/test1.js',
        p2: ['./src/js/test1.js','./src/js/test2.js']

    },
    output: {
        path:'./dist',
        publicPath:'http://localhost:8000',
        filename: "js/[name].js"
    },
    module:{
        noParse: [/moment.js/],
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015','react'],
                plugins: ['transform-runtime'
                    ,
                    ['import',{
                    "libraryName": "antd",
                    "libraryDirectory": "lib",
                    "style": true
                }]
                ]
            }
        }, {
            test: /\.tsx?$/, loaders: ['babel-loader','ts-loader']
        }, {
            test: /\.less$/,
            loaders: ['style-loader', 'css-loader',`less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`],
        }, {
            test: /\.css$/,
            //loader: ExtractTextPlugin.extract({use:'style-loader!css-loader'})
            loaders: ['style-loader', 'css-loader'],
        }, {
            test: /\.(jpe?g|png|gif|svg|ico)/i,
            loader: 'file-loader',
        }, {
            test: /\.(ttf|eot|svg|woff|woff2)/,
            loader: 'file-loader',
        }, {
            test: /\.(pdf)/,
            loader: 'file-loader',
        }, {
            test: /\.(swf|xap)/,
            loader: 'file-loader',
        }],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'common', filename: 'js/common.js' }),
        //new ExtractTextPlugin('css/[name].css'),
        // new htmlWebpackPlugin({
        //     filename:'index.html',
        //     template:'./src/pages/layouts/index.html',
        //     inject:'body',
        //     title:'test',
        //     chunks:['common', 'main'],
        //     minify:{
        //         removeComments:true,
        //         collapseWhitespace:true
        //     }
        // }),
        new htmlWebpackPlugin({
            filename:'account/login.html',
            template:'./src/pages/layouts/index.html',
            inject:'body',
            title:'登录',
            chunks:['common', 'account/login'],
            minify:{
                removeComments:true,
                collapseWhitespace:true
            }
        })
    ]
}