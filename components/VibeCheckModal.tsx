
import React, { useState, useCallback } from 'react';
import { suggestCocktail } from '../services/geminiService';
import { Product } from '../types';
import { SparklesIcon } from './Icons';
import { PRODUCTS } from '../constants';

interface VibeCheckModalProps {
    menu: Product[];
    onClose: () => void;
    onSelectProduct: (product: Product) => void;
}

// A simple markdown-to-JSX parser for the Gemini response
const GeminiResponse: React.FC<{ text: string }> = ({ text }) => {
    // Looks for **Drink Name** - *Description*
    const match = text.match(/\*\*(.*?)\*\* - \*(.*?)\*/);

    if (match) {
        const [, name, description] = match;
        return (
            <div>
                <h3 className="text-2xl font-bold text-cyan-400">{name}</h3>
                <p className="mt-2 text-slate-300 italic">{description}</p>
            </div>
        );
    }

    // Fallback for any other format
    return <p className="text-slate-300">{text}</p>;
};


const VibeCheckModal: React.FC<VibeCheckModalProps> = ({ menu, onClose, onSelectProduct }) => {
    const [vibe, setVibe] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [suggestion, setSuggestion] = useState<string | null>(null);

    const handleGetSuggestion = useCallback(async () => {
        if (!vibe.trim()) return;
        setIsLoading(true);
        setSuggestion(null);
        const result = await suggestCocktail(vibe, menu);
        setSuggestion(result);
        setIsLoading(false);
    }, [vibe, menu]);
    
    const handleAddToOrder = (suggestionText: string) => {
        const match = suggestionText.match(/\*\*(.*?)\*\*/);
        if (match) {
            const productName = match[1];
            const product = PRODUCTS.find(p => p.name.toLowerCase() === productName.toLowerCase());
            if (product) {
                onSelectProduct(product);
                onClose();
            }
        }
    };


    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div 
                className="relative bg-slate-800 border border-pink-500/50 rounded-xl shadow-2xl shadow-pink-500/20 w-full max-w-lg m-4
                           transform transition-all duration-300 scale-95 animate-fade-in"
                onClick={e => e.stopPropagation()}
            >
                <style>{`
                    @keyframes fade-in {
                        from { opacity: 0; transform: scale(0.95); }
                        to { opacity: 1; transform: scale(1); }
                    }
                    .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
                `}</style>

                <div className="p-8">
                    <div className="text-center">
                        <SparklesIcon className="w-10 h-10 mx-auto text-pink-500" />
                        <h2 className="text-3xl font-bold mt-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                            Vibe Check
                        </h2>
                        <p className="text-slate-400 mt-2">Describe the customer's mood or craving to get a drink suggestion.</p>
                    </div>

                    <div className="mt-6">
                        <textarea
                            value={vibe}
                            onChange={(e) => setVibe(e.target.value)}
                            placeholder="e.g., 'something fruity and refreshing', 'a strong, classic drink for a celebration'"
                            className="w-full h-24 p-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleGetSuggestion}
                            disabled={isLoading || !vibe.trim()}
                            className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-4 py-3 rounded-lg 
                                       shadow-lg hover:scale-105 transform transition-transform duration-200 disabled:opacity-50 disabled:hover:scale-100"
                        >
                            {isLoading ? 'Thinking...' : 'Get Suggestion'}
                        </button>
                    </div>

                    {suggestion && !isLoading && (
                        <div className="mt-6 p-4 bg-slate-700/30 border border-slate-600 rounded-lg">
                            <GeminiResponse text={suggestion} />
                            <button 
                                onClick={() => handleAddToOrder(suggestion)}
                                className="mt-4 text-sm bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-3 py-1 rounded-md"
                            >
                                Add to Order
                            </button>
                        </div>
                    )}
                     {isLoading && (
                        <div className="mt-6 p-4 text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto"></div>
                            <p className="text-slate-400 mt-2">Crafting the perfect drink...</p>
                        </div>
                    )}
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-slate-500 hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default VibeCheckModal;
