/**
 * Created by baldric on 7/23/2016.
 */
var config = {
    port: 3100,
    devBaseUrl:'http://localhost:',
    paths:{
        html:'./src/views/**/*.html',
        mainHtml: __dirname +'/src/views/index.html',
        indexFilename: 'index.html',
        js: './src/js/**/*.js',
        css:[
            './src/css/**/*.css'
        ],
        distPath:'./dist',
        distCleanPath: '/dist/*',
        distUri: '/dist/',
        htmlDistPath: __dirname +'/dist/views/',
        cssDistPath: __dirname +'/dist/css/',
        jsDistPath: __dirname +'/dist/scripts/',
        mainHtmlDistPath: __dirname +'/dist/views/index.html'

    }
};

module.exports = config;