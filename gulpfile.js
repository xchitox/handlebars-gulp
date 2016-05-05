var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var siteData = require('./site-config.json');
var fs = require('fs');
var merge = require('merge-stream');
var path = require('path');
var flatmap = require('gulp-flatmap');

gulp.task('notinuse', function () {
  var streams = [];
  var sites = Object.keys(siteData);

  sites.forEach(function(page){
    var templateData = { },
      options = {
          ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
          // partials : {
          //   _content : fs.readFileSync(siteData[page].content, 'utf-8')
          // },
          batch : ['./src/partials'],
          helpers : {
            // capitals : function(str){
            //     return str.toUpperCase();
            // }
          }
      },
      stream = gulp.src('src/*.html')
              .pipe(handlebars(templateData, options))
              .pipe(rename(function(path) {
                  console.log(page);
                  console.log(options);
                  path.basename = page;
                  path.extname = '.html';
              }))
              .pipe(gulp.dest('dist'));

      console.log('push:'+page);
      streams.push(stream);

  });

    console.log('start');
    return merge(streams);
});

gulp.task('default', function () {
  var templateData = { },
    options = {
      ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
      // partials : {
      //   _content : fs.readFileSync(siteData[page].content, 'utf-8')
      // },
      batch : ['./src/partials'],
      helpers : {
        // capitals : function(str){
        //     return str.toUpperCase();
        // }
      }
  }

  return gulp.src('src/*.html')
            .pipe(handlebars(templateData, options))
            .pipe(gulp.dest('dist'));
  });
