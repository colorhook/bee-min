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

    if (!options.file || !options.destfile) {
      return bee.error('the file and destfile option are required in datauri.');
    }

    var filecontent = bee.file.read(options.file, charset);
    bee.log('datauri ' + options.file);

    filecontent = minifier.datauri(filecontent, path.dirname(options.file), {
      ieSupport: options.ieSupport != false,
      maxSize: options.maxSize
    });

    bee.file.write(options.destfile || options.dest, filecontent, charset);
  });
}