import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponentComponent } from "../layout/LayoutComponent/LayoutComponent.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LayoutComponentComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('CasaAgenda');
}
