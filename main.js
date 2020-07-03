var http = require('http');
var fs = require('fs');
var url = require('url');

function templateList(file_list) {
    var list = '<ul>';
    var i = 0;
    while (i < file_list.length) {
        list = list + `<li><a href = "/?id=${file_list[i]}">${file_list[i]}</a></li>`;
        i = i + 1;
    }
    list = list + '</ul>';
    return list
}


var app = http.createServer(function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    console.log(queryData.id);
    var title = queryData.id;
    console.log(pathname);
    if (pathname === '/') {
        if (queryData.id === undefined) {

            fs.readdir('./data', function(err, file_list) {
                console.log(file_list);
                var title = 'welcome';
                var description = ' Hello Node.js';

                var list = templateList(file_list);


                var template = `<!doctype html>
                <html>
                <head>
                  <title>WEB1 - ${title}</title>
                  <meta charset="utf-8">
                </head>
                <body>
                  <h1><a href="/">WEB</a></h1>
                  ${list}
                  <h2>${title}</h2>
                  <p>${description}</p>
                </body>
                </html>
                `
                response.writeHead(200);
                response.end(template);
            });





        } else {
            fs.readdir('./data', function(err, file_list) {
                console.log(file_list);
                var title = `${queryData.id}`;
                var description = ' Hello Node.js';
                var list = templateList(file_list);
                fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description) {


                    var template = `<!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          ${list}
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
        </html>
        `
                    response.writeHead(200);
                    response.end(template);
                });
            })
        }



    } else {
        response.writeHead(404);
        response.end('Not found');

    }



});
app.listen(3000);