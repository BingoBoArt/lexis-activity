var webpack = require('webpack');
// 参考但远优于 https://github.com/vuejs-templates/webpack/blob/master/template/build/utils.js
var extract = require('extract-text-webpack-plugin').extract;
// postcss-loader 配置见 .postcssrc
var basicLoaders = ['css-loader', 'postcss-loader', 'lemon-px2rem-loader?remUnit=75&remPrecision=5', 'less-loader'];
var LOADERS = {
  css: basicLoaders,
  less: basicLoaders.concat('less-loader'),
  sass: basicLoaders.concat('sass-loader?indentedSyntax=true'),
  scss: basicLoaders.concat('sass-loader')
};

function ruleGen(ext, isForVueLoader) {
  var styleLoader = (isForVueLoader ? 'vue-' : '') + 'style-loader',
    useLoaders = LOADERS[ext];

  // 开发环境下直接内嵌 CSS 以支持热替换
  //if (ENV.__DEV__) return [styleLoader].concat(useLoaders);
  // 生产环境下分离出 CSS 文件
  return extract({ use: useLoaders, fallback: styleLoader });
}

function styleRulesGen(isForVueLoader) {
  var rules = isForVueLoader ? {} : [];
  Object.keys(LOADERS).forEach(function (ext) {
    isForVueLoader ?
      rules[ext] = ruleGen(ext, true) :
      rules.push({ test: new RegExp('\\.' + ext + '$'), use: ruleGen(ext) });
  });
  return rules;
}

module.exports = {
  entry: {
    
  },
  // devtool - source map 配置详见 https://webpack.js.org/configuration/devtool
  devtool: false,
  output: {
  },
  module: {
    rules: [
    {
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      options: {
        formatter: require('eslint-friendly-formatter')
      },
      enforce: 'pre',
       exclude: /node_modules/
    }, 
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: styleRulesGen(true)
      }
    },{
      test: /\.js$/,
      loader: 'babel-loader?cacheDirectory',
      exclude: /node_modules/
    }, { 
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 1024, // 10KB 以下使用 base64
        name: 'img/[name]-[hash:6].[ext]'
      } 
    }, {
      test: /\.(woff2?|eot|ttf|otf)$/,
      loader: 'url-loader',
      options: {
        limit: 1024,
        name: 'fonts/[name]-[hash:6].[ext]'
      }
    }].concat(styleRulesGen())
  },
  plugins: [
    // new NyanProgressPlugin(), // 进度条
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return (module.context && module.context.indexOf('node_modules') !== -1);
      }
    }),
    new webpack.HashedModuleIdsPlugin()
  ]
};
