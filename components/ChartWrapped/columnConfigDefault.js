import dayjs from 'dayjs'

// const pieConfigDefault = {
//     chart: {
//       type: 'pie',
//       spacing: [0, 0, 0, 0],
//       backgroundColor: 'rgba(0,0,0,0)',
//       style: {
//         fontFamily: "'Rubik'",
//         color: '#6D6E8D'
//       },
  
//       // spacingTop: 0,
//       // spacingBottom: 0,
//       // spacingLeft: 0,
//       // spacingRight: 0
//     },
//     credits: false,
//     title: {
//       text: 'SLOW',
//       align: 'center',
//       verticalAlign: 'middle',
//       floating: true,
//       style: {
//         fontSize: '14px'
//       }
//     },
//     legend: {
//       enabled: false
//     },
//     plotOptions: {
//       series: {
//         dataLabels: {
//           enabled: false
//         }
//       }
//     }
//   };
  
export const columnConfigDefault = {
    chart: {
      type: 'column',
      backgroundColor: 'rgba(0,0,0,0)',
      style: {
      }
    },
    title: {
      text: null
    },
    credits: false,
    legend: {
      enabled: false
    },
    plotOptions: {
      line: {
        marker: {
          enabled: false
        }
      },
    },

    xAxis: {
      type: 'datetime',
      labels: {
        enabled: true,
        formatter() {          
          return dayjs(this.value).format('MMM D, HH:mm')
        },
        // align: 'center',
      },
      crosshair: true
    },
  
    yAxis: {
      title: {
        enabled: false
      }
    },

    tooltip: {
      formatter: null
    },

    series: []
  };