import { Injectable } from '@angular/core';



interface Toast {
  message: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: Toast[] = [];

  show(message: string, type: string = 'info') {
    this.toasts.push({ message, type });
  }

  remove() {
    this.toasts = [];
  }
}