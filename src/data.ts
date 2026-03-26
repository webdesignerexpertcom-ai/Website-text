import { Product } from './types';

export const products: Product[] = [
  // Pickles
  {
    id: 'chintakaya-pachadi',
    name: 'Chintakaya Pachadi',
    teluguName: 'చింతకాయ పచ్చడి',
    description: 'Tangy traditional raw tamarind pickle made with fresh green tamarind and spices.',
    benefits: ['Rich in Vitamin C', 'Aids Digestion', 'Traditional Recipe'],
    image: 'https://picsum.photos/seed/tamarind/600/600',
    category: 'pickles',
    prices: [
      { weight: '250g', price: 100 },
      { weight: '500g', price: 200 },
      { weight: '1kg', price: 400 }
    ]
  },
  {
    id: 'avakaya-pachadi',
    name: 'Avakaya Pachadi',
    teluguName: 'ఆవకాయ పచ్చడి',
    description: 'Spicy traditional mango pickle made with sun-dried mangoes and mustard powder.',
    benefits: ['Authentic Andhra Taste', 'No Preservatives', 'Probiotic Rich'],
    image: 'https://picsum.photos/seed/mango-pickle/600/600',
    category: 'pickles',
    prices: [
      { weight: '250g', price: 100 },
      { weight: '500g', price: 200 },
      { weight: '1kg', price: 400 }
    ]
  },
  {
    id: 'nimmakaya-pachadi',
    name: 'Nimmakaya Pachadi',
    teluguName: 'నిమ్మకాయ పచ్చడి',
    description: 'Lemon pickle with spices',
    image: 'https://picsum.photos/seed/lemon-pickle/600/600',
    category: 'pickles',
    prices: [
      { weight: '250g', price: 100 },
      { weight: '500g', price: 200 },
      { weight: '1kg', price: 400 }
    ]
  },
  {
    id: 'usirikaya-pachadi',
    name: 'Usirikaya Pachadi',
    description: 'Gooseberry pickle with spices',
    image: 'https://picsum.photos/seed/gooseberry/600/600',
    category: 'pickles',
    prices: [
      { weight: '250g', price: 100 },
      { weight: '500g', price: 200 },
      { weight: '1kg', price: 400 }
    ]
  },
  {
    id: 'pandla-karam',
    name: 'Pandla Karam',
    description: 'Fruit pickle with spices',
    image: 'https://picsum.photos/seed/chilli-pickle/600/600',
    category: 'pickles',
    prices: [
      { weight: '250g', price: 100 },
      { weight: '500g', price: 200 },
      { weight: '1kg', price: 400 }
    ]
  },
  {
    id: 'usiri-tokku',
    name: 'Usiri Tokku',
    description: 'Gooseberry peel pickle',
    image: 'https://picsum.photos/seed/amla/600/600',
    category: 'pickles',
    prices: [
      { weight: '250g', price: 100 },
      { weight: '500g', price: 200 },
      { weight: '1kg', price: 400 }
    ]
  },
  {
    id: 'kothimeera-pachadi',
    name: 'Kothimeera Pachadi',
    description: 'Coriander pickle with spices',
    image: 'https://picsum.photos/seed/coriander/600/600',
    category: 'pickles',
    prices: [
      { weight: '250g', price: 100 },
      { weight: '500g', price: 200 },
      { weight: '1kg', price: 400 }
    ]
  },
  {
    id: 'dabbakaya-pachadi',
    name: 'Dabbakaya Pachadi',
    description: 'Indian hog plum pickle',
    image: 'https://picsum.photos/seed/plum/600/600',
    category: 'pickles',
    prices: [
      { weight: '250g', price: 100 },
      { weight: '500g', price: 200 },
      { weight: '1kg', price: 400 }
    ]
  },
  {
    id: 'gongura-pachadi',
    name: 'Gongura Pachadi',
    description: 'Sorrel leaves pickle',
    image: 'https://picsum.photos/seed/gongura/600/600',
    category: 'pickles',
    prices: [
      { weight: '250g', price: 100 },
      { weight: '500g', price: 200 },
      { weight: '1kg', price: 400 }
    ]
  },
  {
    id: 'magaya-pachadi',
    name: 'Magaya Pachadi',
    description: 'Mango ginger pickle',
    image: 'https://picsum.photos/seed/mango-ginger/600/600',
    category: 'pickles',
    prices: [
      { weight: '250g', price: 100 },
      { weight: '500g', price: 200 },
      { weight: '1kg', price: 400 }
    ]
  },
  {
    id: 'tomato-pachadi',
    name: 'Tomato Pachadi',
    description: 'Tomato pickle with spices',
    image: 'https://picsum.photos/seed/tomato-pickle/600/600',
    category: 'pickles',
    prices: [
      { weight: '250g', price: 100 },
      { weight: '500g', price: 200 },
      { weight: '1kg', price: 400 }
    ]
  },
  {
    id: 'allam-pachadi',
    name: 'Allam Pachadi',
    description: 'Ginger pickle with spices',
    image: 'https://picsum.photos/seed/ginger-pickle/600/600',
    category: 'pickles',
    prices: [
      { weight: '250g', price: 100 },
      { weight: '500g', price: 200 },
      { weight: '1kg', price: 400 }
    ]
  },

  // Powders
  {
    id: 'kandi-podi',
    name: 'Kandi Podi',
    description: 'Traditional roasted dal powder',
    image: 'https://picsum.photos/seed/dal-powder/600/600',
    category: 'powders',
    prices: [
      { weight: '250g', price: 125 },
      { weight: '500g', price: 250 },
      { weight: '1kg', price: 500 }
    ]
  },
  {
    id: 'nuvvulu-podi',
    name: 'Nuvvulu Podi',
    description: 'Sesame seed powder with spices',
    image: 'https://picsum.photos/seed/sesame-powder/600/600',
    category: 'powders',
    prices: [
      { weight: '250g', price: 125 },
      { weight: '500g', price: 250 },
      { weight: '1kg', price: 500 }
    ]
  },
  {
    id: 'dhaniyala-karam',
    name: 'Dhaniyala Karam Podi',
    description: 'Spicy coriander powder',
    image: 'https://picsum.photos/seed/coriander-powder/600/600',
    category: 'powders',
    prices: [
      { weight: '250g', price: 125 },
      { weight: '500g', price: 250 },
      { weight: '1kg', price: 500 }
    ]
  },
  {
    id: 'kobbari-podi',
    name: 'Kobbari Podi',
    description: 'Roasted coconut powder',
    image: 'https://picsum.photos/seed/coconut-powder/600/600',
    category: 'powders',
    prices: [
      { weight: '250g', price: 125 },
      { weight: '500g', price: 250 },
      { weight: '1kg', price: 500 }
    ]
  },
  {
    id: 'pappulu-podi',
    name: 'Pappulu Podi',
    description: 'Mixed lentil powder',
    image: 'https://picsum.photos/seed/lentil-powder/600/600',
    category: 'powders',
    prices: [
      { weight: '250g', price: 125 },
      { weight: '500g', price: 250 },
      { weight: '1kg', price: 500 }
    ]
  },
  {
    id: 'sambar-powder',
    name: 'Sambar Powder',
    description: 'Authentic South indian spice mix',
    image: 'https://picsum.photos/seed/sambar/600/600',
    category: 'powders',
    prices: [
      { weight: '250g', price: 125 },
      { weight: '500g', price: 250 },
      { weight: '1kg', price: 500 }
    ]
  },

  // Snacks
  {
    id: 'chakralu',
    name: 'Chakralu',
    description: 'Traditional rice flour snack',
    image: 'https://picsum.photos/seed/chakralu/600/600',
    category: 'snacks',
    prices: [
      { weight: '250g', price: 90 },
      { weight: '500g', price: 180 },
      { weight: '1kg', price: 360 }
    ]
  },
  {
    id: 'chakodilu',
    name: 'Chakodilu',
    description: 'Rice flour spiral snack',
    image: 'https://picsum.photos/seed/chakodilu/600/600',
    category: 'snacks',
    prices: [
      { weight: '250g', price: 90 },
      { weight: '500g', price: 180 },
      { weight: '1kg', price: 360 }
    ]
  },
  {
    id: 'chakkalu',
    name: 'Chakkalu',
    description: 'Classic South indian snack',
    image: 'https://picsum.photos/seed/chakkalu/600/600',
    category: 'snacks',
    prices: [
      { weight: '250g', price: 90 },
      { weight: '500g', price: 180 },
      { weight: '1kg', price: 360 }
    ]
  },
  {
    id: 'boondi',
    name: 'Boondi',
    description: 'Traditional indian snack',
    image: 'https://picsum.photos/seed/boondi/600/600',
    category: 'snacks',
    prices: [
      { weight: '250g', price: 90 },
      { weight: '500g', price: 180 },
      { weight: '1kg', price: 360 }
    ]
  },
  {
    id: 'appadalu',
    name: 'Appadalu',
    description: 'Crispy rice papad',
    image: 'https://picsum.photos/seed/papad/600/600',
    category: 'snacks',
    prices: [
      { weight: '1 Packet', price: 100 }
    ]
  },

  // Sweets
  {
    id: 'ariselu-ghee',
    name: 'Ariselu (Ghee)',
    description: 'Nutritious rice flour fritters made with ghee and jaggery',
    image: 'https://picsum.photos/seed/ariselu-ghee/600/600',
    category: 'sweets',
    prices: [
      { weight: '250g', price: 150 },
      { weight: '500g', price: 300 },
      { weight: '1kg', price: 600 }
    ]
  },
  {
    id: 'ariselu-normal',
    name: 'Ariselu (Normal)',
    description: 'Traditional rice flour fritters with jaggery (standard oil)',
    image: 'https://picsum.photos/seed/ariselu/600/600',
    category: 'sweets',
    prices: [
      { weight: '250g', price: 130 },
      { weight: '500g', price: 225 },
      { weight: '1kg', price: 450 }
    ]
  },
  {
    id: 'boondhi-ladoo',
    name: 'Boondhi Ladoo',
    description: 'Sweet and delicious round-shaped dessert made with fried boondhi soaked in sugar syrup',
    image: 'https://picsum.photos/seed/ladoo/600/600',
    category: 'sweets',
    prices: [
      { weight: '250g', price: 150 },
      { weight: '500g', price: 300 },
      { weight: '1kg', price: 600 }
    ]
  },
  {
    id: 'sunnundallu',
    name: 'Sunnundallu',
    description: 'Crunchy sweet made from peanuts and jaggery',
    image: 'https://picsum.photos/seed/sunnundallu/600/600',
    category: 'sweets',
    prices: [
      { weight: '250g', price: 150 },
      { weight: '500g', price: 300 },
      { weight: '1kg', price: 600 }
    ]
  },
  {
    id: 'dry-fruit-laddu',
    name: 'Dry Fruit Laddu',
    description: 'Nutritious balls made with mixed dry fruits',
    image: 'https://picsum.photos/seed/dry-fruit-laddu/600/600',
    category: 'sweets',
    prices: [
      { weight: '250g', price: 200 },
      { weight: '500g', price: 400 },
      { weight: '1kg', price: 800 }
    ]
  }
];
