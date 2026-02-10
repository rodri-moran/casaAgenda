export interface Apartment {
  id: number;
  name: string;
  description?: string;
  capacity: number;
  imageUrl?: string;
  pricePerPerson: number;
}
