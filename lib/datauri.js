/**
datauri任务
-------------
对某个css文件进行datauri

### 用法

    <datauri file='src/myfile.css' destfile='src/myfile-datauri.css'/>

@class datauri
**/
module.exports = function(bee) {

  var path = require('path');

  bee.register('datauri', function(options) {

    var minifier = require('node-minifier');
    var charset = options.charset || 'utf-8';
    
    var src = options.src || options.file;
    var destfile = options.destfile || options.dest;

    if (!src || !destfile) {
      return bee.error('the src/file and dest/destfile option are required in datauri.');
    }
    
    var filecontent = bee.file.read(src, charset);
    bee.log('datauri ' + src);

    filecontent = minifier.datauri(filecontent, path.dirname(options.file), {
      ieSupport: !options.ieSupport || bee.util.toBoolean(options.ieSupport),
      maxSize: Number(options.maxSize)
    });

    bee.file.write(destfile, filecontent, charset);
  });
}