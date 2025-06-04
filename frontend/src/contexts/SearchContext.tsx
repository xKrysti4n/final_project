import React, { createContext, useContext, useState } from 'react';

interface SearchFilters {
  salaryRange: [number, number];
  selectedLocations: string[];
  selectedJobTypes: string[];
  searchQuery: string;
}

interface SearchContextType {
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    salaryRange: [5000, 20000],
    selectedLocations: [],
    selectedJobTypes: [],
    searchQuery: '',
  });

  return (
    <SearchContext.Provider value={{ filters, setFilters }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
