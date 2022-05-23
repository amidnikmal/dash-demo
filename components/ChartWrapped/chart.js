const FAKE_DATA_COUNT = 20;

export function initData (config) {
  // console.log('init data', config)
  // return (new Array(20)).map(() => ({ x: Math.random(), y: Math.random() }))

  const output = []
  for (let i=0; i<FAKE_DATA_COUNT; i++) {
    output.push({
      x: Math.random(),
      y: Math.random()
    })
  }
  return output.sort((a,b) => a.x - b.x )
}


export function addSeriesToChart(chart, config) {
  chart.addAxis({
    margin: 100,
    title: { enabled: false },
    labels: {
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
      type: "spline",
      // showInNavigator: true,
    },
    true
  );
}

