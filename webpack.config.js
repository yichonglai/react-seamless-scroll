const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, './example/src/index.tsx'),
    output: {
        path: path.join(__dirname, 'example/dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?/,
                loader: 'ts-loader',
            },
            {
                enforce: 'pre',
                test: /\.tsx?/,
                loader: 'source-map-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif|mp4)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 20,
                    },
                },
            },
        ],
    },
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
        alias: {
            '@example': path.resolve(__dirname, './example/'),
            '@components': path.resolve(__dirname, './src/components/'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: path.join(__dirname, './example/src/index.html'),
        }),
    ],
    devServer: {
        port: 3006,
        // compress: true,
        hot: true,
        historyApiFallback: true,
    },
}
