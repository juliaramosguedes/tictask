self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

let intervalRef;

self.addEventListener('message', ({ data, source, waitUntil }) => {
  let timeLeft = data.time;
  if (data.stop) {
    clearInterval(intervalRef);
    intervalRef = null;
    source.postMessage(0);
    return;
  } else if (!intervalRef) {
    waitUntil(
      new Promise((resolve) => {
        intervalRef = setInterval(() => {
          if (timeLeft > 0) {
            timeLeft -= 1;
            source.postMessage(timeLeft);
          } else {
            resolve();
          }
        }, 1000);
      })
    );
  }
});
