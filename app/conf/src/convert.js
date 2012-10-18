var fs = require('fs'),
    input,
    output;

function getData(file, cb) {
    file += '.txt';

    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            return;
        }

        var lines = data.split('\n'),
            tmp = [],
            i,
            len;

        // pop out redundant elements
        lines.pop();

        for (i = 0, len = lines.length; i < len; i++) {
            tmp.push(lines[i].split('\t'));
        }

        cb(tmp);
    });
}

input = './graph';
output = input + '.json';

//getData(input, function (lines) {
//    var tmp = [];
//
//    lines.forEach(function (l) {
//        tmp.push({
//            p: [l[0], l[1]],
//            w: l[2]
//        });
//    });
//
//    fs.writeFileSync(output, JSON.stringify(tmp));
//});
//
//input = './ingredients';
//output = input + '.json';
//
//getData(input, function (lines) {
//    var tmp = [];
//
//    lines.forEach(function (l) {
//        tmp.push(l[0]);
//    });
//
//    fs.writeFileSync(output, JSON.stringify(tmp));
//});
//
//input = './recipeimg';
//output = input + '.json';
//
//getData(input, function (lines) {
//    var tmp = [];
//
//    lines.forEach(function (l) {
//        tmp.push({
//            id: l[0],
//            src: l[1]
//        });
//    });
//
//    fs.writeFileSync(output, JSON.stringify(tmp));
//});
//
input = './recipemeta';
output = input + '.json';

getData(input, function (lines) {
    var tmp = [];

    lines.forEach(function (l) {
        var d = '',
            s = '';

        if (l[2]) {
            d = l[2].split('|');
            d.pop();
        }
        if (l[3]) {
            s = l[3].split('|');
            s.pop();
        }

        tmp.push({
            id: l[0],
            name: l[1],
            d: d,
            s: s
        });
    });

    fs.writeFileSync(output, JSON.stringify(tmp));
});
