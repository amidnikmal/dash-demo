import dayjs from 'dayjs'

  
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