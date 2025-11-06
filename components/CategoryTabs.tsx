
import React from 'react';
import { Category } from '../types';
import { BeerIcon, WineIcon, ShotGlassIcon, SodaIcon, FoodIcon } from './Icons';

interface CategoryTabsProps {
    categories: Category[];
    selectedCategory: Category;
    onSelectCategory: (category: Category) => void;
}

const categoryIconMap: Record<Category, (props: React.SVGProps<SVGSVGElement>) => React.ReactElement> = {
    'Beer': BeerIcon,
    'Wine': WineIcon,
    'Spirits': ShotGlassIcon,
    'Soft Drinks': SodaIcon,
    'Misc': FoodIcon,
};

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <div className="mt-4 overflow-x-auto">
            <div className="flex space-x-2 pb-2">
                {categories.map(category => {
                    const Icon = categoryIconMap[category];
                    const isSelected = category === selectedCategory;
                    return (
                        <button
                            key={category}
                            onClick={() => onSelectCategory(category)}
                            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                                isSelected
                                    ? 'bg-pink-600 text-white shadow-md shadow-pink-500/30'
                                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/70 hover:text-white'
                            }`}
                        >
                            <Icon className="w-5 h-5" />
                            {category}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryTabs;
