import { getToken } from 'firebase/messaging';
import { messaging } from '../../utils/fcmSettings';

export const getFcmToken = async () => {
  return await getToken(messaging, {
    vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
  });
};
