import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './LayoutComponent.component.html',
  styleUrls: ['./LayoutComponent.component.css'],
})
export class LayoutComponentComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
