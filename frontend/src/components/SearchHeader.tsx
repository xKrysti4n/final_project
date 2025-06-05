import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearch } from '@/contexts/SearchContext';

const SearchHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { filters, setFilters } = useSearch();

  const debouncedSearchQuery = useDebounce(searchQuery, 2000);

  // Effect for search query changes
  useEffect(() => {
    if (debouncedSearchQuery !== undefined) {
      console.log('Search query changed, updating filters');
      setFilters(prev => ({ ...prev, searchQuery: debouncedSearchQuery }));
      if (debouncedSearchQuery.trim()) {
        navigate(`/?search=${encodeURIComponent(debouncedSearchQuery.trim())}`);
      }
    }
  }, [debouncedSearchQuery, navigate, setFilters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Immediate search triggered:', searchQuery);
    setFilters(prev => ({ ...prev, searchQuery }));
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    console.log('User typing:', value);
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">JP</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">JobPortal</h1>
          </div>

          {/* Search Bar - Centered */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Wyszukaj stanowisko, firmę, technologię..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  className="pl-10 pr-4 py-3 text-base border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                />
              </div>
            </form>
          </div>

          {/* Add Job Button - Right aligned */}
          <div className="flex-shrink-0">
            <Link to="/add-job">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Dodaj ogłoszenie
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
