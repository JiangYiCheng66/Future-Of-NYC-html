var chartDom = document.getElementById('se_chart1');
var myChart = echarts.init(chartDom);

var option;

option = {
    title: {
        text: 'Solar in NYC as of Aug 2022',
        left: "center",
        textStyle: {
            color: 'white'
        }
    },
    color: ['#49BE8E','#53A0FD'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['Existing Solar Installations (MW)', 'New Solar Installations (MW)'],
        top: 25,
        textStyle: {
            color: 'white'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: ['2002-2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022 Jan-Aug'],
            axisLine: {
                lineStyle: {
                    color: 'white'
                }
            },
            axisLabel: {
                color: 'white'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: 'white'
                }
            },
            axisLabel: {
                color: 'white'
            },
            splitLine: {
                lineStyle: {
                    color: '#f0f0f0',
                    opacity: 0.3
                }
            }
        }
    ],
    series: [
        {
            name: 'Existing Solar Installations (MW)',
            type: 'bar',
            data: [0, 25, 42, 65, 88, 130, 175, 220, 252, 317, 350],
            markPoint: {
                data: [
                    {type: 'max', name: 'Max', itemStyle: {color: '#49BE8E'}}
                ]
            }
        },
        {
            name: 'New Solar Installations (MW)',
            type: 'bar',
            data: [25, 17, 13, 23, 42, 45, 45, 32, 65, 33],
            markPoint: {
                data: [
                    {type: 'max', name: 'Max', itemStyle: {color: '#53A0FD'}}
                ]
            }
        }
    ]
};

myChart.setOption(option);
