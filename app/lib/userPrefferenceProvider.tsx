'use client';

import { createContext, useContext } from 'react';
import { UserData } from './definitions';

const PreferencesContext = createContext<UserData>(undefined as unknown as UserData);

export function PreferencesProvider({ children, initialData }: { children: React.ReactNode, initialData: UserData }) {
    return (
        <PreferencesContext.Provider value={initialData}>
            {children}
        </PreferencesContext.Provider>
    );
}

export const usePreferences = () => useContext(PreferencesContext);
