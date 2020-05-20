self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

let intervalRef;

self.addEventListener('message', ({ data, source, waitUntil }) => {
  let timeLeft = data.time;

  const stop = () => {
    clearInterval(intervalRef);
    intervalRef = null;
    source.postMessage(0);
  };

  if (data.stop) {
    stop();
    return;
  } else if (!intervalRef) {
    waitUntil(
      new Promise((resolve) => {
        intervalRef = setInterval(() => {
          if (timeLeft > 0) {
            timeLeft -= 1;
            source.postMessage(timeLeft);
          } else {
            stop();
            resolve();
          }
        }, 1000);
      })
    );
  }
});
