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
  fileIsSelected = false;
  submitted = false;
  apartmentForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.maxLength(100)]],
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

    if (this.selectedFile) {
      this.service.uploadImage(this.selectedFile).subscribe({
        next: (imageUrl: string) => {
          console.log('imageurl:', imageUrl);
          this.apartmentForm.patchValue({ imageUrl });

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
        },
        error: (err) => console.error(err),
      });
      return;
    }
  }

  onCancel() {
    this.router.navigate(['/departamentos']);
  }

  selectedFile?: File;
  imagePreview?: string;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      this.selectedFile = undefined;
      this.fileIsSelected = false;
      this.imagePreview = undefined;
      return;
    }

    this.selectedFile = input.files[0];
    this.fileIsSelected = true;

    // Preview
    this.imagePreview = URL.createObjectURL(this.selectedFile);
  }
  ngOnInit() {}

  ngOnDestroy() {
    if (this.imagePreview?.startsWith('blob:')) {
      URL.revokeObjectURL(this.imagePreview);
    }
  }
}
