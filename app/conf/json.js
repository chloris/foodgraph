var fs = require('fs'),
    graph = require('./graph.json'),
    image = require('./image.json'),
    meta = require('./meta.json');

// graph.json
// [{ p: ['1', '2'], w: 1.0 }]
//
// image.json
// [{ id: '1', src: 'image url of recipe' }]
//
// meta.json
// [{ id: '1', name: 'camaral steak', d: ['a', 'b', 'c'], s: [] }]

console.log('processing image data');
var images = {};
image.forEach(function (i) {
    images[i.id] = i.src;
});

console.log('processing graph data');
var pairs = {};
graph.forEach(function (g) {
    if (!pairs[g.p[0]]) {
        pairs[g.p[0]] = {};
    }
    pairs[g.p[0]][g.p[1]] = g.w;

    if (!pairs[g.p[1]]) {
        pairs[g.p[1]] = {};
    }
    pairs[g.p[1]][g.p[0]] = g.w;
});

console.log('converting to a single json file');
var rs = {},
    r;

for (var i = 0, len = meta.length; i < len; i++) {
    m = meta[i];
    if (m.id) {
        rs[m.id] = {
            id: m.id,
            name: m.name,
            ingr: m.d,
            dir: m.s,
            img: images[m.id],
            pairs: pairs[m.id]
        };
    }
}

console.log('writing to all.json');
fs.writeFileSync('all.json', JSON.stringify(rs));
