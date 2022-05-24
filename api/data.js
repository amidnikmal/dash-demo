
import { randBetweenDate } from '@ngneat/falso'
import { getRandomNumberBetween } from './helpers'
import { fakeList as fakeSensorsList } from './sensors'
import { SENSOR_TYPES } from './sensorTypes'

const FAKE_DATA_ITEMS_COUNT = 25
const FAKE_DATA_DATES_RANGE = { from: new Date('1/01/2022'), to: new Date() }

const generators = {
  temp: () => {
    return Math.random()
  },

  humi: () => {
    return Math.random()
  },

  light: () => {
    return Math.random()
  },

  loc: () => {
    const lng = Math.random()
    const lat = Math.random()
    return [lng, lat]
  }
}


const generateFakeData = () => {
  const output = []
  for (let i=0; i<FAKE_DATA_ITEMS_COUNT; i++) {
    const randomSensorIndx = getRandomNumberBetween(0, fakeSensorsList.length-1)
    const randSensor = fakeSensorsList[randomSensorIndx]

    const sensorType = SENSOR_TYPES.find((item) => item.id === randSensor.type)

    const payload = sensorType.sensors.reduce((acc, sensorKind) => {
      acc[sensorKind] = generators[sensorKind]()
      return acc
    }, {})

    output.push({
      id: i,
      sensor_type: randSensor.type,
      sensor_id: randSensor.id,
      payload,
      timestamp: randBetweenDate(FAKE_DATA_DATES_RANGE)
    })
  }

  output.sort((a,b) => {
    return (+new Date(a.timestamp)) - (+new Date(b.timestamp))
  })

  return output
}

export const fakeDataList = generateFakeData()

export class DataApi {
  static getList() {
    return new Promise((resolve) => {
      resolve(fakeDataList)
    })
  }
}