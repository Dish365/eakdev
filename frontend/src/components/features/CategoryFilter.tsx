'use client';

import { Button } from '@/components/ui/Button';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex justify-center gap-4 mb-12">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'primary' : 'ghost'}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
} 