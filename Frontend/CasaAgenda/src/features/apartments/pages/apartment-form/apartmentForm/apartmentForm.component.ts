import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastService } from '../../../../../shared/ui/toast/toast.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApartmentService } from '../../../services/apartment.service';
import { ApartmentCreateDto } from '../../../models/apartmentCreateDto';

@Component({
  selector: 'app-apartmentForm',
  templateUrl: './apartmentForm.component.html',
  styleUrls: ['./apartmentForm.component.css'],
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
})
export class ApartmentFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(ApartmentService);
  submitted = false;
  apartmentForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.maxLength(150)]],
    capacity: [1, [Validators.min(1)]],
    imageUrl: [''],
  });

  constructor(
    private toast: ToastService,
    private router: Router,
  ) {}

  onSubmit() {
    this.submitted = true;
    if (this.apartmentForm.invalid) {
      this.apartmentForm.markAllAsTouched();
      return;
    }

    const dto = this.apartmentForm.getRawValue() as ApartmentCreateDto;

    this.service.create(dto).subscribe({
      next: (data) => {
        console.log('creado', data);
        this.toast.success('Departamento creado con éxito.');
        this.apartmentForm.reset();
        this.router.navigate(['/departamentos']);
      },
      error: (err) => console.error(err),
    });
  }

  onCancel() {
    this.router.navigate(['/departamentos']);
  }

  ngOnInit() {}
}
