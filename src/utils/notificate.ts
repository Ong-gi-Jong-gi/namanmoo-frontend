const publicVapidKey = import.meta.env.VITE_API_KEY;

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function subscribeUser() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey as string),
        })
        .then((subscription) => {
          console.log('User is subscribed:', subscription);

          // // 서버로 구독 정보 전송
          // fetch('/subscribe', {
          //   method: 'POST',
          //   body: JSON.stringify(subscription),
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          // });
        })
        .catch((err) => {
          console.log('Failed to subscribe the user: ', err);
        });
    });
  }
}
