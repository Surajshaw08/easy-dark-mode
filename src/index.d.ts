import React from 'react';

export interface DarkModeContextType {
    enabled: boolean;
    setEnabled: (enabled: boolean) => void;
}

export const DarkModeContext: React.Context<DarkModeContextType | null>;

export interface DarkModeProviderProps {
    children: React.ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps>;

export interface DarkModeToggleProps {
    fixed?: boolean;
    style?: React.CSSProperties;
    className?: string;
}

export const DarkModeToggle: React.FC<DarkModeToggleProps>;

export function useDarkMode(): DarkModeContextType;
