export const getRandomMac = () => "XX:XX:XX:XX:XX:XX".replace(/X/g, function() {
  return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16))
});

export function getRandomNumberBetween(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}
