import { getFcmToken } from '../apis/auth/fcmToken';
import { registerServiceWorker } from './fcmNotification';

export const requestPermission = async () => {
  console.log('권한 요청 중...');
  const permission = await Notification.requestPermission();

  registerServiceWorker();

  getFcmToken().then((token) => {
    console.log(token);
  });

  if (permission === 'granted') {
    console.log('알림 권한이 허용됨');

    // FCM 메세지 처리
  } else {
    console.log('알림 권한 허용 안됨');
  }
};
