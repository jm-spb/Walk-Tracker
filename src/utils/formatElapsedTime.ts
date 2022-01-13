const formatElapsedTime = (seconds: number) => {
  const elapsedTime = new Date(seconds * 1000).toISOString().substr(11, 8).split(':');

  const hours = Number(elapsedTime[0]) ? `${elapsedTime[0]} h` : '';
  const min = Number(elapsedTime[1]) ? `${elapsedTime[1]} min` : '';
  const sec = Number(elapsedTime[2]) ? `${elapsedTime[2]} sec` : '';
  return `${hours} ${min} ${sec}`;
};

export default formatElapsedTime;
