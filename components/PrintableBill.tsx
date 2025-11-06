
import React from 'react';
import { CartItem } from '../types';

interface PrintableBillProps {
    cartItems: CartItem[];
    subtotal: number;
    tax: number;
    total: number;
}

const PrintableBill: React.FC<PrintableBillProps> = ({ cartItems, subtotal, tax, total }) => {
    const now = new Date();

    if (cartItems.length === 0) {
        return null; // Don't render anything if the cart is empty
    }
    
    return (
        <div className="hidden print:block text-black p-4">
            <style>
                {`
                    @media print {
                        body {
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }
                    }
                `}
            </style>
            <div className="max-w-xs mx-auto bg-white p-6">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold">Kempiski Hotel</h1>
                    <p className="text-sm">{now.toLocaleDateString()} {now.toLocaleTimeString()}</p>
                </div>

                <div className="border-t border-b border-dashed border-gray-400 py-2">
                    <div className="grid grid-cols-12 text-sm font-bold">
                        <div className="col-span-1">QTY</div>
                        <div className="col-span-7">ITEM</div>
                        <div className="col-span-4 text-right">TOTAL</div>
                    </div>
                    {cartItems.map(item => (
                        <div key={item.id} className="grid grid-cols-12 text-sm mt-2">
                             <div className="col-span-1">{item.quantity}</div>
                             <div className="col-span-7">{item.name}</div>
                             <div className="col-span-4 text-right">Ksh{(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 text-sm">
                     <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>Ksh{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tax (8%):</span>
                        <span>Ksh{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t border-gray-400 mt-2 pt-2">
                        <span>TOTAL:</span>
                        <span>Ksh{total.toFixed(2)}</span>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <p className="font-semibold">Thank you!</p>
                </div>
            </div>
        </div>
    );
};

export default PrintableBill;
