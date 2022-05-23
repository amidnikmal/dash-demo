

const config = {
    chart: {
      backgroundColor: "rgba(0,0,0,0)",
      zoomType: "x",
    },
  
    rangeSelector: {
      enabled: false,
    },
  
    scrollbar: {
      enabled: false,
      liveRedraw: false,
    },
  
    navigator: {
      enabled: false,
      adaptToUpdatedData: false,
      xAxis: {
        labels: {
          format: "{value:%b %d, %H:%M}",
          align: "center",
          y: 12,
        },
      },
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
      ordinal: false,
      tickWidth: 1,
      breaks: [],
      min: null,
      max: null,
      events: {
        afterSetExtremes: null,
      },
    },




    yAxis: [ ],
  }


export const getConfig = () => JSON.parse(JSON.stringify(config))
