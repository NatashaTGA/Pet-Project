import React, { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
    const [currency, setCurrency] = useState("EUR");
    const [symbol, setSymbol] = useState("€");
    const [currentCurrency, setCurrentCurrency] = useState('eur');

    useEffect(() => {
        if (currency === "EUR") {
            setSymbol("€");
            setCurrentCurrency('eur')
        }
        else if (currency === "USD") {
            setSymbol("$");
            setCurrentCurrency('usd')
        } 
    }, [currency, symbol, currentCurrency]);

    return (
        <Crypto.Provider value={{ currency, setCurrency, symbol, currentCurrency}}>
        {children}
        </Crypto.Provider>
    );
};

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
};