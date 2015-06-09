$(document).ready(function() {
    var view = $('#shares');
    view.mask();

    $.get('/services/shares/'+ticker+'/info')
    .done(function(data) {
        var msg = data.msg;
        if (msg) {
            if (mp) mp.alert(msg);
            else alert(msg);
        }
        else {
            createChart(data, function() {
                view.mask(false);
            });
        }
    })
    .fail(function(msg) {
        console.error(msg);
        if (mp) {
            mp.alert('что-то пошло не так...');
        }
        else {
            alert('что-то пошло не так...')
        }
        view.mask(false);
    });
});


function createChart(data, cb) {
    var candles = data.candles;
    // candles = candles.slice(0, 360);
    var accessor = techan.plot.candlestick().accessor();
    var parseDate = d3.time.format("%Y-%m-%d").parse;
    candles = candles.map(function(c) {
        return {
            date   : parseDate(c.date),
            open   : +c.o,
            high   : +c.h,
            low    : +c.l,
            close  : +c.c,
            volume : +c.vol
        };
    }).sort(function(a, b) {
        return d3.ascending(accessor.d(a), accessor.d(b));
    });

    // chart
    var margin = [40, 30, 30, 30];
    var width = $('#shares').width() - margin[1] - margin[3];
    var height = 500 - margin[0] - margin[2];

    // brusher
    var b_width = $('#shares').width() - margin[3] - margin[1];
    var b_height = 100;

    // crosshair
    var c_height = 15;



//  ╔═╗╦  ╦╔═╗
//  ╚═╗╚╗╔╝║ ╦
//  ╚═╝ ╚╝ ╚═╝
//  @svg

    // поле для творчества
    var svg = d3.select("#shares").append("svg")
        .attr("class", "candlesPlot no-select")
        .attr("width", width + margin[3] + margin[1])
        .attr("height", height + margin[0] + margin[2] + b_height)
        // .append("g")
        // .attr("transform", "translate(" + margin[3] + "," + margin[0] + ")");

    // график
    var focus = svg.append("g")
        .attr("class", "focus")
        .attr("transform", "translate("+margin[3]+","+(b_height + margin[0])+")")
        .attr('opacity', 1)
        // видимая область
        // чтобы не рендерить лишнее - .attr("clip-path", "url(#clip)")
        focus
            .append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", width)
            .attr("height", height)

        var gAxisX = focus.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")

        var gAxisY_price = focus.append("g")
            .attr("class", "y axis")

        var gAxisY_percent = focus.append("g")
            .attr("class", "percent axis")
            .attr("transform", "translate("+(width)+",0)")

        // объемы
        var gVolume = focus.append("g")
            .attr("class", "volume")
            .attr("clip-path", "url(#clip)")
            .datum(candles)

        // свечки
        var gCandles = focus.append("g")
            .attr("class", "candlestick")
            .attr("clip-path", "url(#clip)")
            // .attr('shape-rendering', "crispEdges")
            .datum(candles)

        // обводка графика
        focus.append('rect')
            .attr('class', 'rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', width)
            .attr('height', height)

        var gCrosshair = focus.append('g')
            .attr("class", "crosshair")


    // всяко разно
    // (нижнаяя панель с брашером)
    var ctx = svg.append("g")
        .attr("class", "ctx")
        .attr("transform", "translate("+(margin[3])+","+(0)+")");

        // брашер (график)
        var gBrusherPlot = ctx.append("g")
            .attr("class", "close")
            .datum(candles)

        // брашер (ось времени)
        var gBrusherX = ctx.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + b_height + ")");
        var gBrusherY = ctx.append("g")
            .attr("class", "y axis")

        var gBrusherSelection = ctx.append("g")
            .attr("class", "brusher")


//*/



//  ╔═╗╔═╗╔╗╔╔╦╗╦  ╔═╗╔═╗
//  ║  ╠═╣║║║ ║║║  ║╣ ╚═╗
//  ╚═╝╩ ╩╝╚╝═╩╝╩═╝╚═╝╚═╝
//  @candles

    // время
    var x = techan.scale
        .financetime()
        .domain(candles.map(accessor.d)) // TODO WTF?! oO почему тут массив из дохера элементов?!
        .range([0, width]);

    // цена
    var y = d3.scale
        .linear()
        // .domain()
        .domain([0, 1])
        .range([height - c_height, 0]);

    // график
    var candlesticks_plot = techan.plot
        // .sma()
        // .ohlc()
        .candlestick()
        .xScale(x)
        .yScale(y)
    gCandles
        // .transition() // techan пока что (27.05.2014) так не умеет
        .call(candlesticks_plot)
//*/



//  ╦  ╦╔═╗╦  ╦ ╦╔╦╗╔═╗╔═╗
//  ╚╗╔╝║ ║║  ║ ║║║║║╣ ╚═╗
//   ╚╝ ╚═╝╩═╝╚═╝╩ ╩╚═╝╚═╝
//  @volumes

    // объемы
    var y_volume = d3
        .scale
        .linear()
        .range([y(0) + c_height, y(0.3)])
        .domain(
            techan.scale.plot
                .volume(candles)
                .domain()
        )

    var volumes_plot = techan
        .plot
        .volume()
        .xScale(x)
        .yScale(y_volume)
    gVolume
        .call(volumes_plot)
//*/


//  ╔╗ ╦═╗╦ ╦╔═╗╦ ╦╔═╗╦═╗
//  ╠╩╗╠╦╝║ ║╚═╗╠═╣║╣ ╠╦╝
//  ╚═╝╩╚═╚═╝╚═╝╩ ╩╚═╝╩╚═
//  @brusher

    // время
    var b_x = techan.scale
        .financetime()
        .domain(x.domain())
        .range([0, b_width]);

    // цена
    var b_y = d3.scale
        .linear()
        .domain(techan.scale.plot.ohlc(candles, accessor).domain())
        .range([b_height, 0]);


    // график
    gBrusherPlot
        .call(
            techan.plot
                .close()
                .xScale(b_x)
                .yScale(b_y)
        )

    // заполняю ось данными
    gBrusherX
        .call(
            d3.svg
                .axis()
                .scale(b_x)
                .tickSize(0)
                .orient("bottom")
        )
    // заполняю ось данными
    gBrusherY
        .call(
            d3.svg
                .axis()
                .scale(b_y)
                .ticks(3)
                .tickSize(0)
                .orient("left")
        )

    // сам брашер.
    var brush = d3.svg
        .brush()
        .on("brushend", brushended);

    brush.x(
        d3.scale
            .linear()
            // если я правильно понял, то zoomable превращает
            // набор данных оси в "номера свечек"
            .domain(b_x.zoomable().domain())
            .range(b_x.range())
    )
    brush.extent([candles.length - 280, candles.length])

    gBrusherSelection
        .call(brush)
        .selectAll("rect")
        .attr("height", b_height)
//*/



//  ╔═╗═╗ ╦╦╔═╗
//  ╠═╣╔╩╦╝║╚═╗
//  ╩ ╩╩ ╚═╩╚═╝
//  @axis

    var x_axis_data = d3.svg.axis()
        .scale(x)
        .tickFormat(d3.time.format("%d.%m.%y"))
        .tickSize(-height)
        .orient("bottom")

    var y_axis_data = d3.svg.axis()
        .scale(y)
        .tickSize(-width)
        .orient("left")

    var y_percent = d3.scale
        .linear()
        .range([height, 0]);

        var y_percent_axis_data = d3.svg.axis()
            .scale(y_percent)
            .tickFormat(d3.format('+%'))
            .tickSize(0)
            .orient("right")
//*/



//  ╔═╗╦═╗╔═╗╔═╗╔═╗╦ ╦╔═╗╦╦═╗
//  ║  ╠╦╝║ ║╚═╗╚═╗╠═╣╠═╣║╠╦╝
//  ╚═╝╩╚═╚═╝╚═╝╚═╝╩ ╩╩ ╩╩╩╚═
//  @crosshair



    var ohlcAnnotation = techan.plot
        .axisannotation()
        .axis(d3.svg.axis().scale(y).orient('right'))
        .format(d3.format(',.2fs'))
        .width(50)
        // .translate([50, 0])

    var timeAnnotation = techan.plot
        .axisannotation()
        .axis(d3.svg.axis().scale(x).orient('top'))
        .format(d3.time.format('%d.%m.%y'))
        .width(65)
        .translate([0, height]);

    var crosshair = techan.plot
        .crosshair()
        .xScale(x)
        .yScale(y)
        .xAnnotation(timeAnnotation)
        .yAnnotation(ohlcAnnotation);

    gCrosshair.call(crosshair);
//*/



//  ╔═╗╔═╗╔═╗╔═╗
//  ╠╣ ║ ║║ ║╚═╗
//  ╚  ╚═╝╚═╝╚═╝
//  @foo


    // @brushended
    // валидация данных брашера
    function brushended() {
        // only transition after input
        if (!d3.event.sourceEvent) return;

        var extent = brush.extent().map(Math.round);
        // был просто клик
        if (brush.empty()) { // Math.abs(extent[0] - extent[1]) < 180) {
            extent[1] = extent[0] + 160;
        }
        extent[1] -= 0.5;

        // анимация при выборе другого диапазона
        focus
            .transition()
            .duration(350)
            .attr('opacity', 0)
            .each('end', function() {
                draw()
                focus
                    .transition()
                    .duration(200)
                    .attr('opacity', 1)
            })

        // анимация "удлинения" выбранного диапазона
        // (например при клике)
        d3
            .select(this)
            .transition()
            .duration(300)
            .call(brush.extent(extent))
            .call(brush.event)
            // .each('end', draw) // без анимации выглядит как тормоза...
    }


    // @draw
    // отрисовывает видимые данные
    function draw(cb) {
        // привязка данных брашера к данным графика
        // https://github.com/andredumas/techan.js/blob/54e14442e30d7bd779e8fd4d9cddd25dc69a3cb6/src/scale/zoomable.js
        var visibleCandlesRange = brush.empty() ? brush.x().domain() : brush.extent();
        x // ось
            .zoomable() // получить связанный набор свечек
            .domain(visibleCandlesRange) // установить видимые свечи

        // наши свечи
        var data = gCandles.datum();
        var visibleCandles = data.slice(visibleCandlesRange[0], visibleCandlesRange[1]);
        // типо строим виртуальный график и получаем его домен
        var visible_domain = techan.scale.plot.ohlc(
            data.slice.apply(data, visibleCandlesRange),
            accessor // яхз что это
        ).domain();

        // lvc - LastVisibleCandle
        var c = visibleCandles[visibleCandles.length - 1].close;

        // чтобы график не упирался "в потолок"
        // if (visible_domain[1] / c < 1.1) visible_domain[1] = c * 1.1;
        // и "пол"
        // if (visible_domain[0] / c > 0.9) visible_domain[0] = c * 0.9;

        // указываем диапазон реального графика
        y
            .domain(visible_domain)
        y_percent
            .domain([visible_domain[0] / c - 1, visible_domain[1] / c - 1])
        y_volume
            .domain([d3.min(visibleCandles.map(accessor.v)), d3.max(visibleCandles.map(accessor.v))])

        gAxisX
            .call(x_axis_data)
        gAxisY_price
            .call(y_axis_data)
        gAxisY_percent
            .call(y_percent_axis_data)
        gVolume
            .call(volumes_plot.refresh)
        gCandles
            // .transition() // techan пока что (27.05.2014) так не умеет
            .call(candlesticks_plot.refresh)


        svg
            .selectAll(".percent .tick")
            .classed("positive", function(d) {
                return d > 0;
            })
            .classed("negative", function(d) {
                return d < 0;
            })
        if (cb) cb();
    }

    draw(cb);
//*/
}