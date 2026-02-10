import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router, RouterLinkActive } from '@angular/router';
import { ToastComponent } from '../../shared/ui/toast/toast-component/toast.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ToastComponent, RouterLinkActive],
  templateUrl: './LayoutComponent.component.html',
  styleUrls: ['./LayoutComponent.component.css'],
})
export class LayoutComponentComponent {
  constructor(private router: Router) {}

  ngOnInit() {}
}
