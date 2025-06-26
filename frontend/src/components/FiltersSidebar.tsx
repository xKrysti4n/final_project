import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MapPin, DollarSign, Clock, Brain, Send } from 'lucide-react';
import { useSearch } from '@/contexts/SearchContext';
import { useDebounce } from '@/hooks/useDebounce';
import { searchWithAI } from '@/services/api';

const FiltersSidebar = () => {
  const { filters, setFilters } = useSearch();
  const [localSalaryRange, setLocalSalaryRange] = useState<[number, number]>(filters.salaryRange);
  const [aiSearchInput, setAiSearchInput] = useState('');

  // TODO Debounce 
  const debouncedSalaryRange = useDebounce(localSalaryRange, 1000);
  useEffect(() => {
    if (debouncedSalaryRange[0] !== filters.salaryRange[0] || debouncedSalaryRange[1] !== filters.salaryRange[1]) {
      setFilters(prev => ({
        ...prev,
        salaryRange: debouncedSalaryRange
      }));
    }
  }, [debouncedSalaryRange, setFilters, filters.salaryRange]);

  const locations = [
    'Warszawa', 'Kraków', 'Gdańsk', 'Wrocław', 'Poznań',
    'Katowice', 'Łódź','Kielce'
  ];

  const jobTypes = ['Pełny etat', 'Zdalnie'];

  const toggleLocation = (location: string) => {
    setFilters(prev => ({
      ...prev,
      selectedLocations: prev.selectedLocations.includes(location)
        ? prev.selectedLocations.filter(l => l !== location)
        : [...prev.selectedLocations, location]
    }));
  };

  const toggleJobType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      selectedJobTypes: prev.selectedJobTypes.includes(type)
        ? prev.selectedJobTypes.filter(t => t !== type)
        : [...prev.selectedJobTypes, type]
    }));
  };

  const handleSalaryChange = (value: number[]) => {
    setLocalSalaryRange(value as [number, number]);
  };

  const handleAiSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAiSearchInput(e.target.value);
  };

  const handleAiSearchSubmit = async () => {
    if (aiSearchInput.trim()) {
      try {
        setFilters(prev => ({
          ...prev,
          searchQuery: aiSearchInput
        }));
        const results = await searchWithAI(aiSearchInput);
        console.log('AI search results:', results);
      } catch (error) {
        console.error('AI search failed:', error);
      }
    }
  };

  const handleApplyFilters = () => {
    setFilters(prev => ({
      ...prev,
      salaryRange: localSalaryRange
    }));
  };

  const handleClearFilters = () => {
    setFilters(prev => ({
      ...prev,
      salaryRange: [5000, 20000],
      selectedLocations: [],
      selectedJobTypes: []
    }));
    setLocalSalaryRange([5000, 20000]);
    setAiSearchInput('');
  };

  return (
    <div className="w-80 h-full bg-white border-r border-gray-200 overflow-y-auto">
      <Card className="m-4 p-6 border-2 border-gray-100 shadow-sm">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
          Filtry wyszukiwania
        </h2>

        <div className="space-y-6">
          {/* AI Search */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Brain className="w-4 h-4" />
              Wyszukiwanie AI
            </div>
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Opisz jaką pracę szukasz..."
                value={aiSearchInput}
                onChange={handleAiSearch}
                className="border-2 border-gray-200 focus:border-purple-500 transition-colors"
              />
              <Button
                onClick={handleAiSearchSubmit}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                disabled={!aiSearchInput.trim()}
              >
                <Send className="w-4 h-4 mr-2" />
                Wyszukaj z AI
              </Button>
            </div>
          </div>

          {/* Salary Range */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <DollarSign className="w-4 h-4" />
              Zarobki (PLN)
            </div>
            <div className="px-2">
              <Slider
                value={localSalaryRange}
                onValueChange={handleSalaryChange}
                max={50000}
                min={3000}
                step={1000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>{localSalaryRange[0].toLocaleString()}</span>
                <span>{localSalaryRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Job Types */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Clock className="w-4 h-4" />
              Typ pracy
            </div>
            <div className="flex flex-wrap gap-2">
              {jobTypes.map((type) => (
                <Badge
                  key={type}
                  variant={filters.selectedJobTypes.includes(type) ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 ${
                    filters.selectedJobTypes.includes(type)
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'hover:border-purple-500 hover:text-purple-600'
                  }`}
                  onClick={() => toggleJobType(type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <MapPin className="w-4 h-4" />
              Lokalizacje
            </div>
            <div className="flex flex-wrap gap-2">
              {locations.map((location) => (
                <Badge
                  key={location}
                  variant={filters.selectedLocations.includes(location) ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 ${
                    filters.selectedLocations.includes(location)
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'hover:border-green-500 hover:text-green-600'
                  }`}
                  onClick={() => toggleLocation(location)}
                >
                  {location}
                </Badge>
              ))}
            </div>
          </div>
        </div>

      </Card>
    </div>
  );
};

export default FiltersSidebar;
