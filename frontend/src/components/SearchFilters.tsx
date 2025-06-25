
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MapPin, DollarSign, Clock, Brain } from 'lucide-react';

const SearchFilters = () => {
  const [salaryRange, setSalaryRange] = useState([5000, 20000]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [aiSearch, setAiSearch] = useState('');

  const locations = [
    'Warszawa', 'Kraków', 'Gdańsk', 'Wrocław', 'Poznań', 
    'Katowice', 'Łódź', 'Zdalnie', 'Hybrydowo'
  ];

  const jobTypes = ['Pełny etat', 'Zdalnie'];

  const toggleLocation = (location: string) => {
    setSelectedLocations(prev => 
      prev.includes(location) 
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
  };

  const toggleJobType = (type: string) => {
    setSelectedJobTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <Card className="p-6 mb-6 border-2 border-gray-100 shadow-sm">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <span className="w-2 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
        Filtry wyszukiwania
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* AI Search */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Brain className="w-4 h-4" />
              Wyszukiwanie AI
            </div>
            <Input
              type="text"
              placeholder="Opisz jaką pracę szukasz..."
              value={aiSearch}
              onChange={(e) => setAiSearch(e.target.value)}
              className="border-2 border-gray-200 focus:border-purple-500 transition-colors"
            />
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
                  variant={selectedJobTypes.includes(type) ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedJobTypes.includes(type)
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
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Salary Range */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <DollarSign className="w-4 h-4" />
              Zarobki (PLN)
            </div>
            <div className="px-2">
              <Slider
                value={salaryRange}
                onValueChange={setSalaryRange}
                max={50000}
                min={3000}
                step={1000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>{salaryRange[0].toLocaleString()}</span>
                <span>{salaryRange[1].toLocaleString()}</span>
              </div>
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
                  variant={selectedLocations.includes(location) ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedLocations.includes(location)
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
      </div>
    </Card>
  );
};

export default SearchFilters;
