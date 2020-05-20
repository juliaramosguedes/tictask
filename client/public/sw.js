self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

let intervalRef;

self.addEventListener('message', ({ data, source }) => {
  let timeLeft = data.time;
  if (data.stop) {
    clearInterval(intervalRef);
    source.postMessage(0);
    return;
  }
  intervalRef = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft -= 1;
      source.postMessage(timeLeft);
    }
  }, 1000);
});
