import { Component, inject } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgClass],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {
  protected readonly notificationService = inject(NotificationService);
}
