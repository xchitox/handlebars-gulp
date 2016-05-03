var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');

gulp.task('handlebars', function () {
    var templateData = {
        firstName: 'Kaanon'
    },
    options = {
        ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
        partials : {
            footer : '<footer>the end</footer>'
        },
        batch : ['./src/partials'],
        helpers : {
            capitals : function(str){
                return str.toUpperCase();
            }
        }
    }

    return gulp.src('src/*.handlebars')
    .pipe(handlebars(templateData, options))
    .pipe(rename(function(path) {
        path.extname = '.html';
    }))
    .pipe(gulp.dest('dist'));
});
