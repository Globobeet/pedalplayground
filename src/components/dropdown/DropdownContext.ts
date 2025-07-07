import { createContext, useContext } from 'react';

export type ContextType = { align: 'start' | 'center' | 'end' };
export const Context = createContext<ContextType | null>(null);

export const useDropdownContext = () => {
  const v = useContext(Context);

  if (!v) throw new Error('Dropdown.* must be inside <Dropdown>');

  return v;
};
