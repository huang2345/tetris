// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const config = {
    // entry: ['./src/index.js', './src/index2.js'],
    entry: {
        index: './src/js/index.js',
    },
    output: {
        filename: '[name][hash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    resolve: {
        // 以下配置会将没指定拓展名的文件按如下类型查找匹配
        extensions: ['*', '.js', '.ts', '.vue'],
        // 设置别名
        alias: {
            '@': path.resolve(__dirname, './src'), // 这样配置后 @ 可以指向 src 目录
        },
    },
    devtool: 'inline-source-map',
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            title: 'demo',
        }),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    optimization: {
        splitChunks: {
            automaticNameDelimiter: '-',
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                use: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
            {
                test: /\.tsx?$/i,
                use: 'ts-loader',
            },
            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
};
