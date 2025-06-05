import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, DollarSign, Heart, ExternalLink, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSearch } from '@/contexts/SearchContext';
import { searchJobs, Job } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

const JobResults = () => {
  const { filters } = useSearch();
  
  const { data: jobs = [], isLoading, error } = useQuery({
    queryKey: ['jobs', filters],
    queryFn: () => searchJobs(filters),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>{error instanceof Error ? error.message : 'Wystąpił nieznany błąd'}</p>
      </div>
    );
  }

  if (!Array.isArray(jobs)) {
    console.error('Jobs is not an array:', jobs);
    return (
      <div className="text-center text-red-600 p-4">
        <p>Nieprawidłowy format danych z serwera</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Znaleziono {jobs.length > 0 ? jobs[0].total_hits : 0} ofert pracy 
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
        {jobs.map((job) => (
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
                        {job.job_title}
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
                    <span className="font-medium text-green-600">
                      {job.salary_min.toLocaleString()} - {job.salary_max.toLocaleString()} PLN
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{job.posted_date}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 line-clamp-2">{job.job_description}</p>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  {job.url ? (
                    <a 
                      href={job.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex-1 lg:flex-none">
                        Aplikuj teraz
                      </Button>
                    </a>
                  ) : (
                    <Button 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex-1 lg:flex-none"
                      disabled
                    >
                      Aplikuj teraz
                    </Button>
                  )}
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
