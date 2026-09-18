import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponentComponent } from "../layout/LayoutComponent/LayoutComponent.component";
import { ToastComponent } from '../shared/ui/toast/toast-component/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LayoutComponentComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('CasaAgenda');
}
