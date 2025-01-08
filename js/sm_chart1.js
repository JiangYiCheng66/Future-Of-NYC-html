// Prepare the data
var tripCountsData = [
    {'Year': '2014', 'tripCounts': 8613235},
    {'Year': '2015', 'tripCounts': 10094845},
    {'Year': '2016', 'tripCounts': 13887318},
    {'Year': '2017', 'tripCounts': 16411191},
    {'Year': '2018', 'tripCounts': 17646965},
    {'Year': '2019', 'tripCounts': 20621774},
    {'Year': '2020', 'tripCounts': 19562456},
    {'Year': '2021', 'tripCounts': 27127123},
    {'Year': '2022', 'tripCounts': 29838311},
    {'Year': '2023', 'tripCounts': 35088551},
];

// Extract years and tripCounts for easier use in ECharts
var years = tripCountsData.map(function(item) { return item.Year; });
var tripCounts = tripCountsData.map(function(item) { return item.tripCounts; });

// Initialize chart
var chart = echarts.init(document.getElementById('sm_chart1'));

// Specify the configuration
var option = {
    color: ['#ff7f50'], // Orange color for the bars
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    title: {
        text: 'Number of Trips',
        left: 'center',
        textStyle: {
            color: 'white', // 标题字体颜色
            fontSize: 18 // 字体大小
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: years,
        nameTextStyle: {
            color: 'white', // X轴名称颜色
            fontFamily: 'Arial' // 字体
        },
        axisLabel: {
            color: 'white' // X轴刻度标签颜色
        },
        name: 'Year',
        nameLocation: 'middle',
        nameGap: 20  
    },
    yAxis: {
        type: 'value',
        name: 'Trip Count',
        nameLocation: 'middle',
        nameGap: 73,
        nameTextStyle: {
            color: 'white', // X轴名称颜色
            fontFamily: 'Arial' // 字体
        },
        axisLabel: {
            color: 'white' // X轴刻度标签颜色
        },
    },
    series: [{
        data: tripCounts,
        type: 'bar',
        barWidth: '60%', // Adjust bar width
        showBackground: true,
        backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
        }
    }]
};


// Use the specified configuration
chart.setOption(option);
