
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Product, CartItem, Category } from './types';
import { PRODUCTS, CATEGORIES } from './constants';
import ProductGrid from './components/ProductGrid';
import OrderCart from './components/OrderCart';
import CategoryTabs from './components/CategoryTabs';
import VibeCheckModal from './components/VibeCheckModal';
import LoginScreen from './components/LoginScreen';
import { SparklesIcon, LockIcon } from './components/Icons';
import PrintableBill from './components/PrintableBill';
import PrintableOrder from './components/PrintableOrder';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [products, setProducts] = useState<Product[]>(PRODUCTS);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [currentCategory, setCurrentCategory] = useState<Category>('Beer');
    const [isVibeCheckOpen, setIsVibeCheckOpen] = useState(false);
    const [saleComplete, setSaleComplete] = useState(false);
    const [saleTotal, setSaleTotal] = useState(0);
    const [printingMode, setPrintingMode] = useState<'bill' | 'order' | null>(null);

    useEffect(() => {
        const afterPrint = () => {
            setPrintingMode(null);
        };
        window.addEventListener('afterprint', afterPrint);
        return () => {
            window.removeEventListener('afterprint', afterPrint);
        };
    }, []);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setCart([]);
    };

    const handleAddToCart = useCallback((product: Product) => {
        const productInState = products.find(p => p.id === product.id);
        if (!productInState || productInState.stock <= 0) return;

        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            const currentQuantityInCart = existingItem ? existingItem.quantity : 0;

            if (productInState.stock > currentQuantityInCart) {
                if (existingItem) {
                    return prevCart.map(item =>
                        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                    );
                }
                return [...prevCart, { ...product, quantity: 1, stock: productInState.stock }];
            }
            return prevCart;
        });
    }, [products]);

    const handleUpdateQuantity = useCallback((productId: number, newQuantity: number) => {
        const productInState = products.find(p => p.id === productId);
        if (!productInState) return;
        
        if (newQuantity <= 0) {
            setCart(prevCart => prevCart.filter(item => item.id !== productId));
        } else if (newQuantity <= productInState.stock) {
            setCart(prevCart =>
                prevCart.map(item =>
                    item.id === productId ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    }, [products]);

    const handleClearCart = useCallback(() => {
        setCart([]);
    }, []);

    const { subtotal, tax, total } = useMemo(() => {
        const currentSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const currentTax = currentSubtotal * 0.08;
        const currentTotal = currentSubtotal + currentTax;
        return { subtotal: currentSubtotal, tax: currentTax, total: currentTotal };
    }, [cart]);

    const handleCharge = useCallback(() => {
        if (cart.length === 0) return;

        setProducts(prevProducts => {
            const newProducts = [...prevProducts];
            cart.forEach(cartItem => {
                const productIndex = newProducts.findIndex(p => p.id === cartItem.id);
                if (productIndex !== -1) {
                    newProducts[productIndex].stock -= cartItem.quantity;
                }
            });
            return newProducts;
        });
        
        setSaleTotal(total);
        setSaleComplete(true);
        handleClearCart();
        
        setTimeout(() => setSaleComplete(false), 2000);
    }, [cart, handleClearCart, total]);
    
    const handlePrintBill = useCallback(() => {
        if (cart.length === 0) return;
        setPrintingMode('bill');
    }, [cart]);

    useEffect(() => {
        if (printingMode) {
            window.print();
        }
    }, [printingMode]);

    const handlePrintOrder = useCallback(() => {
        if (cart.length === 0) return;
        setPrintingMode('order');
    }, [cart]);

    const filteredProducts = useMemo(() => {
        return products.filter(product => product.category === currentCategory);
    }, [currentCategory, products]);

    if (!isAuthenticated) {
        return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <>
            {printingMode === 'bill' && <PrintableBill cartItems={cart} subtotal={subtotal} tax={tax} total={total} />}
            {printingMode === 'order' && <PrintableOrder cartItems={cart} />}
            
            <div className={`min-h-screen bg-slate-900 text-white font-sans flex flex-col ${printingMode ? 'print:hidden' : ''}`}>
                <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10 p-4 border-b border-slate-700/50">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl sm:text-2xl font-bold text-cyan-400 tracking-wider">
                            NEON <span className="text-pink-500">POS</span>
                        </h1>
                        <div className="flex items-center gap-2 sm:gap-4">
                            <button
                                onClick={() => setIsVibeCheckOpen(true)}
                                className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-200"
                            >
                                <SparklesIcon className="w-5 h-5" />
                                <span className="hidden sm:inline">Vibe Check</span>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 bg-slate-700 text-slate-300 font-semibold px-4 py-2 rounded-lg shadow-lg hover:bg-slate-600 hover:text-white transform transition-colors duration-200"
                                aria-label="Logout"
                            >
                                <LockIcon className="w-5 h-5" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                    <CategoryTabs
                        categories={CATEGORIES}
                        selectedCategory={currentCategory}
                        onSelectCategory={setCurrentCategory}
                    />
                </header>

                <main className="flex-grow flex flex-col md:flex-row p-4 gap-4">
                    <div className="flex-grow">
                        <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
                    </div>
                    <div className="w-full md:w-96 lg:w-[420px] flex-shrink-0">
                        <OrderCart
                            cartItems={cart}
                            onUpdateQuantity={handleUpdateQuantity}
                            onClearCart={handleClearCart}
                            onCharge={handleCharge}
                            onPrintBill={handlePrintBill}
                            onPrintOrder={handlePrintOrder}
                        />
                    </div>
                </main>
                
                {isVibeCheckOpen && (
                    <VibeCheckModal 
                        menu={products} 
                        onClose={() => setIsVibeCheckOpen(false)} 
                        onSelectProduct={handleAddToCart}
                    />
                )}
                
                {saleComplete && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-slate-800 border border-green-500 rounded-lg p-8 text-center shadow-2xl shadow-green-500/20">
                            <h2 className="text-3xl font-bold text-green-400">Sale Complete!</h2>
                            <p className="text-slate-300 mt-2 text-lg">Ksh {saleTotal.toFixed(2)}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default App;
