/**
 * Created by baldric on 7/23/2016.
 */
var express = require('express');
var config = require('./configFile');

var server = express();

server.use(express.static(__dirname + config.paths.distUri));


server.get('*',function (req, res) {
    res.sendFile(config.paths.htmlDistPath + config.paths.indexFilename);
});

server.listen(config.port,function () {
    console.log('Server is listening!');
});