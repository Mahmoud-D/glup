const { src, dest } = require("gulp");
const htmlmin = require("gulp-htmlmin");
const concat = require("gulp-concat");
var cleanCss = require("gulp-clean-css");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");

var globs = {
  html: "project/*.html",
  css: "project/css/**/*.css",
  img: "project/pics/*",
  js: "project/js/**/*.js",
};
function htmlTask() {
  return src(globs.html)
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(dest("dist"));
}
function cssTask() {
  return src(globs.css)
    .pipe(concat("style.min.css"))
    .pipe(cleanCss())
    .pipe(dest("dist/assets/css"));
}

function jsTask() {
  return src(globs.js, { sourcemaps: true })
    .pipe(concat("all.min.js"))
    .pipe(terser())
    .pipe(dest("dist/assets/js", { sourcemaps: "." }));
}
function imgTask() {
  return src(globs.img).pipe(imagemin()).pipe(dest("dist/images"));
}

exports.html = htmlTask;
exports.css = cssTask;
exports.js = jsTask;
exports.img = imgTask;
