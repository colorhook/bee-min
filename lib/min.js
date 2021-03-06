/**
min任务
-------------
min脚本，样式，图片或html

### 用法

    <min src='my.js' dest='my.min.js'/>

    <min file='reset.css' destfile='reset.min.css'/>

@class min
**/
module.exports = function(bee) {

  bee.register('min', function(options, callback) {

    var path = require('path');
    var minifier = require('node-minifier');

    var src = options.src || options.file;
    var destfile = options.destfile || options.dest;

    if (!src || !destfile) {
      return callback(new Error('src/file and dest/destfile are required in minify task.'));
    }
    
    var childNodes = options.childNodes;
    var banner, footer;
    options.childNodes.forEach(function(item){
      if(item.name === 'banner' || item.name === 'header'){
        banner = item.value.value;
      }else if(item.name === 'footer'){
        footer = item.value.value;
      }
    });

    var readWrite = function(transform, input, output, callback) {
      var encoding = options.encoding || 'utf-8';
      var filecontent = bee.file.read(input, encoding);
      filecontent = transform(filecontent, options);
      bee.file.mkdir(path.dirname(output));
      bee.file.write(output, filecontent, encoding);
      callback();
    }

    var minifyJS = function(input, output, callback) {
      bee.log('minify JS input:' + input + ' output: ' + output);
      var remove = options.remove ? options.remove.split(',') : [];
      readWrite(function(filecontent) {
        return minifier.minifyJS(filecontent, {
          remove: remove,
          copyright: options.copyright || true,
          banner: banner,
          footer: footer
        });
      }, input, output, callback);
    }

    var minifyCSS = function(input, output, callback) {
      bee.log('minify CSS input:' + input + ' output: ' + output);
      readWrite(function(filecontent) {
        return minifier.minifyCSS(filecontent, {
          datauri: options.datauri,
          banner: banner,
          footer: footer
        });
      }, input, output, callback);
    }

    var minifyHTML = function(input, output, callback) {
      bee.log('minify HTML input:' + input + ' output: ' + output);
      options.banner = banner;
      options.footer = footer;
      readWrite(function(filecontent) {
        return minifier.minifyHTML(filecontent, options);
      }, input, output, callback);
    }

    var minifyImage = function(input, output, callback) {
      bee.log('minify Image input:' + input + ' output: ' + output);
      minifier.minifyImage(input, output, function(e, data) {
        if (e) {
          callback && callback(e);
        } else {
          callback(null);
        }
      }, {
        service: options.service
      })
    }

    var extname = options.type || bee.file.extname(src).toLowerCase();
    var method;

    if (extname == 'js') {
      method = minifyJS;
    } else if (extname == 'css') {
      method = minifyCSS;
    } else if (['html', 'htm'].indexOf(extname) >= 0) {
      method = minifyHTML;
    } else if (['png', 'jpg', 'jpeg', 'gif'].indexOf(extname) >= 0) {
      method = minifyImage;
    }
    if(!method){
      bee.warn('the filetype of ' + src + ' cannot be minified.')
      return callback();
    }
    method(src, destfile, callback);


  });
}