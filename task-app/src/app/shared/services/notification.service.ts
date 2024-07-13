import { Injectable, signal } from '@angular/core';
import { AppNotification } from '../types/notification.type';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  activeNotifications = signal<AppNotification[]>([]);

  success(notificationTitle: string, notificationText: string) {
    const newNotification: AppNotification = {
      title: notificationTitle,
      text: notificationText,
      type: 'success',
    };
    this.activeNotifications.update((currentNotification) => [
      ...currentNotification,
      newNotification,
    ]);
    setTimeout(() => {
      this.removeNotification(newNotification);
    }, 5000);
  }

  error(notificationTitle: string, notificationText: string) {
    const newNotification: AppNotification = {
      title: notificationTitle,
      text: notificationText,
      type: 'error',
    };
    this.activeNotifications.update((currentNotification) => [
      ...currentNotification,
      newNotification,
    ]);
    setTimeout(() => {
      this.removeNotification(newNotification);
    }, 5000);
  }

  removeNotification(notification: AppNotification) {
    this.activeNotifications.update((notifications) => {
      const index = notifications.indexOf(notification);
      if (index !== -1) {
        notifications.splice(index, 1);
      }
      return [...notifications];
    });
  }
}
