import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpContextToken } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';

const STORAGE_KEY = 'casaagenda_auth';

// Marca los requests de login para que el interceptor NO dispare su lógica
// de "sesión vencida" (logout + redirect) ante un 401 esperado: acá un 401
// significa "usuario o contraseña incorrectos", no "se cerró la sesión".
export const SKIP_AUTH_REDIRECT = new HttpContextToken<boolean>(() => false);

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  /**
   * Intenta loguearse probando las credenciales contra un endpoint protegido.
   * No hay un endpoint de login dedicado: si las credenciales sirven para
   * traer los departamentos, sirven para todo lo demás.
   */
  login(username: string, password: string): Observable<boolean> {
    // Nos aseguramos de no arrastrar un login anterior guardado.
    this.logout();

    const basicAuth = 'Basic ' + btoa(`${username}:${password}`);

    return this.http
      .get(`${environment.apiUrl}/apartment`, {
        headers: { Authorization: basicAuth },
        context: new HttpContext().set(SKIP_AUTH_REDIRECT, true),
      })
      .pipe(
        map(() => {
          localStorage.setItem(STORAGE_KEY, basicAuth);
          return true;
        }),
        catchError(() => of(false)),
      );
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(STORAGE_KEY);
  }

  getAuthHeader(): string | null {
    return localStorage.getItem(STORAGE_KEY);
  }
}
