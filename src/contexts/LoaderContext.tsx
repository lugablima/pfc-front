/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useState } from "react";

export interface ILoaderContext {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}

interface Props {
  children: React.ReactNode;
}

const LoaderContext = createContext<ILoaderContext | null>(null);

export const useLoaderContext = () => useContext(LoaderContext);

export function LoaderProvider({ children }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  return (
    <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  );
}
