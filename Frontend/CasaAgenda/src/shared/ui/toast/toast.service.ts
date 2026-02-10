import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastMessage, ToastType } from './toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly _toasts = new BehaviorSubject<ToastMessage[]>([]);
  readonly toasts$ = this._toasts.asObservable();

  success(message: string, title = 'Éxito') {
    this.show('success', message, title);
  }

  error(message: string, title = 'Error') {
    this.show('error', message, title, false, 6000);
  }

  info(message: string, title = 'Info') {
    this.show('info', message, title);
  }

  warning(message: string, title = 'Atención') {
    this.show('warning', message, title);
  }

  remove(id: string) {
    this._toasts.next(this._toasts.value.filter((t) => t.id !== id));
  }

  private show(type: ToastType, message: string, title?: string, autohide = true, delay = 3500) {
    const toast: ToastMessage = {
      id: crypto.randomUUID(),
      type,
      title,
      message,
      autohide,
      delay,
    };

    this._toasts.next([...this._toasts.value, toast]);

    if (autohide) {
      window.setTimeout(() => this.remove(toast.id), delay);
    }
  }

  constructor() {}
}
