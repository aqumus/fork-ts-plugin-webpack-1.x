const path = require('path');
const HappyPack = require('happypack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const webpackConfig = {
    devtool: "cheap-module-eval-source-map",
    entry: {
        'apple': path.resolve(__dirname, 'src/apple'),
        'banana': path.resolve(__dirname, 'src/banana')
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx"]
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                exclude: /node_modules/,
                loader: 'happypack/loader?id=ts'
            }
        ]
    },
    plugins: [
        new HappyPack({
            id: 'ts',
            threads: require('os').cpus().length - 1,
            loaders: [
                {
                    path: 'ts-loader',
                    query: {
                        configFile: path.resolve(__dirname, "tsconfig.json"),
                        happyPackMode: true
                    }
                }
            ]
        }),
        new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true })

    ]
};

module.exports = webpackConfig;