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
  // Separate state for AI search
  const [aiSearch, setAiSearch] = useState('');
  const [localSalaryRange, setLocalSalaryRange] = useState<[number, number]>([5000, 20000]);

  // Debounce the salary range changes
  const debouncedSalaryRange = useDebounce(localSalaryRange, 1000);

  // Effect to update filters when debounced salary range changes
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      salaryRange: debouncedSalaryRange
    }));
    console.log('Salary range updated after debounce:', debouncedSalaryRange);
  }, [debouncedSalaryRange, setFilters]);

  const locations = [
    'Warszawa', 'Kraków', 'Gdańsk', 'Wrocław', 'Poznań',
    'Katowice', 'Łódź'
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
    const value = e.target.value;
    setAiSearch(value);
    console.log('AI Search:', value);
  };

  const handleAiSearchSubmit = async () => {
    if (aiSearch.trim()) {
      try {
        console.log('Sending AI search query:', aiSearch);
        const results = await searchWithAI(aiSearch);
        console.log('AI search results:', results);
        // Here you can handle the results, e.g., update the job listings
      } catch (error) {
        console.error('AI search failed:', error);
      }
    }
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
                value={aiSearch}
                onChange={handleAiSearch}
                className="border-2 border-gray-200 focus:border-purple-500 transition-colors"
              />
              <Button
                onClick={handleAiSearchSubmit}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                disabled={!aiSearch.trim()}
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

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
          <Button variant="outline" className="text-gray-600">
            Wyczyść filtry
          </Button>
          <div className="flex gap-2">
            <Button variant="outline">
              Zapisz wyszukiwanie
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Zastosuj filtry
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FiltersSidebar;
