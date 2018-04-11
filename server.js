var express = require('express');
var app = express();
app.use(
    express.static(__dirname) //where your static content is located in your filesystem
);
app.listen(3002, function () {
  console.log('Express server listening on port 3002!');
});