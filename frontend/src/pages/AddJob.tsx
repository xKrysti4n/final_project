
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Building2, MapPin, DollarSign, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const AddJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    jobType: '',
    description: '',
    requirements: '',
    benefits: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Tutaj będzie logika wysyłania do backendu
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Powrót do wyszukiwania
            </Link>
            <div className="w-px h-6 bg-gray-300"></div>
            <h1 className="text-2xl font-bold text-gray-900">Dodaj nowe ogłoszenie</h1>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 shadow-lg border-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  Podstawowe informacje
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Nazwa stanowiska *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="np. Frontend Developer"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Nazwa firmy *</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="np. Tech Solutions"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      Lokalizacja *
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('location', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Wybierz lokalizację" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="warszawa">Warszawa</SelectItem>
                        <SelectItem value="krakow">Kraków</SelectItem>
                        <SelectItem value="gdansk">Gdańsk</SelectItem>
                        <SelectItem value="wroclaw">Wrocław</SelectItem>
                        <SelectItem value="poznan">Poznań</SelectItem>
                        <SelectItem value="katowice">Katowice</SelectItem>
                        <SelectItem value="lodz">Łódź</SelectItem>
                        <SelectItem value="zdalnie">Zdalnie</SelectItem>
                        <SelectItem value="hybrydowo">Hybrydowo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salary" className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      Zarobki (PLN)
                    </Label>
                    <Input
                      id="salary"
                      value={formData.salary}
                      onChange={(e) => handleInputChange('salary', e.target.value)}
                      placeholder="np. 8000-12000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jobType" className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Typ pracy *
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('jobType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Wybierz typ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pelny-etat">Pełny etat</SelectItem>
                        <SelectItem value="zdalnie">Zdalnie</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Opis stanowiska</h2>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Opis pracy *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Opisz zakres obowiązków, projekty, technologie..."
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Wymagania</Label>
                  <Textarea
                    id="requirements"
                    value={formData.requirements}
                    onChange={(e) => handleInputChange('requirements', e.target.value)}
                    placeholder="Opisz wymagane umiejętności, doświadczenie..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="benefits">Benefity</Label>
                  <Textarea
                    id="benefits"
                    value={formData.benefits}
                    onChange={(e) => handleInputChange('benefits', e.target.value)}
                    placeholder="Opisz oferowane benefity..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Kontakt</h2>
                <div className="space-y-2">
                  <Label htmlFor="email">Email kontaktowy *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="kontakt@firma.pl"
                    required
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-end gap-4">
                  <Link to="/">
                    <Button variant="outline">Anuluj</Button>
                  </Link>
                  <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Opublikuj ogłoszenie
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddJob;
