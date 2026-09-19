import { Routes } from '@angular/router';
import { LayoutComponentComponent } from '../layout/LayoutComponent/LayoutComponent.component';
import { ApartmentListComponent } from '../features/apartments/pages/apartment-list/apartmentList/apartmentList.component';
import { BookingsPageComponent } from '../features/bookings/pages/bookings-page/bookings-page/bookings-page.component';
import { ApartmentFormComponent } from '../features/apartments/pages/apartment-form/apartmentForm/apartmentForm.component';
import { AvailabilityPageComponent } from '../features/availability/pages/availability-page/availability-page/availability-page.component';
import { CalculatorPageComponent } from '../features/calculator/pages/calculator-page/calculator-page/calculator-page.component';
import { LoginComponent } from '../features/auth/pages/login/login.component';
import { HomeComponent } from '../features/home/pages/home/home.component';
import { authGuard } from '../core/auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponentComponent,
    canActivate: [authGuard],
    children: [
      { path: 'inicio', component: HomeComponent },
      { path: 'departamentos', component: ApartmentListComponent },
      { path: 'reservas', component: BookingsPageComponent },
      { path: 'crearDepartamento', component: ApartmentFormComponent },
      { path: 'disponibilidad', component: AvailabilityPageComponent },
      { path: 'calculadora', component: CalculatorPageComponent },
    ],
  },
];
