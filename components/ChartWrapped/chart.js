
export function addSeriesToChart(chart, config) {
  chart.addAxis({
    margin: 100,
    title: { enabled: false },
    labels: {
      // visible: false,
      enabled: false,
      formatter: function () {
        return this.value;
      },
    },
  });

  return chart.addSeries(
    {
      ...config,
      yAxis: chart.yAxis.length - 1,
      // yAxis: 0,
      // type: "spline",
    },
    true
  );
}

