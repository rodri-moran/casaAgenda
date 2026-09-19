import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService, SKIP_AUTH_REDIRECT } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si el request ya trae su propio header de autenticación (por ejemplo,
  // el intento de login probando credenciales nuevas), no lo pisamos con
  // lo que haya guardado de una sesión anterior.
  const storedAuthHeader = authService.getAuthHeader();
  const authReq =
    !req.headers.has('Authorization') && storedAuthHeader
      ? req.clone({ setHeaders: { Authorization: storedAuthHeader } })
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
