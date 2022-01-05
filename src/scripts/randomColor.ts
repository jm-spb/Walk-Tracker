// Call randomColor with a value from 0-255, indicitating how bright the color should be.
function getRandomColor(brightness: number) {
  function randomChannel(channelBrightness: number) {
    const r = 255 - channelBrightness;
    const n = 0 || Math.round(Math.random() * r) + channelBrightness;
    const s = n.toString(16);
    return s.length === 1 ? `0${s}` : s;
  }
  return `#${randomChannel(brightness)}${randomChannel(brightness)}${randomChannel(
    brightness,
  )}`;
}

export default getRandomColor;
