const http = require('http');
const url = require('url');
http.createServer(function (request, response) {
  console.log('path', request)
  console.log('url', request.url)
  if (request.url !== '/favicon.ico') {
      const info = url.parse(request.url, true).query
      console.log(`姓名：${info.name} 年龄：${info.age}`)
  }
  response.writeHead(200, {'Content-Type': 'text/html;charset="utf-8"'});
  response.write('<head><meta charset="UTF-8"/></head>')
  response.write('hello node');
  response.write('<h2>你好，nodejs</h2>');
  response.end('Hello World');
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');