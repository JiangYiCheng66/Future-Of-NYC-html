// Prepare the data
var stationData = [
    {'Year': '2014', 'stationCounts': 325},
    {'Year': '2015', 'stationCounts': 456},
    {'Year': '2016', 'stationCounts': 585},
    {'Year': '2017', 'stationCounts': 740},
    {'Year': '2018', 'stationCounts': 746},
    {'Year': '2019', 'stationCounts': 864},
    {'Year': '2020', 'stationCounts': 1166},
    {'Year': '2021', 'stationCounts': 1476},
    {'Year': '2022', 'stationCounts': 1693},
    {'Year': '2023', 'stationCounts': 2077},
];

// Extract years and stationCounts for easier use in ECharts
var years = stationData.map(function(item) { return item.Year; });
var stationCounts = stationData.map(function(item) { return item.stationCounts; });

// Initialize the chart
var chart = echarts.init(document.getElementById('sm_chart2'));

// Specify the configuration
var option = {
    color: ['#FF0000'], // Red color for the line
    tooltip: {
        trigger: 'axis'
    },
    title: {
        text: 'Station Counts Over Years',
        left: 'center',
        textStyle: {
            color: 'white', // 标题字体颜色
            fontSize: 18 // 字体大小
        }
    },
    xAxis: {
        type: 'category',
        data: years,
        boundaryGap: false,
        name: 'Year',
        nameLocation: 'middle',
        nameGap: 20,
        nameTextStyle: {
            color: 'white', // X轴名称颜色
            fontFamily: 'Arial' // 字体
        },
        axisLabel: {
            color: 'white' // X轴刻度标签颜色
        },
    },
    yAxis: {
        type: 'value',
        name: 'Station Count',
        nameLocation: 'middle',
        nameGap: 43,
        nameTextStyle: {
            color: 'white', // X轴名称颜色
            fontFamily: 'Arial' // 字体
        },
        axisLabel: {
            color: 'white' // X轴刻度标签颜色
        },
    },
    series: [{
        data: stationCounts,
        type: 'line',
        smooth: true, // Smooth the line
        showSymbol: true, // Show symbols on the line
        symbol: 'circle', // Use circles as symbols
        symbolSize: 8, // Size of the symbols
        lineStyle: {
            width: 3 // Width of the line
        }
    }]
};

// Use the specified configuration
chart.setOption(option);
