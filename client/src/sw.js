self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('message', ({ data }) => {
  const intervalId = setInterval(() => {
    const timeLeft = data.time - 1;
    self.postMessage(timeLeft);
  }, 1000);

  if (data?.time === 0) {
    clearInterval(intervalId);
  }
});
