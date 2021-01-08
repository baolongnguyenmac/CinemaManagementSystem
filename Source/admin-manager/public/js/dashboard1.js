

// Dashboard 1 Morris-chart

Morris.Area({
        element: 'morris-area-chart',
        data: [{
            period: '2010',
            View: 0,
            Customers: 0,
            Tickets: 0
        }, {
            period: '2011',
            View: 75,
            Customers: 65,
            Tickets: 30
        }, {
            period: '2012',
            View: 32,
            Customers: 22,
            Tickets: 12
        }, {
            period: '2013',
            View: 75,
            Customers: 65,
            Tickets: 30
        }, {
            period: '2014',
            View: 32,
            Customers: 22,
            Tickets: 12
        }, {
            period: '2015',
            View: 75,
            Customers: 65,
            Tickets: 30
        },
         {
            period: '2016',
            View: 0,
            Customers: 0,
            Tickets: 0
        }],
        xkey: 'period',
        ykeys: ['View', 'Customers', 'Tickets'],
        labels: ['View', 'Customers', 'Tickets'],
        pointSize: 0,
        fillOpacity: 0.9,
        pointStrokeColors:['#e7e8ef', '#51e4ff', '#16198d'],
        behaveLikeLine: true,
        gridLineColor: '#eef0f2',
        lineWidth: 0,
        hideHover: 'auto',
        lineColors: ['#e7e8ef', '#51e4ff', '#16198d'],
        resize: true
        
    });

 $('.vcarousel').carousel({
            interval: 3000
         })