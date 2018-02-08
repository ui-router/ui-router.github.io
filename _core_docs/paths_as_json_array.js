#!env node

var readline = require('readline');
var fs = require('fs')

var lines = [];
process.stdin.pipe(require('split')())
  .on('data', lines.push.bind(lines))
  .on('close', function() { 
    lines = lines
      .map(function(x) { return x.replace(/^\.\//, ""); })
      .filter(function (x) { return x.trim(); });

    console.log(JSON.stringify(lines));
  });
