/**
minify test
-------------

**/
var bee = require('bee');
var plugin = require('../lib/index');
plugin(bee);

describe('bee-min is an bee plugin', function(){
  

  it("plugin is a function", function(){
    plugin.should.be.a('function');
  });

  it("bee has min and datauri task", function(){
    bee.task.getTask('datauri').should.be.a('function');
    bee.task.getTask('min').should.be.a('function');
  });

});


