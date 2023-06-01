export interface Korisnik {
  id: string;
  name: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: number;
  phone: number;
  date: Date;
  email: string;
  userId?:string;
}

