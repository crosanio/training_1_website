// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { createContext, useContext } from 'react';


// CREATE CONTEXT
const ContextMain = createContext();


// PROVIDER EXPORT
export const ContextMainProvider = ({ children }) => {

    // DEBUG
    // console.log("[ ContextMainProvider ] mounted.");

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
