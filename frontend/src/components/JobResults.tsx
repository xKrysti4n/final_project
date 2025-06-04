
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, DollarSign, Heart, ExternalLink, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobResults = () => {
  const mockJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'Warszawa',
      salary: '15,000 - 20,000 PLN',
      type: 'Pełny etat',
      remote: 'Hybrydowo',
      posted: '2 dni temu',
      logo: '🚀',
      skills: ['React', 'TypeScript', 'Next.js'],
      description: 'Szukamy doświadczonego Frontend Developera do zespołu...'
    },

    {
      id: 2,
      title: 'Full Stack Engineer',
      company: 'StartupXYZ',
      location: 'Kraków',
      salary: '12,000 - 18,000 PLN',
      type: 'Pełny etat',
      remote: 'Zdalnie',
      posted: '1 dzień temu',
      logo: '💡',
      skills: ['Node.js', 'React', 'PostgreSQL'],
      description: 'Dołącz do dynamicznego zespołu i buduj przyszłość...'
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      company: 'DesignStudio',
      location: 'Gdańsk',
      salary: '8,000 - 12,000 PLN',
      type: 'Pełny etat',
      remote: 'W biurze',
      posted: '3 dni temu',
      logo: '🎨',
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      description: 'Poszukujemy kreatywnego designera do projektowania...'
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      company: 'CloudTech',
      location: 'Wrocław',
      salary: '16,000 - 22,000 PLN',
      type: 'Pełny etat',
      remote: 'Hybrydowo',
      posted: '5 dni temu',
      logo: '☁️',
      skills: ['AWS', 'Docker', 'Kubernetes'],
      description: 'Szukamy eksperta DevOps do zarządzania infrastrukturą...'
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Znaleziono {mockJobs.length} ofert pracy
          </h2>
          <p className="text-gray-600 mt-1">Najlepsze oferty dopasowane do Twoich kryteriów</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Sortuj: Najnowsze
          </Button>
          <Button variant="outline" size="sm">
            Widok siatki
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {mockJobs.map((job) => (
          <Card key={job.id} className="p-6 hover:shadow-lg transition-all duration-200 border-2 border-gray-100 hover:border-blue-200 group">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Company Logo */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                  {job.logo}
                </div>
              </div>

              {/* Job Info */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div>
                    <Link to={`/job/${job.id}`}>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer">
                        {job.title}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 text-gray-600 mt-1">
                      <Building className="w-4 h-4" />
                      <span className="font-medium">{job.company}</span>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="self-start">
                    <Heart className="w-4 h-4 mr-2" />
                    Zapisz
                  </Button>
                </div>

                {/* Job Details */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                    <Badge variant="outline" className="ml-1 text-xs">
                      {job.remote}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-medium text-green-600">{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{job.posted}</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Description */}
                <p className="text-gray-700 line-clamp-2">{job.description}</p>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex-1 lg:flex-none">
                    Aplikuj teraz
                  </Button>
                  <Link to={`/job/${job.id}`}>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Zobacz szczegóły
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <Button variant="outline" size="lg" className="px-8">
          Załaduj więcej ofert
        </Button>
      </div>
    </div>
  );
};

export default JobResults;
