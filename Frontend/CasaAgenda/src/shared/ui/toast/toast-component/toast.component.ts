import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../toast.service';
import { ToastMessage } from '../toast.model';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  imports: [CommonModule],
})
export class ToastComponent {
  toasts$;

  constructor(private toastService: ToastService) {
    this.toasts$ = this.toastService.toasts$;
  }

  close(toast: ToastMessage) {
    this.toastService.remove(toast.id);
  }

  toastClass(toast: ToastMessage): string {
    switch (toast.type) {
      case 'success':
        return 'text-bg-success';
      case 'error':
        return 'text-bg-danger';
      case 'warning':
        return 'text-bg-warning';
      case 'info':
        return 'text-bg-info';
      default:
        return 'text-bg-secondary';
    }
  }

  icon(toast: ToastMessage): string {
    switch (toast.type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '🔔';
    }
  }

  ngOnInit() {}
}
