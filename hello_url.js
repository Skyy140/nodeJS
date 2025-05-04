var http = require("http");
var fileSys = require("fs");
var url = require("url");
var path = require("path");

var server = http.createServer(function (req, res) {
  let q = url.parse(req.url, true);
  let filename = "." + q.pathname;

  if (filename.match(/\.(css|js|jpg|png|jpeg|gif|svg)$/)) {
    fileSys.readFile(filename, function (err, data) {
      if (err) {
        res.writeHead(404);
        return res.end("404 Not Found");
      }

      let ext = path.extname(filename);
      let contentType = "text/plain";
      if (ext === ".css") contentType = "text/css";
      else if (ext === ".js") contentType = "application/javascript";
      else if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
      else if (ext === ".png") contentType = "image/png";
      else if (ext === ".gif") contentType = "image/gif";
      else if (ext === ".svg") contentType = "image/svg+xml";

      res.writeHead(200, { "Content-Type": contentType });
      res.write(data);
      return res.end();
    });
    return;
  }

  let query = q.query;
  let filelocation;
  switch (query.menu) {
    case "/":
      filelocation = "pages/index.html";
      break;
    case "mahasiswa":
      filelocation = "pages/mahasiswa.html";
      break;
    case "dosenwali":
      filelocation = "pages/dosenwali.html";
      break;
    case "admin":
      filelocation = "pages/admin.html";
      break;
    case "dataMahasiswa":
      filelocation = "pages/dataMahasiswa.html";
      break;
    case "dataMahasiswaDosen":
      filelocation = "pages/dataMahasiswaDosen.html";
      break;
    case "dataDosen":
      filelocation = "pages/dataDosen.html";
      break;
    case "tambahDataMahasiswa":
      filelocation = "pages/tambahDataMahasiswa.html";
      break;
    case "tambahDataMahasiswaDosen":
      filelocation = "pages/tambahDataMahasiswaDosen.html";
      break;
    case "tambahDataDosen":
      filelocation = "pages/tambahDataDosen.html";
      break;
    case "editDataMahasiswa":
      filelocation = "pages/editDataMahasiswa.html";
      break;
    case "editDataMahasiswaDosen":
      filelocation = "pages/editDataMahasiswaDosen.html";
      break;
    case "editDataDosen":
      filelocation = "pages/editDataDosen.html";
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
console.log("Server running at http://localhost:8000");
