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

    ingr.on('change', 'li', function (e) {
        if ('checked' === $(e.target).attr('checked')) {
            // checked
        } else {
            // unchecked
        }
    });
});

function draw(id) {
    graph = new Graph();

    var r = all[id],
        rNode = graph.newNode({ id: id, label: r.name, image: r.img.replace('large', 'small') }),
        tmp,
        tmpNode,
        pairs = r.pairs;

    for (var p in pairs) {
        tmp = all[p];
        tmpNode = graph.newNode({
            id: tmp.id,
            label: tmp.name,
            image: tmp.img.replace('large', 'small')
        });

        graph.newEdge(rNode, tmpNode, { color: '#444444', directional: false });
    }

    jQuery(function(){
        springy = jQuery('#springydemo').springy({
            graph: graph,
            nodeSelected: function(node) {
                var data = all[node.id],
                    modal = $('#recipeModal'),
                    head = $('#recipeModal .modal-header'),
                    body = $('#recipeModal .modal-body');

                head.html(data.name);
                body.html('<ul><li>' +
                    data.dir.join('</li><li>') + '</li></ul>' +
                    '<ul class="ingr"><li>' +
                    data.ingr.join('</li><li>') + '</li></ul>' +
                    '<img src="' + data.img + '" alt="' + data.name + '"/>'
                );
                modal.modal('show');
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
