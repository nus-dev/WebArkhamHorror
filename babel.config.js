"use strict";

module.exports = {
    presets: [
        "@babel/preset-env",
        "@babel/preset-typescript",
        ["@babel/preset-react", {
            "runtime": "automatic"
        }],
    ],
    plugins: [
        "@babel/plugin-syntax-dynamic-import",
        ["@babel/plugin-transform-typescript", {
            allowNamespaces: true
        }],
        // decorators는 EditorOpenOption에서 사용하는 class-transformer 라이브러리의 데코레이터 기능을 사용하기 위해 추가
        // > 순서 중요. class-properties보다 먼저 처리해야 하며, loose: true 옵션 필요
        // https://babeljs.io/docs/en/babel-plugin-proposal-decorators
        ["@babel/plugin-proposal-decorators", {"legacy": true}],
        ["@babel/plugin-proposal-class-properties", {"loose": true}],
        ['@babel/plugin-proposal-private-methods', {"loose": true}],
        "@babel/transform-runtime",
        ["@babel/plugin-transform-react-jsx", {
            "runtime": "automatic"
        }]
    ]
};
