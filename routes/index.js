var Spreadsheet = require('edit-google-spreadsheet');
var sConfig = require('./spreadsheet_config').sConfig;
var io = require('socket.io').listen(3001);
var loadedSpreadsheet;
/*
 * GET home page.
 */
require('express');
exports.index = function(request, response) {
   response.render('index');
   
}
var loadSpreadsheet = function(callback){
    Spreadsheet.load(sConfig, callback);
}
exports.getSheet = function(request, response){
    
    var sheetReady = function(err, spreadsheet) {
        if (err) {
            //throw err;
            response.end(err);
        }

        loadedSpreadsheet = spreadsheet;
        spreadsheet.receive(function(err, rows, info) {
            if (err) {
                throw err;
            }

            console.dir(rows);
            response.end(JSON.stringify(rows));
            console.dir(info);
        });
    }
    loadSpreadsheet(sheetReady);
   

}

var addRows = function(request, response) {
    loadedSpreadsheet.receive(function(err, rows, info) {
        if (err) {
            throw err;
        }
        var next = info.nextRow;
        var data = {};
        var oneObject = {};
        request.body.data.map(function(d,i){
            var k = i+1;
            oneObject[k] = d;
        })
        data[next] = [request.body.data];
        rows[next] = oneObject;
        io.sockets.emit("new row", rows);
        /*io.sockets.on('connection', function(socket) {
            socket.emit('new row', rows);
            socket.on('clien event', function(data) {
                console.log(data);
            });
        });*/
        loadedSpreadsheet.add(data, function(d, e, f) {
            console.log(d);
            console.log(e);
            console.log(f);
        })
        loadedSpreadsheet.send(function(err) {
            if (err) {
                console.log(err);
                response.send("not ok")
            } else {
                console.log("updated");
                response.send("ok")
            }
        })

    });
   
   
}
exports.addRows = function(request, response) {
    var sheetReady = function(err, spreadsheet) {
        if (err) {
            //throw err;
            response.end(err);
        }

        loadedSpreadsheet = spreadsheet;
       
        addRows(request, response);
        
    }
    if(loadedSpreadsheet){
        addRows(request, response);
    }
    else {
        loadSpreadsheet(sheetReady);
    }
    
}
var editRows = function(request, response) {
    var data = request.body.data;
    loadSpreadsheet.add({ 3: { 5: "hello!" } });
}
exports.editRows = function (request , response) {
    var sheetReady = function(err, spreadsheet) {
        if (err) {
            //throw err;
            response.end(err);
        }

        loadedSpreadsheet = spreadsheet;

        editRows(request, response);

    }
    if (loadedSpreadsheet) {
        editRows(request, response);
    } else {
        loadSpreadsheet(sheetReady);
    }
}
exports.getNoticeData = function(request, response)  {
    response.send();
}
