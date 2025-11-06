
import React, { useState, useEffect, useCallback } from 'react';

interface LoginScreenProps {
    onLoginSuccess: () => void;
}

const CORRECT_PIN = '1234';

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
    const [pin, setPin] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = useCallback(() => {
        if (pin === CORRECT_PIN) {
            onLoginSuccess();
        } else {
            setError('Invalid PIN');
            setTimeout(() => {
                setPin('');
                setError('');
            }, 1000);
        }
    }, [pin, onLoginSuccess]);

    useEffect(() => {
        if (pin.length === 4) {
            handleSubmit();
        }
    }, [pin, handleSubmit]);

    const handleKeyPress = (key: string) => {
        if (pin.length < 4) {
            setPin(prevPin => prevPin + key);
        }
    };

    const handleClear = () => {
        setPin('');
        setError('');
    };
    
    const handleDelete = () => {
        setPin(prevPin => prevPin.slice(0, -1));
        setError('');
    };

    const PinDisplay = () => (
        <div className="flex justify-center space-x-4 mb-6">
            {[...Array(4)].map((_, i) => (
                <div
                    key={i}
                    className={`w-10 h-10 rounded-full border-2 ${
                        error ? 'border-red-500' : 'border-cyan-400'
                    } flex items-center justify-center transition-colors duration-300`}
                >
                    {pin.length > i && <div className="w-5 h-5 bg-cyan-400 rounded-full"></div>}
                </div>
            ))}
        </div>
    );
    
    const NumpadButton = ({ value, onClick, children }: { value: string, onClick: (val: string) => void, children?: React.ReactNode }) => (
         <button
            onClick={() => onClick(value)}
            className="bg-slate-800 rounded-full h-20 w-20 text-3xl font-bold text-slate-200 
                       border border-slate-700/50 
                       transform transition-all duration-200
                       hover:border-pink-500/50 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20
                       flex items-center justify-center"
        >
            {children || value}
        </button>
    );

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col items-center justify-center p-4">
             <style>{`
                @keyframes shake {
                    10%, 90% { transform: translate3d(-1px, 0, 0); }
                    20%, 80% { transform: translate3d(2px, 0, 0); }
                    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                    40%, 60% { transform: translate3d(4px, 0, 0); }
                }
                .shake {
                    animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
                }
            `}</style>
            <div className={`w-full max-w-sm mx-auto text-center p-6 bg-slate-900/50 rounded-lg ${error ? 'shake' : ''}`}>
                 <h1 className="text-3xl font-bold text-cyan-400 tracking-wider mb-2">
                    NEON <span className="text-pink-500">POS</span>
                </h1>
                <h2 className="text-xl text-slate-300 mb-6">Enter PIN</h2>
                <PinDisplay />
                
                <div className="grid grid-cols-3 gap-4">
                    <NumpadButton value="1" onClick={handleKeyPress} />
                    <NumpadButton value="2" onClick={handleKeyPress} />
                    <NumpadButton value="3" onClick={handleKeyPress} />
                    <NumpadButton value="4" onClick={handleKeyPress} />
                    <NumpadButton value="5" onClick={handleKeyPress} />
                    <NumpadButton value="6" onClick={handleKeyPress} />
                    <NumpadButton value="7" onClick={handleKeyPress} />
                    <NumpadButton value="8" onClick={handleKeyPress} />
                    <NumpadButton value="9" onClick={handleKeyPress} />
                    <NumpadButton value="clear" onClick={handleClear}>
                        <span className="text-lg font-semibold uppercase">Clear</span>
                    </NumpadButton>
                    <NumpadButton value="0" onClick={handleKeyPress} />
                    <NumpadButton value="delete" onClick={handleDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path><line x1="18" y1="9" x2="12" y2="15"></line><line x1="12" y1="9" x2="18" y2="15"></line></svg>
                    </NumpadButton>
                </div>
                 {error && <p className="text-red-500 mt-4 font-bold">{error}</p>}
            </div>
        </div>
    );
};

export default LoginScreen;
