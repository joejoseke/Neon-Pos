
import React from 'react';
import { CartItem } from '../types';
import { PrinterIcon, ClipboardIcon } from './Icons';

interface OrderCartProps {
    cartItems: CartItem[];
    onUpdateQuantity: (productId: number, newQuantity: number) => void;
    onClearCart: () => void;
    onCharge: () => void;
    onPrintBill: () => void;
    onPrintOrder: () => void;
}

const OrderCart: React.FC<OrderCartProps> = ({ cartItems, onUpdateQuantity, onClearCart, onCharge, onPrintBill, onPrintOrder }) => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    return (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg flex flex-col h-full shadow-lg">
            <div className="p-4 border-b border-slate-700/50 flex justify-between items-center">
                <h2 className="text-xl font-bold text-pink-400">Current Order</h2>
                <button
                    onClick={onClearCart}
                    disabled={cartItems.length === 0}
                    className="text-sm text-slate-400 hover:text-red-500 disabled:opacity-50 disabled:hover:text-slate-400 transition-colors"
                >
                    Clear Sale
                </button>
            </div>

            <div className="flex-grow p-4 overflow-y-auto">
                {cartItems.length === 0 ? (
                    <div className="text-center text-slate-400 h-full flex items-center justify-center">
                        <p>No items in cart</p>
                    </div>
                ) : (
                    <ul className="space-y-3">
                        {cartItems.map(item => (
                            <li key={item.id} className="flex items-center gap-4 bg-slate-700/30 p-2 rounded-md">
                                <div className="flex-grow">
                                    <p className="font-semibold text-slate-200">{item.name}</p>
                                    <p className="text-sm text-cyan-400">Ksh{item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="bg-slate-600 w-6 h-6 rounded-full font-bold">-</button>
                                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="bg-slate-600 w-6 h-6 rounded-full font-bold">+</button>
                                </div>
                                <p className="font-bold w-20 text-right">Ksh{(item.price * item.quantity).toFixed(2)}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="p-4 mt-auto border-t border-slate-700/50 bg-slate-800/80 rounded-b-lg">
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-slate-300">
                        <span>Subtotal</span>
                        <span>Ksh{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                        <span>Tax (8%)</span>
                        <span>Ksh{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-slate-600">
                        <span>Total</span>
                        <span>Ksh{total.toFixed(2)}</span>
                    </div>
                </div>
                <button
                    onClick={onCharge}
                    disabled={cartItems.length === 0}
                    className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 rounded-lg
                               disabled:opacity-50 disabled:from-slate-600 disabled:to-slate-700
                               hover:scale-105 transform transition-transform duration-200 shadow-lg hover:shadow-cyan-500/40"
                >
                    Charge Ksh{total.toFixed(2)}
                </button>
                <div className="mt-2 flex gap-2">
                     <button
                        onClick={onPrintOrder}
                        disabled={cartItems.length === 0}
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-600 text-slate-200 font-semibold py-2 rounded-lg
                                   disabled:opacity-50 disabled:bg-slate-700
                                   hover:bg-slate-500 transition-colors"
                    >
                        <ClipboardIcon className="w-4 h-4" />
                        Print Bill Order
                    </button>
                    <button
                        onClick={onPrintBill}
                        disabled={cartItems.length === 0}
                         className="flex-1 flex items-center justify-center gap-2 bg-slate-600 text-slate-200 font-semibold py-2 rounded-lg
                                   disabled:opacity-50 disabled:bg-slate-700
                                   hover:bg-slate-500 transition-colors"
                    >
                         <PrinterIcon className="w-4 h-4" />
                        Print Bill
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderCart;
