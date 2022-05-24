
export const SENSOR_TYPES = [
  // { id: 0, name: 'Temp' , sensors: [ 'temp' ] },
  { id: 0, name: 'Composite', sensors: [ 'humi', 'temp' ]},
  { id: 1, name: 'Geo', sensors: ['loc', 'humi', 'temp', 'light']}
]

const FAKE_DELAY_MS = 500

export class SensorTypesApi {
  static getList() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(SENSOR_TYPES)
      })
    }, FAKE_DELAY_MS)
  }
}