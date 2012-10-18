require.config({
  shim: {
  },

  paths: {
    hm: 'vendor/hm',
    esprima: 'vendor/esprima',
    jquery: 'vendor/jquery.min'
  }
});

var graph,
    springy,
    all,
    gid = 1,
    ingredients;

$.getJSON('/conf/ingredients.json', function (data) {
    var ingr = $('#ingr'),
        tmpl = '<li>' +
            '<input type="checkbox" id="{id}" name="{name}" value="{name}" checked="checked">' +
            '<label for="{id}">{label}</label>' +
        '</li>';

    $('#query').typeahead({
        source: data,
        updater: function (r) {
            var html = ingr.html(),
            id = gid++,
            label = r.length > 25 ? r.substring(0, 25) + '...' : r;

            ingr.html(html + tmpl.replace(/{id}/g, 's' + id).replace(/{name}/g, r).replace(/{label}/g, label));

            return r;
        }
    });
});

function draw(id) {
    if (springy && 'function' === typeof springy.clear) { console.log('clear'); springy.clear(); }
    graph = new Graph();

    var r = all[id],
        rNode = graph.newNode({ id: id, label: r.name, image: r.src }),
        tmp,
        tmpNode,
        pairs = r.pairs;

    for (var p in pairs) {
        tmp = all[p];
        tmpNode = graph.newNode({
            id: tmp.id,
            label: tmp.name,
            image: tmp.src
        });

        graph.newEdge(rNode, tmpNode, { color: '#444444', directional: false });
    }

    jQuery(function(){
        springy = jQuery('#springydemo').springy({
            graph: graph,
            nodeSelected: function(node) {
                draw(node.id);
            }
        });
    });
}

$.getJSON('/conf/all.json', function (result) {
    all = result;

    require(['app'], function(app) {
        draw('49');
    });
});
