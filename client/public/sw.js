self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('message', ({ data, source: { id } }) => {
  // if (data.stop) {
  //   for (var i = 1; i < 99999; i++) clearInterval(i);
  // }
  console.log(data);
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      let timeLeft = data.time;

      if (client.id === id) {
        const intervalId = setInterval(() => {
          if (timeLeft <= 0 || data.stop) {
            console.log('caiu no if');
            clearInterval(intervalId);
            for (var i = 1; i < 99999; i++) clearInterval(i);
            client.postMessage(0);
          }
          if (timeLeft > 0 && !data.stop) {
            timeLeft -= 1;
            client.postMessage(timeLeft);
            console.log('caiu no else');
          }
        }, 1000);
      }
    });
  });
});
