import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateRangeValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const checkIn = group.get('checkIn')?.value;
    const checkOut = group.get('checkOut')?.value;

    if (!checkIn || !checkOut) return null;

    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);

    if (outDate <= inDate) {
      return { invalidDateRange: true };
    }

    return null;
  };
}
