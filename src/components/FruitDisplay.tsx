import { FruitImage } from '@/types/calendar';

interface FruitDisplayProps {
  fruit: FruitImage;
}

const FruitDisplay = ({ fruit }: FruitDisplayProps) => {
  return (
    <div className="flex flex-col items-center gap-3 p-4 border rounded-lg bg-card">
      <div className="w-full aspect-square max-w-xs overflow-hidden rounded-lg">
        <img
          src={fruit.image}
          alt={fruit.name}
          className="w-full h-full object-cover"
        />
      </div>
      {fruit.description && (
        <p className="text-sm text-muted-foreground text-center">
          {fruit.description}
        </p>
      )}
    </div>
  );
};

export default FruitDisplay;
