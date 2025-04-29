var http = require("http");
var fileSys = require("fs");
var url = require("url");

var server = http.createServer(function (req, res) {
  let q = url.parse(req.url, true);
  let path = q.query;
  let filelocation;
  switch (path.menu) {
    case "/":
      filelocation = "pages/index.html";
      break;
    case "home":
      filelocation = "pages/index.html";
      break;
    case "about":
      filelocation = "pages/about.html";
      break;
    default:
      filelocation = "pages/index.html";
  }
  fileSys.readFile(filelocation, function (err, data) {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end("404 Not Found");
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
});
server.listen(8000);
