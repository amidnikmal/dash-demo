// import { getRandomMac, getRandomNumberBetween } from './helpers'

// // export const fakeList = generateFakeSensors()

// export const fakeList = []

const FAKE_DELAY_MS = 500

export class SensorsApi {
  static getList(store) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(store.fakedata.sensors)
      }, FAKE_DELAY_MS)
    })
  }
}



