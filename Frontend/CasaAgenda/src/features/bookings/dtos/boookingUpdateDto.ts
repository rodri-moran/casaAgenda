import { Status } from '../enum/status';

export interface BookingUpdateDto {
  apartmentId?: number;
  checkIn?: string;
  checkOut?: string;
  guestName?: string;
  people?: number;
  deposit?: number;
  priceNight?: number;
  pricePerPerson?: number;
  notes?: string;
  total?: number;
  remaining?: number;
}
