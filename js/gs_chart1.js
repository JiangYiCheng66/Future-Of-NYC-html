var chartDom = document.getElementById('gs_chart1');
var myChart = echarts.init(chartDom);

var option;

option = {
    title: {
        text: 'Total Area Over Years',
        left: 'center',
        textStyle: {
            color: 'white'
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [2000, 2004, 2008, 2012, 2016, 2020, 2024],
        axisLine: {
            lineStyle: {
                color: 'white'
            }
        },
        axisLabel: {
            color: 'white'
        },
        name: 'Year',
        nameTextStyle: {
            color: 'white'
        }
    },
    yAxis: {
        type: 'value',
        axisLine: {
            lineStyle: {
                color: 'white'
            }
        },
        axisLabel: {
            color: 'white'
        },
        name: 'Total Area (sq km)',
        nameTextStyle: {
            color: 'white'
        },
        min: 29600, // 设置Y轴起始值
        max: 31000, // 设置Y轴最大值
        interval: 200, // 设置刻度间隔
        scale: true // 自动根据最大最小值设置刻度
    },
    series: [{
        name: 'Total Area',
        type: 'line',
        data: [29720, 30303, 30445, 30533, 30600, 30690, 30849],
        markPoint: {
            data: [
                {type: 'max', name: 'Max'}
            ],
            label: {
                show: true,
                color: 'white', // 设置标记点字体颜色
                fontWeight: 'bold', // 字体加粗
                formatter: '{c}' // 自定义标签显示内容，这里只显示数值
            },
            itemStyle: {
                color: '#6a7985' // 设置标记点颜色
            }
            
        },
        lineStyle: {
            color: 'rgb(75, 192, 192)'
        },
        itemStyle: {
            color: 'rgb(75, 192, 192)'
        }
    }]
};

myChart.setOption(option);
