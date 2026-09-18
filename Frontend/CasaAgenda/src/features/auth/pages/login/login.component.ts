import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../../core/auth/auth.service';
import { ToastService } from '../../../../shared/ui/toast/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);

  loading = false;

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.getRawValue();
    this.loading = true;

    this.authService
      .login(username!, password!)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (success) => {
          if (success) {
            this.router.navigate(['/departamentos']);
          } else {
            this.toast.error('Usuario o contraseña incorrectos.');
          }
        },
        error: () => {
          this.toast.error('No se pudo conectar con el servidor. Probá de nuevo.');
        },
      });
  }
}
