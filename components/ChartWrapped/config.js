
import dayjs from 'dayjs'

const config = {
    chart: {
      backgroundColor: "rgba(0,0,0,0)",
      zoomType: "x",
    },

    title: {
      text: null,
    },
  
    credits: false,
  
    legend: {
      enabled: false,
    },
  
    plotOptions: {
      spline: {
        marker: {
          enabled: false,
        },
      },
      series: {
        lineWidth: 1,
        color: "#555FB9",
      },
    },
  
    xAxis: {
      // type: 'datetime',

      ordinal: false,
      tickWidth: 1,
      breaks: [],
  
      labels: {
        enabled: true,
        formatter(e) {
          return dayjs().format('MMM D, HH:mm')
        },
        align: 'center',
      },
    },

    yAxis: [],

    tooltip: {
      formatter: null
    },
  }


export const getConfig = () => {
  const copy = JSON.parse(JSON.stringify(config))

  copy.xAxis.labels.formatter = config.xAxis.labels.formatter
  // copy.tooltip.formatter = config.tooltip.formatter

  return copy
}
