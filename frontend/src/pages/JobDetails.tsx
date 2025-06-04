
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Clock, DollarSign, Building, Users, Calendar, ExternalLink, Heart, Share2 } from 'lucide-react';

const JobDetails = () => {
  const { id } = useParams();

  // Mock job data - w rzeczywistej aplikacji pobierałbyś to z backendu
  const job = {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'Warszawa',
    salary: '15,000 - 20,000 PLN',
    type: 'Pełny etat',
    remote: 'Hybrydowo',
    posted: '2 dni temu',
    logo: '🚀',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js'],
    description: `
      Szukamy doświadczonego Frontend Developera do naszego dynamicznego zespołu. 
      
      Będziesz odpowiedzialny za tworzenie nowoczesnych aplikacji webowych używając najnowszych technologii.
      
      Oferujemy:
      • Konkurencyjne wynagrodzenie
      • Elastyczne godziny pracy
      • Praca hybrydowa
      • Budżet na rozwój (5000 PLN rocznie)
      • Prywatna opieka medyczna
      • Multisport
      • Nowoczesny sprzęt
      
      Wymagania:
      • Min. 4 lata doświadczenia w React
      • Bardzo dobra znajomość TypeScript
      • Doświadczenie z Next.js
      • Znajomość Tailwind CSS
      • Znajomość Node.js mile widziana
    `,
    requirements: [
      'Min. 4 lata doświadczenia w React',
      'Bardzo dobra znajomość TypeScript',
      'Doświadczenie z Next.js',
      'Znajomość Tailwind CSS',
      'Znajomość Node.js mile widziana',
      'Umiejętność pracy w zespole',
      'Komunikatywna znajomość języka angielskiego'
    ],
    benefits: [
      'Konkurencyjne wynagrodzenie',
      'Elastyczne godziny pracy',
      'Praca hybrydowa',
      'Budżet na rozwój (5000 PLN rocznie)',
      'Prywatna opieka medyczna',
      'Multisport',
      'Nowoczesny sprzęt'
    ],
    companySize: '50-100 pracowników',
    industry: 'Technologia'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Powrót do wyszukiwania</span>
            </Link>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">JP</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">JobPortal</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Job Header */}
          <Card className="p-8 mb-6 border-2 border-gray-100">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Company Logo */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-3xl shadow-lg">
                  {job.logo}
                </div>
              </div>

              {/* Job Info */}
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                    <div className="flex items-center gap-2 text-lg text-gray-600">
                      <Building className="w-5 h-5" />
                      <span className="font-medium">{job.company}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4 mr-2" />
                      Zapisz
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Udostępnij
                    </Button>
                  </div>
                </div>

                {/* Job Details */}
                <div className="flex flex-wrap gap-6 text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{job.location}</span>
                    <Badge variant="outline" className="ml-1">
                      {job.remote}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    <span className="font-medium text-green-600 text-lg">{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{job.posted}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{job.companySize}</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Apply Button */}
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3">
                  Aplikuj teraz
                </Button>
              </div>
            </div>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Description */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Opis stanowiska</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.description}</p>
                </div>
              </Card>

              {/* Requirements */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Wymagania</h2>
                <ul className="space-y-2">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Benefits */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Co oferujemy</h2>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Company Info */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">O firmie</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Branża:</span>
                    <span className="font-medium">{job.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Wielkość:</span>
                    <span className="font-medium">{job.companySize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lokalizacja:</span>
                    <span className="font-medium">{job.location}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Zobacz profil firmy
                </Button>
              </Card>

              {/* Application Tips */}
              <Card className="p-6 bg-blue-50 border-blue-200">
                <h3 className="text-lg font-bold text-blue-900 mb-3">💡 Wskazówki</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• Dostosuj CV do wymagań stanowiska</li>
                  <li>• Napisz spersonalizowany list motywacyjny</li>
                  <li>• Przygotuj portfolio swoich projektów</li>
                  <li>• Aplikuj jak najszybciej</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
