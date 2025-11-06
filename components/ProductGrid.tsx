
import React from 'react';
import { Product } from '../types';
import { WarningIcon } from './Icons';

interface ProductGridProps {
    products: Product[];
    onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<{ product: Product; onAddToCart: (product: Product) => void }> = ({ product, onAddToCart }) => {
    const Icon = product.icon;
    const isOutOfStock = product.stock <= 0;
    const isLowStock = !isOutOfStock && product.stock < 10;

    return (
        <button
            onClick={() => onAddToCart(product)}
            disabled={isOutOfStock}
            className={`group relative bg-slate-800 rounded-lg p-4 text-center flex flex-col items-center justify-between aspect-square
                       border ${isLowStock ? 'border-yellow-500/80 shadow-md shadow-yellow-500/10' : 'border-slate-700/50'}
                       transform transition-all duration-300
                       ${isOutOfStock ? 'opacity-50' : 'hover:border-pink-500/50 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20'}`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900/50 opacity-50 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            <div className="relative z-10 flex flex-col items-center justify-center flex-grow">
                <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 group-hover:text-pink-500 transition-colors duration-300 mb-2" />
                <h3 className="text-sm sm:text-base font-semibold text-slate-200 group-hover:text-white transition-colors duration-300">{product.name}</h3>
                {isLowStock && (
                    <div className="flex items-center justify-center gap-1 mt-1">
                        <WarningIcon className="w-3.5 h-3.5 text-yellow-400" />
                        <p className="text-xs text-yellow-400 font-bold">Only {product.stock} left!</p>
                    </div>
                )}
            </div>
            <p className="relative z-10 text-lg font-bold text-cyan-300">Ksh{product.price.toFixed(2)}</p>
            {isOutOfStock && (
                <div className="absolute inset-0 bg-slate-900/80 rounded-lg flex items-center justify-center z-20">
                    <span className="text-red-500 font-bold text-lg">OUT OF STOCK</span>
                </div>
            )}
        </button>
    );
};

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
        </div>
    );
};

export default ProductGrid;
