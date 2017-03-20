import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { existsSync } from 'fs';
import { join, resolve } from 'path';
import autoprefixer from 'autoprefixer';

var pkgPath = join(args.cwd, 'package.json');
const pkg = fs.existsSync(pkgPath) ? require(pkgPath) : {};
let theme = {};
if (pkg.theme && typeof(pkg.theme) === 'string') {
    let cfgPath = pkg.theme;
    // relative path
    if (cfgPath.charAt(0) === '.') {
        cfgPath = resolve(args.cwd, cfgPath);
    }
    const getThemeConfig = require(cfgPath);
    theme = getThemeConfig();
} else if (pkg.theme && typeof(pkg.theme) === 'object') {
    theme = pkg.theme;
}
module.exports = {
    entry: {
        vendor: ['antd'],
        main:'./src/js/main.js',
        p1: "./src/js/test1.js",
        p2:['./src/js/test1.js','./src/js/test2.js']

    },
    output: {
        path:'./dist',
        //publicPath:'http://cdn.test.com',
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
            loaders: ['style-loader', 'css-loader', 'less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}'],
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
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'js/common.bundle.js' }),
        //new ExtractTextPlugin('css/[name].css'),
        new htmlWebpackPlugin({
            filename:'index.html',
            template:'./src/pages/tpl/index.html',
            inject:'body',
            title:'test',
            chunks:['main'],
            minify:{
                removeComments:true,
                collapseWhitespace:true
            }
        })
    ]
}