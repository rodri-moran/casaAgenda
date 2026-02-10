import { Routes } from '@angular/router';
import { LayoutComponentComponent } from '../layout/LayoutComponent/LayoutComponent.component';
import { ApartmentListComponent } from '../features/apartments/pages/apartment-list/apartmentList/apartmentList.component';
import { BookingsPageComponent } from '../features/bookings/pages/bookings-page/bookings-page/bookings-page.component';
import { ApartmentFormComponent } from '../features/apartments/pages/apartment-form/apartmentForm/apartmentForm.component';
import { AvailabilityPageComponent } from '../features/availability/pages/availability-page/availability-page/availability-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'departamentos', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponentComponent,
    children: [
      { path: 'departamentos', component: ApartmentListComponent },
      { path: 'reservas', component: BookingsPageComponent },
      { path: 'crearDepartamento', component: ApartmentFormComponent },
      { path: 'disponibilidad', component: AvailabilityPageComponent },
    ],
  },
];
