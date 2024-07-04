import { Component, OnInit } from '@angular/core';
import { ToastService } from 'app/Services/toast.service';

@Component({
  selector: 'toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent{

  constructor(public toastService: ToastService) {}

  
}
