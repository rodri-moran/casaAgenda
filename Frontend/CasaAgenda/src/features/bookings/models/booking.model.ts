import { Status } from '../enum/status';

export interface Booking {
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
  notes?: string;
  nights: number;
  priceNight: number;
  pricePerPerson: number;
}
