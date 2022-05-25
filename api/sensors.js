import { getRandomMac, getRandomNumberBetween } from './helpers'
import { SENSOR_TYPES } from './sensorTypes'
const FAKE_SENSROS_COUNT = 1
const FAKE_DELAY_MS = 500

const generateFakeSensors = () => {
  const output = []
  for (let i=0; i<FAKE_SENSROS_COUNT; i++) {
    output.push({
      id: i,
      mac: getRandomMac(),
      type: getRandomNumberBetween(0, SENSOR_TYPES.length-1),
      timestamp: new Date()
    })
  }
  
  return output
}

export const fakeList = generateFakeSensors()

export class SensorsApi {
  static getList() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(fakeList)
      }, FAKE_DELAY_MS)
    })
  }
}



