import React, { useEffect, useState, useCallback } from "react";
import { createRoot } from "react-dom/client";

function PasswordGenerator() {
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(30);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false);

    const generatePassword = useCallback((
        length = 30,
        numberAllowed = false,
        charAllowed = false
    ) => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const specialChars = "!@#$%^&*()_+";
        
        let charSet = chars;
        if (numberAllowed) charSet += numbers;
        if (charAllowed) charSet += specialChars;

        return Array.from({ length }, () => {
            const randomIndex = Math.floor(Math.random() * charSet.length);
            return charSet[randomIndex];
        }).join("");
    }, []);

    useEffect(() => {
        setPassword(generatePassword(length, numberAllowed, charAllowed));
    }, [length, numberAllowed, charAllowed, generatePassword]);

    const handleRangeChange = (e) => {
        setLength(Number(e.target.value));
    };

    return (
        <div className="container">
            <h1 className="password-display">{password}</h1>
            <div className="controls">
                <div className="control-group">
                    <input 
                        type="range" 
                        min={5} 
                        max={50} 
                        value={length} 
                        onChange={handleRangeChange}
                        className="range-input"
                    />
                    <label>Length: {length}</label>
                </div>
                
                <div className="control-group">
                    <input 
                        type="checkbox" 
                        checked={numberAllowed}
                        onChange={() => setNumberAllowed(prev => !prev)}
                        id="numbers"
                    />
                    <label htmlFor="numbers">Include Numbers</label>
                </div>
                
                <div className="control-group">
                    <input 
                        type="checkbox" 
                        checked={charAllowed}
                        onChange={() => setCharAllowed(prev => !prev)}
                        id="special"
                    />
                    <label htmlFor="special">Include Special Characters</label>
                </div>
                
                <button 
                    onClick={() => setPassword(generatePassword(length, numberAllowed, charAllowed))}
                    className="generate-btn"
                >
                    Generate Password
                </button>
            </div>
        </div>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <PasswordGenerator />
    </React.StrictMode>
);
