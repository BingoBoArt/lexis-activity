/**
 * @export {gulp}
 * 1. gulp.start('default')
 * 2. 命令行执行 gulp
 */
var gulp = require('gulp'),
  path = require('path'),
  fs = require('fs-extra'),
  stringReplace = require('gulp-replace'),//replace
  webpack = require('webpack'),
  events = require('events'),
  gutil = require("gulp-util"),
  gulpSequence = require('gulp-sequence'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'),
  InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin'),
  WebpackNotifierPlugin = require('webpack-notifier'),
  config = require('./webpack.conf');

var serverLocationName = "lexis-activity";
var ROOT = path.resolve(__dirname, './');
var isDev = false,
  isTest = false,
  isPro = false;

var project = gulp.env.project || ''; //需要构建的项目名称
String.prototype.join = function (target) {
  return path.join(this.toString(), target);
};
var BuildConfig = {//build的配置信息
  build_project: ROOT.join('build/').join(project).join('/'),    // build 后输出目录
  origin_project: ROOT.join('src/').join(project).join('/'),      // 源码目录
  need_copy_path: [ // 复制目录
    'assets'
  ]
};



var _process = require('child_process');
/**
 * 执行shell脚本任务
 * @param  {[type]} command [description]
 * @return {[type]}         [description]
 */
let exec_options = {
  encoding: 'utf8',
  timeout: 0, /*子进程最长执行时间 */
  maxBuffer: 200*1024,  /*stdout和stderr的最大长度*/
  killSignal: 'SIGTERM',
  cwd: null,
  env: null
}
let _execCommand = (command) => {
  return new Promise(function(resolve, reject){
      var _exec = _process.exec(command, exec_options, function (err, stdout, stderr){
          if(err){
              console.log('_execCommand has error');
              resolve({'result': 0, 'message': '_execCommand has error'});
          }else{
              resolve({'result': 1});
          }
      })

      let exec_data = "";
      _exec.stdout.on('data', function (chunk) {
          console.log('data: ' + chunk);
          exec_data += chunk;
      });
      _exec.on("exit", function(code){
          console.log(`exit ${command}`, code, arguments);
          if(code === 1){
              resolve({'result':0, 'message': exec_data})
          }else{
              resolve({'result': 1});
          }
      })
  })
}

/*
 * 查找:测试域名和未注释的localData
 */
gulp.task('find_word', function (cb) {
  //eg:
  if (!isPro) { cb && cb(); return; }

  function recursiveReadFile(fileName, lookingForString) {
    if (!fs.existsSync(fileName)) return;
    if (isFile(fileName)) {
      check(fileName, lookingForString);
    }
    if (isDirectory(fileName)) {
      var files = fs.readdirSync(fileName);
      files.forEach(function (val, key) {
        var temp = path.join(fileName, val);
        if (isDirectory(temp)) recursiveReadFile(temp, lookingForString);
        if (isFile(temp)) check(temp, lookingForString);
      })
    }
    function check(fileName, lookingForString) {
      var data = readFile(fileName);
      var exc = new RegExp(lookingForString);
      if (exc.test(data)) {
        var ee = new events.EventEmitter;
        gutil.log("error", gutil.colors.red("存在mock数据"));
        ee.emit('error', new Error('find ' + lookingForString + ' in ' + fileName));
      }
    }

    function isDirectory(fileName) {
      if (fs.existsSync(fileName)) return fs.statSync(fileName).isDirectory();
    }

    function isFile(fileName) {
      if (fs.existsSync(fileName)) return fs.statSync(fileName).isFile();
    }

    function readFile(fileName) {
      if (fs.existsSync(fileName)) return fs.readFileSync(fileName, "utf-8");
    }
  }

  var rootPath = ROOT.join('src/').join(project);

  recursiveReadFile(rootPath, "     mock:"); // 空格不能删除防止，中断注释掉的localData；
  recursiveReadFile(rootPath,">>>>>>"); // 验证是否存在冲突

  cb && cb();
  return;
});


// 清理文件
gulp.task('clean', function (cb) {
  fs.emptyDirSync(BuildConfig.build_project); // 清空 build 目录
  cb && cb();
});

gulp.task("webpack_build", function () {
  let publicPath = '/lexis-activity/' + project + '/';
  if(isPro){
    publicPath = "//file.lexislive.com.cn/resource" + publicPath
  }else if(isTest){
    publicPath = "//file.lexislive.com.cn/resource-test" + publicPath
  }

  if (!isDev) {//生产环境或者测试环境
    config.output = {
      path: BuildConfig.build_project,
      // publicPath: 'http://file.lexislive.com.cn/webapp/lexis-activity/'+project+'/',
      publicPath: publicPath,
      filename: 'js/[name].[chunkhash:6].js',
      chunkFilename: 'js/[id].[chunkhash:6].js'
    };
    config.plugins.push(
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
        compress: {
          warnings: false,
          collapse_vars: true,
          reduce_vars: true
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({ // 生成manifest文件，记录webpack runtime(chunkid等)信息
        name: 'manifest',
        minChunks: Infinity
      }),
      new InlineManifestWebpackPlugin(), // 内联manifest文件
      new webpack.optimize.AggressiveMergingPlugin(), // merge chunks
      new webpack.optimize.MinChunkSizePlugin({ // 合并过小的chunk文件
        minChunkSize: 30000
      }),
      new ExtractTextPlugin({
        filename: 'css/[name].[contenthash:6].css',
        allChunks: true // 若要按需加载 CSS 则请注释掉该行
      }),
      new OptimizeCssAssetsPlugin(), // 优化 CSS（去重/压缩）
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: BuildConfig.origin_project.join('index.html'),
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          html5: true,
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
          removeEmptyAttributes: true,
        }
      })
    );
  } else {//开发环境
    config.watch = true;
    config.output = {
      path: BuildConfig.build_project,
      publicPath: publicPath,
      filename: 'js/[name].[chunkhash:6].js',
      chunkFilename: 'js/[id].[chunkhash:6].js'
    };
    config.plugins.push(
      // new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new FriendlyErrorsPlugin(),
      new ExtractTextPlugin('css/[name].[contenthash:6].css'),
      new WebpackNotifierPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: BuildConfig.origin_project.join('index.html')
      })
    );
  }
  config.entry = {
    app: BuildConfig.origin_project.join('app.js')
  };
  config.resolve = {
    alias: {
      '@base': path.join(ROOT, "src/common"),
      '@': BuildConfig.origin_project,
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.vue', '.json', '.css']
  };
  webpack(config, function (err, stats) {
    if (err) {
      gutil.log('webpack:' + err)
    }
  });
})

/**
 * 修改global_env
 */
gulp.task('replaceEnv', function (cb) {
  var replaceText = isPro ? 'global_env: "pro"' : (isTest ? 'global_env: "test"' : 'global_env: "dev"');
  var reg = new RegExp(/(['"]?)global_env\1\s*:\s*(['"]?)\w+\2/);
  return gulp.src('src/common/common/config.js')
    .pipe(stringReplace(reg, replaceText))
    .pipe(gulp.dest('src/common/common/'))
})

gulp.task("uploadOSS", async function(cb) {
  let path = isPro ? 'resource' : 'resource-test'
  // _process.exec(`node upload/index.js  ${BuildConfig.build_project}  /${path}/${serverLocationName}/${project}/`)
  await _execCommand(`node upload/index.js  ${BuildConfig.build_project}  /${path}/${serverLocationName}/${project}/`);
  cb && cb();
})
/*
 * 复制其他文件
 */
gulp.task("copyAfter", function (cb) {
  if (BuildConfig.need_copy_path && BuildConfig.need_copy_path.length) {
    BuildConfig.need_copy_path.forEach(function (item, index) {
      fs.stat(BuildConfig.origin_project + item, function (err, stat) {
        if (!err) {
          var origin_path = null,
            output_path = null;
          if (stat.isDirectory()) {
            origin_path = BuildConfig.origin_project + item + "/**";
            output_path = BuildConfig.build_project + item;
          } else if (stat.isFile()) {
            origin_path = BuildConfig.origin_project + item;
            output_path = path.dirname(BuildConfig.build_project + item); //获取文件所在目录
          }
          gulp.src(origin_path).pipe(gulp.dest(output_path));
        }
      })
    });
    cb();
  } else {
    cb();
  }
});

gulp.task('dev', function (callback) {
  //开发环境编译
  isDev = true;
  //watch状态下如果不加callback 会出现The thunk already filled错误
  gulpSequence('clean', 'replaceEnv', 'webpack_build', 'copyAfter')(callback)
  // eval(generate_config_task())
});
gulp.task('test', function (callback) {
  //测试环境编译 相比production只去除代码压缩功能
  isTest = true;
  //watch状态下如果不加callback 会出现The thunk already filled错误
  gulpSequence('clean', 'replaceEnv', 'find_word', 'webpack_build', 'copyAfter')(callback)
});
gulp.task('production', function (callback) {
  //生产环境编译
  isPro = true;
  gulpSequence('clean', 'replaceEnv', 'find_word', 'webpack_build', 'copyAfter')(callback)
});
