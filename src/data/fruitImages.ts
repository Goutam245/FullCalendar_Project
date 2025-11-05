import { FruitImage } from '@/types/calendar';

export const fruitImages: FruitImage[] = [
  { id: 1, name: 'Apple', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop', description: 'A crisp and delicious apple' },
  { id: 2, name: 'Apricot', image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=400&fit=crop', description: 'Sweet and tangy apricot' },
  { id: 3, name: 'Banana', image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=400&fit=crop', description: 'A tropical yellow banana' },
  { id: 4, name: 'Cherry', image: 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=400&h=400&fit=crop', description: 'Red and juicy cherries' },
  { id: 5, name: 'Grapes', image: 'https://images.unsplash.com/photo-1599819177153-1c81a3d0b9eb?w=400&h=400&fit=crop', description: 'Fresh green grapes' },
  { id: 6, name: 'Mango', image: 'https://images.unsplash.com/photo-1605027990121-cbae9d3d8bda?w=400&h=400&fit=crop', description: 'A popular variety found in the Caribbean and South American countries' },
  { id: 7, name: 'Orange', image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop', description: 'Citrus orange fruit' },
  { id: 8, name: 'Peach', image: 'https://images.unsplash.com/photo-1629828874514-d05e258f7de3?w=400&h=400&fit=crop', description: 'Soft and fuzzy peach' },
  { id: 9, name: 'Pomegranate', image: 'https://images.unsplash.com/photo-1570437861934-1e25b0e07bc2?w=400&h=400&fit=crop', description: 'Ruby red pomegranate seeds' },
];

export const getFruitForDate = (date: Date, eventPhoto?: string): FruitImage => {
  if (eventPhoto) {
    return { id: 0, name: 'Event Photo', image: eventPhoto };
  }
  
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const fruitIndex = ((dayOfYear - 1) % fruitImages.length);
  
  return fruitImages[fruitIndex];
};
