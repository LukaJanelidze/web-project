export interface Store {
    id: string;
    ownerId: string;
    title: string;
    image: string;
    description: string;
    phone: string;
    location: string;
  }

  export const storesData: Store[] = [
    {
      id: '1',
      ownerId: 'user123',
      title: 'Ori Nabiji',
      image: '/public/images/shops.jpg',
      description: 'Best tech shop in Batumi!',
      phone: '555 555 555',
      location: 'ბათუმი'
    },
    {
      id: '2',
      ownerId: 'user124',
      title: 'Libre',
      image: '/public/images/shops.jpg',
      description: 'Cool fashion store',
      phone: '555 444 333',
      location: 'თბილისი'
    },
  ];