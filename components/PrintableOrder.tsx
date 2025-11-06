
import React from 'react';
import { CartItem } from '../types';

interface PrintableOrderProps {
    cartItems: CartItem[];
}

const PrintableOrder: React.FC<PrintableOrderProps> = ({ cartItems }) => {
    const now = new Date();

    if (cartItems.length === 0) {
        return null;
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
                <div className="text-center mb-4">
                    <h1 className="text-xl font-bold uppercase">Order Ticket</h1>
                    <p className="text-xs">{now.toLocaleDateString()} {now.toLocaleTimeString()}</p>
                </div>

                <div className="border-t border-b border-dashed border-gray-400 py-2">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex items-center text-lg mt-2">
                             <div className="font-bold w-8">{item.quantity}x</div>
                             <div className="flex-grow">{item.name}</div>
                        </div>
                    ))}
                </div>
                 <div className="text-center mt-4">
                    <p className="text-xs">--- End of Order ---</p>
                </div>
            </div>
        </div>
    );
};

export default PrintableOrder;
