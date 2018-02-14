require(['c3'], function (c3) {
    var chart = c3.generate({
        bindto: '#{{ include.id }}',
        padding: {
            bottom: 24,
            top: 0
        },
        data: {
            columns: [
                ['Open', 62],
                ['Bounce', 32],
                ['Unsubscribe', 9],
            ],
            colors: {
                Open: '{{ site.colors.blue }}',
                Bounce: '{{ site.colors.red }}',
                Unsubscribe: '{{ site.colors.yellow }}',
            },
            type : 'pie'
        },
        legend: {
            position: 'bottom'
        },
    });
});