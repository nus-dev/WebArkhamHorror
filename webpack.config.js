const path = require('path');

const commonConfig = {
    mode: "production",
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", "json"]
    },
    node: {
        __filename: true,
        __dirname: true
    },
    output: {
        filename: '[name].js'
    },
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 2500,
        poll: 1000,
    }
}

const clientConfig = {
    ...commonConfig,
    entry: {
        client: './src/client/Client.ts'
    },
    target: ['web', 'es5'],
    module: {
        rules: [
            {
                // 개발 상황에는 캐싱한다.
                test: /\.(ts|js)x?$/, use: [false ? 'babel-loader?cacheDirectory' : 'babel-loader'],
                include: [
                    path.resolve(__dirname, 'src/client'),
                    path.resolve(__dirname, 'src/common')
                ]
            }
        ]
    }
};

const serverConfig = {
    ...commonConfig,
    entry: {
        server: './src/server/Server.ts'    
    },
    target: "node",
    module: {
        rules: [
            {
                // 개발 상황에는 캐싱한다.
                test: /\.(ts|js)x?$/, use: [false ? 'babel-loader?cacheDirectory' : 'babel-loader'],
                include: [
                    path.resolve(__dirname, 'src/server'),
                    path.resolve(__dirname, 'src/common')
                ]
            }
        ]
    }
};

module.exports = [clientConfig, serverConfig];