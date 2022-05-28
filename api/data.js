
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

export class DataApi {
  static getList(store) {
    let output = store.fakedata.data;

    const dateRangeFilter = store.data.filters.dateRangeFilter.value
    const sensorTypesFilter = store.data.filters.sensorTypesFilter.value
    const sensorsFilter = store.data.filters.sensorsFilter.value

    if (dateRangeFilter) {
      const from = dateRangeFilter[0]
      const to = dateRangeFilter[1]
      
      if (from && to) {
        output = output.filter((dataItem) => {
          return dayjs(dataItem.timestamp).isBetween(dayjs(from), dayjs(to))
        })
      }
    }

    if (sensorTypesFilter) {
      const sensorTypesIds = []

      if (sensorTypesFilter.length > 0) {
        for (let sensortypename of sensorTypesFilter) {
          const foundSensorType = store.sensorTypes.list.find((st) => st.name == sensortypename)
          sensorTypesIds.push(foundSensorType.id)
        }
      }

      if (typeof sensorTypesFilter === 'string') {
        const foundSensorType = store.sensorTypes.list.find((st) => st.name == sensorTypesFilter)
        sensorTypesIds.push(foundSensorType.id)
      }      
      
      if (sensorTypesIds.length > 0) {
        output = output.filter((dataItem) => sensorTypesIds.includes(dataItem.sensor_type))
      }
    }


    if (sensorsFilter) {
      const sensorsIds = []

      if (sensorsFilter.length > 0) {
        for (let sensorMac of sensorsFilter) {
          const foundSensor = store.sensors.list.find((s) => s.mac == sensorMac)
          sensorsIds.push(foundSensor.id)
        }
      }

      if (typeof sensorsFilter === 'string') {
        const foundSensor = store.sensors.list.find((s) => s.mac == sensorsFilter)
        sensorsIds.push(foundSensor.id)
      }      
      
      if (sensorsIds.length > 0) {
        output = output.filter((dataItem) => sensorsIds.includes(dataItem.sensor_id))
      }
    }

    return new Promise((resolve) => {
      resolve(output)
    })
  }
}