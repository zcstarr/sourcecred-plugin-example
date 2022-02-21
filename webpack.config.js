const { plugins } = require("./.babelrc")

const config = {
  target: "node",
  entry: {
    main: [
      'core-js/stable',
      'regenerator-runtime/runtime',
      './src/index.js'
    ]
  },
  output: {
    libraryTarget: "commonjs",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        include: /.*sourcecred.*/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-flow','@babel/preset-env', ],
            plugins: ["@babel/plugin-transform-runtime", 
            "@babel/plugin-proposal-class-properties", 
            ["@babel/plugin-transform-modules-commonjs",{
              importInterop: "babel"
            }],
            "@babel/plugin-syntax-bigint",
          ],
            sourceType: "unambiguous"
          }
        }
      }],
  },
  resolve: {
    fallback: { 
      "crypto": require.resolve("crypto-browserify"), 
      "stream": require.resolve("stream-browserify") 
    }
  }
}

module.exports = {
  ...config
}// ([config] /*: Array<any>*/);
