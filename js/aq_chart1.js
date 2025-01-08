var myChart = echarts.init(document.getElementById('aq_chart1'));
var option = {
    title: {
        text: 'PM2.5 Trends by Borough (2017-2022)',
        left: 'center',
        textStyle: {
            color: 'white', // 标题字体颜色
            fontFamily: 'Arial', // 字体
            fontSize: 18 // 字体大小
        }
    },
    tooltip: {
        trigger: 'axis',
        textStyle: {
            color: '#000', // 工具提示字体颜色
            fontFamily: 'Arial' // 字体
        }
    },
    legend: {
        data: ['Bronx', 'Brooklyn', 'Manhattan', 'New York City', 'Queens', 'Staten Island'],
        bottom: 0,
        textStyle: {
            color: 'white', // 图例字体颜色
            fontFamily: 'Arial' // 字体
        }
    },
    grid: {
        left: '5%',
        right: '5%',
        bottom: '7%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        name: "Year",
        nameLocation: "middle",
        nameTextStyle: {
            color: 'white', // X轴名称颜色
            fontFamily: 'Arial' // 字体
        },
        axisLabel: {
            color: 'white' // X轴刻度标签颜色
        },
        data: [2017, 2018, 2019, 2020, 2021, 2022]
    },
    yAxis: {
        type: 'value',
        name: "PM 2.5 Mean (mcg/m3)",
        nameLocation: 'middle',
        nameTextStyle: {
            color: 'white', // Y轴名称颜色
            fontFamily: 'Arial' // 字体
        },
        axisLabel: {
            color: 'white' // Y轴刻度标签颜色
        }
    },
    series: [
        {
            name: 'Bronx',
            type: 'line',
            data: [7.72, 7.25, 6.91, 6.11, 6.6443, 6.1017]
        },
        {
            name: 'Brooklyn',
            type: 'line',
            data: [7.52, 7.19, 6.66, 6.12, 6.6345, 5.8064]
        },
        {
            name: 'Manhattan',
            type: 'line',
            data: [8.72, 8.46, 8.31, 7.16, 7.4070, 6.9644]
        },
        {
            name: 'New York City',
            type: 'line',
            data: [7.38, 7.00, 6.60, 6.06, 6.5387, 5.7630]
        },
        {
            name: 'Queens',
            type: 'line',
            data: [7.19, 6.82, 6.47, 6.06, 6.4779, 5.6953]
        },
        {
            name: 'Staten Island',
            type: 'line',
            data: [6.81, 6.40, 5.92, 5.54, 6.1520, 5.1788]
        }
    ]
};
myChart.setOption(option);
