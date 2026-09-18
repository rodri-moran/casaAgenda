import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService, SKIP_AUTH_REDIRECT } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const authHeader = authService.getAuthHeader();
  const authReq = authHeader
    ? req.clone({ setHeaders: { Authorization: authHeader } })
    : req;

  return next(authReq).pipe(
    catchError((err) => {
      if (err.status === 401 && !req.context.get(SKIP_AUTH_REDIRECT)) {
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => err);
    }),
  );
};
