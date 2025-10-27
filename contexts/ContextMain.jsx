// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { createContext, useContext, useState, useEffect } from 'react';


// CREATE CONTEXT
const ContextMain = createContext();


// PROVIDER EXPORT
export const ContextMainProvider = ({ children }) => {

    // INIT USE-EFFECT
    useEffect(() => {
        console.log("[ ContextMainProvider ] mounted.");
    }, []);

    // debug
    const contextMainValue = "ContextMain data available."

    return (
        <ContextMain.Provider value={{
            contextMainValue
        }}>
            {children}
        </ContextMain.Provider>
    );
};

// USE CONTEXT EXPORT
export const useContextMain = () => useContext(ContextMain);
