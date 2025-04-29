var http = require("http");
var server = http.createServer(function (req, res) {
  res.end("Welcome to Node.js World");
});
server.listen(8000);
