import { Status } from '../enum/status';

export interface BookingResponseDto {
  id: number;
  apartmentId: number;
  checkIn: string;
  checkOut: string;
  guestName: string;
  people: number;
  deposit: number;
  remaining: number;
  total: number;
  status: Status;
  notes: string;
  priceNight: number;
  pricePerPerson: number;
}
