/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
    accentColor: string;
    setAccentColor: (color: string) => void;
    isDarkMode: boolean;
    setIsDarkMode: (isDark: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    accentColor: '#f9db6d',
    setAccentColor: () => {},
    isDarkMode: true,
    setIsDarkMode: () => {}
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [accentColor, setAccentColor] = useState('#f9db6d');
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--accent-color', accentColor);
        if (isDarkMode) {
            root.style.setProperty('--bg-color', '#0c0c0c');
            root.style.setProperty('--text-color', '#f0f0f0');
            root.style.setProperty('--secondary-text', '#a0a0a0');
            root.style.setProperty('--card-bg', '#1a1a1a');
        } else {
            root.style.setProperty('--bg-color', '#ffffff');
            root.style.setProperty('--text-color', '#1a1a1a');
            root.style.setProperty('--secondary-text', '#404040');
            root.style.setProperty('--card-bg', '#fcfcfc');
        }
    }, [accentColor, isDarkMode]);

    return (
        <ThemeContext.Provider value={{ accentColor, setAccentColor, isDarkMode, setIsDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
