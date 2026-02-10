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

@Component({
  selector: 'app-apartmentForm',
  templateUrl: './apartmentForm.component.html',
  styleUrls: ['./apartmentForm.component.css'],
  imports: [ReactiveFormsModule, RouterLink],
})
export class ApartmentFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  apartmentForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.maxLength(100)]],
    capacity: [1, [Validators.min(1)]],
    imageUrl: [''],
    priceNight: [0, [Validators.required, Validators.min(1)]],
  });

  constructor(
    private toast: ToastService,
    private router: Router,
  ) {}
  onSubmit() {
    if (this.apartmentForm.invalid) {
      this.toast.error('Revisá los campos obligatorios.');
      this.apartmentForm.markAllAsTouched();
      return;
    }

    this.toast.success('Departamento creado con éxito.');
  }

  onCancel() {
    this.router.navigate(['/layout/departamentos']);
  }

  selectedFile?: File;
  imagePreview?: string;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    this.selectedFile = input.files[0];

    // Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(this.selectedFile);
  }

  ngOnInit() {}
}
