import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { ApartmentCardComponent } from '../../../components/apartment-card/apartmentCard.component';
import { Router, RouterLink } from '@angular/router';
import { ApartmentService } from '../../../services/apartment.service';
import { ApartmentResponseDto } from '../../../models/apartmentResponseDto';
import { ApartmentEditModalComponent } from '../../../dialogs/apartment-edit-modal/apartment-edit-modal.component';

@Component({
  standalone: true,
  selector: 'app-apartmentList',
  templateUrl: './apartmentList.component.html',
  styleUrls: ['./apartmentList.component.css'],
  imports: [ApartmentCardComponent, RouterLink, ApartmentEditModalComponent],
})
export class ApartmentListComponent implements OnInit {
  private service = inject(ApartmentService);
  private router = inject(Router);

  // null = todavía cargando
  apartments = signal<ApartmentResponseDto[] | null>(null);
  editing = signal<ApartmentResponseDto | null>(null);

  private editModal = viewChild.required(ApartmentEditModalComponent);

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (list) => this.apartments.set(list),
      error: (error) => {
        console.error('Error loading apartments', error);
        this.apartments.set([]);
      },
    });
  }

  goToBookings(apartmentId: number) {
    this.router.navigate(['/reservas'], {
      queryParams: { depto: apartmentId },
    });
  }

  openEdit(apartment: ApartmentResponseDto) {
    this.editing.set(apartment);
    // Se abre en el siguiente ciclo, cuando el modal ya recibió el departamento.
    setTimeout(() => this.editModal().show());
  }

  onUpdated(updated: ApartmentResponseDto) {
    this.apartments.update((list) =>
      (list ?? []).map((a) => (a.id === updated.id ? updated : a)),
    );
  }
}
