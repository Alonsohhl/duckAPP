const widgetData = [
    {
        title: 'Income Status',
        value: 31570,
        text: 'Total income: $22506 ',
        revenue: '10.25%'
    },
    {
        title: 'Sales Status',
        value: 683,
        text: 'Total sales: 2398 ',
        revenue: '7.85%'
    },
    {
        title: 'Recent Users',
        value: 3.2,
        text: 'Total users: 121 M',
        revenue: '3.64%'
    },
    {
        title: 'Total Revenue',
        value: 68541,
        text: 'Total revenue: $1.2 M',
        revenue: '17.48%'
    }
];

const lineChart = {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: "Current Week",
            backgroundColor: 'rgba(26, 128, 156, 0.3)',
            borderColor: '#1abc9c',
            data: [32, 42, 42, 62, 52, 75, 62]
        }, {
            label: "Previous Week",
            fill: true,
            backgroundColor: 'transparent',
            borderColor: "#f1556c",
            borderDash: [5, 5],
            data: [42, 58, 66, 93, 82, 105, 92]
        }]
    },
    options: {
        maintainAspectRatio: true,
        legend: {
            display: false
        },
        tooltips: {
            intersect: false
        },
        hover: {
            intersect: true
        },
        plugins: {
            filler: {
                propagate: false
            }
        },
        scales: {
            xAxes: [{
                reverse: true,
                gridLines: {
                    color: 'rgba(0,0,0,0.05)'
                }
            }],
            yAxes: [{
                ticks: {
                    stepSize: 20
                },
                display: true,
                borderDash: [5, 5],
                gridLines: {
                    color: 'rgba(0,0,0,0)',
                    fontColor: '#fff'
                }
            }]
        }
    }
};

const barChart = {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: "Sales Analytics",
                backgroundColor: "#4a81d4",
                borderColor: "#4a81d4",
                hoverBackgroundColor: "#4a81d4",
                hoverBorderColor: "#4a81d4",
                data: [65, 59, 80, 81, 56, 89, 40, 32, 65, 59, 80, 81]
            },
            {
                label: "Dollar Rate",
                backgroundColor: "#e3eaef",
                borderColor: "#e3eaef",
                hoverBackgroundColor: "#e3eaef",
                hoverBorderColor: "#e3eaef",
                data: [89, 40, 32, 65, 59, 80, 81, 56, 89, 40, 65, 59]
            }
        ],
    },
    options: {
        maintainAspectRatio: true,
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                gridLines: {
                    display: false
                },
                stacked: false,
                ticks: {
                    stepSize: 20
                }
            }],
            xAxes: [{
                barPercentage: 0.7,
                categoryPercentage: 0.5,
                stacked: false,
                gridLines: {
                    color: 'rgba(0,0,0,0.01)'
                }
            }]
        }
    }
};

export { widgetData, lineChart, barChart };
