/** Compile in background on *.tex modification and notify on failure
 * Install nodejs
 * $ npm install -g grunt-cli
 * $ npm install
 * Ensure pdflatex is on PATH
 * $ grunt
 */

'use strict';

var notifier = require('node-notifier');


module.exports = function(grunt) {

require('load-grunt-tasks')(grunt);

var latexCallback = function(err, stdout, stderr, cb) {
  if(err) {
    var errs = stdout.split('! ')
    errs = errs[errs.length - 1].split('\r\n')
  
    notifier.notify({
      title: 'LaTeX build failed',
      message: errs[0]
    }, function() {
      cb(err, stdout, stderr, cb);
    });
  } else { 
    cb(err, stdout, stderr, cb);
  }
};


grunt.initConfig({
  latex: ['main.tex'],
  watch: {
    default: {
      files: ['**/*.tex'],
      tasks: ['shell:pdflatex']
    },
    
    draft: {
      files: ['**/*.tex'],
      tasks: ['shell:draft']
    }

  },
  
  shell: {
    pdflatex: {
      command: 'pdflatex -synctex=1 -interaction=nonstopmode -halt-on-error -shell-escape main.tex',
      options: {
        callback: latexCallback
      }
    },
    
    draft: {
      command: 'pdflatex -draftmode -interaction=nonstopmode -halt-on-error -shell-escape main.tex',
      options: {
        callback: latexCallback
      }
    },

    // pre-compiles preamble for faster latex compilation
    preamble: {
      command: 'etex -shell-escape -interaction=nonstopmode -initialize -jobname="precompiled" "&pdflatex" mylatexformat.ltx """main.tex"""'
    }
  
  }

});


grunt.registerTask('default', ['watch:default']);
grunt.registerTask('draft', ['watch:draft']);
grunt.registerTask('preamble', ['shell:preamble']);

};


