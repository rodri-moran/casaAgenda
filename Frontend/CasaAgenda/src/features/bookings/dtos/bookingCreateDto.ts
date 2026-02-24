export interface BookingCreateDto {
  apartmentId: number;
  checkIn: string;
  checkOut: string;
  guestName: string;
  people: number;
  deposit: number;
  remaining: number;
  total: number;
  notes?: string;
  priceNight: number;
  pricePerPerson: number;
}