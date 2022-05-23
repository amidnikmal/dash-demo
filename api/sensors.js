

const getRandomMac = () => "XX:XX:XX:XX:XX:XX".replace(/X/g, function() {
  return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16))
});


console.log("!!!!", getRandomMac())
export class SensorsApi {
    static getList() {
        return new Promise((resolve) => {
            resolve([1, 2, 3])
        })
    }
}