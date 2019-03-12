#!/usr/bin/env node

var fs = require('fs'),
    path = require('path'),
    dir = __dirname + '/../img/photos/',
    match = RegExp('kaboompics_', 'g'),
    files;

files = fs.readdirSync(dir);

function generate_token(length){
    //edit the token allowed characters
    var a = "abcdef1234567890".split("");
    var b = [];
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}

files.forEach(function(file) {
    var filePath = path.join(dir, file),
        newFilePath = path.join(dir, file.replace(/([0-9a-f]+).*/, "$1.jpg"));
    console.log(newFilePath);
    fs.renameSync(filePath, newFilePath);
});