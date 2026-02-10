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
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  nights: number;
  priceNight: number;
  pricePerPerson: number;
}
