// const FAKE_DATA_COUNT = 20;

// export function initData (config) {
//   const output = []
//   for (let i=0; i<FAKE_DATA_COUNT; i++) {
//     output.push({
//       x: Math.random(),
//       y: Math.random()
//     })
//   }
//   return output.sort((a,b) => a.x - b.x )
// }


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
      type: "spline",
    },
    true
  );
}

