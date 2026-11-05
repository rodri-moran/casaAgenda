import { Component, EventEmitter, inject, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApartmentService } from '../../services/apartment.service';
import { ApartmentResponseDto } from '../../models/apartmentResponseDto';
import { ToastService } from '../../../../shared/ui/toast/toast.service';

declare const window: any;

@Component({
  selector: 'app-apartment-edit-modal',
  standalone: true,
  templateUrl: './apartment-edit-modal.component.html',
  styleUrls: ['./apartment-edit-modal.component.css'],
  imports: [ReactiveFormsModule],
})
export class ApartmentEditModalComponent implements OnChanges {
  private fb = inject(FormBuilder);
  private service = inject(ApartmentService);
  private toast = inject(ToastService);

  @Input() apartment: ApartmentResponseDto | null = null;
  @Output() updated = new EventEmitter<ApartmentResponseDto>();

  saving = false;

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(60)]],
    capacity: [1, [Validators.required, Validators.min(1)]],
    description: ['', [Validators.maxLength(150)]],
  });

  ngOnChanges() {
    if (!this.apartment) return;
    this.form.reset({
      name: this.apartment.name,
      capacity: this.apartment.capacity,
      description: this.apartment.description ?? '',
    });
  }

  changeCapacity(delta: number) {
    const ctrl = this.form.controls.capacity;
    ctrl.setValue(Math.max(1, Number(ctrl.value) + delta));
    ctrl.markAsTouched();
  }

  onSubmit() {
    if (!this.apartment) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.getRawValue();
    this.saving = true;
    this.service
      .update(this.apartment.id, {
        name: v.name.trim(),
        capacity: Number(v.capacity),
        description: v.description.trim(),
      })
      .subscribe({
        next: (updated) => {
          this.saving = false;
          this.toast.success('Departamento actualizado.');
          this.updated.emit(updated);
          this.hide();
        },
        error: (err) => {
          this.saving = false;
          console.error(err);
          this.toast.error('No se pudieron guardar los cambios.');
        },
      });
  }

  show() {
    this.modal()?.show();
  }

  hide() {
    this.modal()?.hide();
  }

  private modal() {
    const el = document.getElementById('apartmentEditModal');
    if (!el) return null;
    return window.bootstrap.Modal.getOrCreateInstance(el);
  }
}
