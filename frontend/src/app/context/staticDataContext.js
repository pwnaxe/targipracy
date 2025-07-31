'use client';
import { createContext, useContext } from 'react';

const StaticDataContext = createContext();

export function StaticDataProvider({ children, data }) {
    return (
        <StaticDataContext.Provider value={data}>
            {children}
        </StaticDataContext.Provider>
    );
}

export function useStaticData() {
    const context = useContext(StaticDataContext);
    if (context === undefined) {
        throw new Error('useStaticData must be used within a StaticDataProvider');
    }
    return context;
}
