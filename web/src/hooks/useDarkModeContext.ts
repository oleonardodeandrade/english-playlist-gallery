import { useContext } from 'react';
import { DarkModeContext, type DarkModeContextType } from '../contexts/DarkModeContext.types';

export function useDarkModeContext(): DarkModeContextType {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkModeContext must be used within a DarkModeProvider');
  }
  return context;
}
