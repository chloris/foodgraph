'use strict';

function attachEvents() {
    $('.ingredients').on('click', 'li', function (e) {
        var el = e.currentTarget;
        console.log(e, 'e');
        console.log(el, 'el');
    })
}

(function () {
    $.ajax({
        url: '/conf/ingredients.json'
    }).done(function (r) {
        var html = '',
            tmp = '<li>' +
                    '<input type="checkbox" id="{seq}" name="{name}" value="{value}" />' +
                    '<label for="{seq}">{name}</label>' + 
                '</li>',
            i,
            len;

        for (i = 0, len = r.length; i < len; i++) {
            html += tmp.replace(/{seq}/g, 'i' + i).replace(/{name}/g, r[i].name).replace('{value}', r[i].name);
        }

        $('.ingredients').html(html);
    });

    var graph = new Graph(),
        s1 = graph.newNode({ label: '綠咖哩起士烤鮮魚', image: './img/s1.jpg' } ),
        s2 = graph.newNode({ label: '沙嗲活菌豬串燒', image: './img/s2.jpg' } ),
        s3 = graph.newNode({ label: '起士焗烤蟹肉', image: './img/s3.jpg' } ),
        s4 = graph.newNode({ label: '培根起士焗磨菇', image: './img/s4.jpg' } ),
        s5 = graph.newNode({ label: '義式生牛肉', image: './img/s5.jpg' } ),
        s6 = graph.newNode({ label: '煙燻鮭魚沙拉', image: './img/s6.jpg' } ),
        s7 = graph.newNode({ label: '義大利香煎雞柳', image: './img/s7.jpg' } );

    graph.newEdge(s1, s2, { color: '#333333', directional: false });
    graph.newEdge(s1, s3, { color: '#333333', directional: false });
    graph.newEdge(s1, s5, { color: '#333333', directional: false });
    graph.newEdge(s2, s5, { color: '#333333', directional: false });
    graph.newEdge(s2, s6, { color: '#333333', directional: false });
    graph.newEdge(s3, s4, { color: '#333333', directional: false });
    graph.newEdge(s3, s5, { color: '#333333', directional: false });
    graph.newEdge(s3, s7, { color: '#333333', directional: false });
    graph.newEdge(s4, s6, { color: '#333333', directional: false });
    graph.newEdge(s5, s7, { color: '#333333', directional: false });

    jQuery(function(){
        var springy = jQuery('#springydemo').springy({
            graph: graph,
            nodeSelected: function(node) {
                var s8 = graph.newNode({ label: '煙燻鮭魚沙拉 1', image: './img/s6.jpg' }),
                    s9 = graph.newNode({ label: '煙燻鮭魚沙拉 2', image: './img/s6.jpg' });

                graph.newEdge(s6, s8, { color: '#ff0000' });
                graph.newEdge(s6, s9, { color: '#ff0000' });
            }
        });
    });

    attachEvents();
})();
