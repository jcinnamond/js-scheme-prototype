JSScheme = {};

load("runtime.js");

var program = read('program.jss');
new JSScheme.Runtime().eval(program);
