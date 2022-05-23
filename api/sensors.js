import { getRandomMac, getRandomNumberBetween } from './helpers'

const FAKE_SENSROS_COUNT = 10
const FAKE_DELAY_MS = 500

const generateFakeSensors = () => {
  const output = []
  for (let i=0; i<FAKE_SENSROS_COUNT; i++) {
    output.push({
      id: i,
      mac: getRandomMac(),
      type: getRandomNumberBetween(0, 2)
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



