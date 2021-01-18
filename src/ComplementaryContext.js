import {createContext, useState} from "react";

const ComplementaryContext = createContext(null);

const ComplementaryProvider = ({ children }) => {
    const [showResult, setShowResult] = useState(false);

    return (
        <ComplementaryContext.Provider value={{showResult, setShowResult}} >
            {children}
        </ComplementaryContext.Provider>
    )
};

export { ComplementaryContext, ComplementaryProvider }