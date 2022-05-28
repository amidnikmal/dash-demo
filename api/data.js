
// import { randBetweenDate } from '@ngneat/falso'
// import { getRandomNumberBetween } from './helpers'
// import { fakeList as fakeSensorsList } from './sensors'
// import { SENSOR_TYPES } from './sensorTypes'
// import { data } from './sample_data'

// const FAKE_DATA_ITEMS_COUNT = 20
// const FAKE_DATA_DATES_RANGE = { from: new Date('1/01/2022'), to: new Date() }


// const generateFakeData = () => {
//   const output =
//     new Array(FAKE_DATA_ITEMS_COUNT)
//     .fill()
//     .map(() => randBetweenDate(FAKE_DATA_DATES_RANGE))
//     .sort((a,b) => a - b)
//     .map((timestamp, index) => ({ id: index, timestamp }))


//   for (let i=0; i<FAKE_DATA_ITEMS_COUNT; i++) {
//     const randomSensorIndx = getRandomNumberBetween(0, fakeSensorsList.length-1)
//     const randSensor = fakeSensorsList[randomSensorIndx] 

//     const sensorType = SENSOR_TYPES.find((item) => item.id === randSensor.type)

//     if (!sensorType) {
//       continue
//     }

//     const payload = sensorType.sensors.reduce((acc, sensorKind) => {
//       acc[sensorKind] = data[i][sensorKind]
//       return acc
//     }, {})

//     output[i] = {
//       ...output[i],
//       sensor_type: randSensor.type,
//       sensor_id: randSensor.id,
//       payload,
//     }
//   }


//   return output
// }

// // export const fakeDataList = generateFakeData()
// export const fakeDataList = []

export class DataApi {
  static getList(store) {
    return new Promise((resolve) => {
      resolve(store.fakedata.data)
    })
  }
}