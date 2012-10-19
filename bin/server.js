var express = require('express'),
    app = express(),
    cp = require('child_process'),
    PORT = process.argv[2] || 8000,
    MEMORY = 1024,
    CMD = 'java -jar MenuPlanner.jar -Xms{mem}M -Xmx{mem}M {query}';

app.get('/', function (req, res) {
    res.setHeader('content-type', 'application/json');
    var recipes = [44, 19, 1181, 945],
        result = '20616   26932\n' +
                 '20616   55270\n' +
                 '20616   57062\n' +
                 '210015  26932\n' +
                 '27204   57062\n';

//    cp.exec(CMD.replace(/{mem}/g, MEMORY).replace(/{query}/g, recipes.join(',')), function (err, stdout, stderr) {
//    var child = cp.execFile('demo', {
//        cwd: process.cwd(),
//        encoding: 'utf8',
//        maxBuffer: 1024*1024
//    }, function (err, stdout, stderr) {
//        if (err) {
//            console.log(err, 'error');
//            res.send('');
//        }
//        console.log(stdout, 'standard output');
//        res.send('{}');
//    });
});


app.listen(PORT);
