import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Clock, DollarSign, Building, Users, Calendar, ExternalLink, Heart, Share2 } from 'lucide-react';
import { config } from '@/config';
import { jobsApi, type JobSource } from '@/services/api';



const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<JobSource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await jobsApi.getJobDetails(id);
        if (!response.hits?.hits?.[0]?._source) {
          throw new Error('Nie znaleziono szczegółów oferty');
        }
        setJob(response.hits.hits[0]._source);
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError('Nie udało się pobrać szczegółów oferty. Spróbuj ponownie później.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Ładowanie szczegółów oferty...</div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="text-xl text-red-600">{error || 'Nie znaleziono oferty'}</div>
        <Button 
          onClick={() => navigate('/')}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Powrót do listy ofert
        </Button>
      </div>
    );
  }

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
                  🏢
                </div>
              </div>

              {/* Job Info */}
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.job_title}</h1>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-gray-600" />
                    <span>{job.job_location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-gray-600" />
                    <span>{new Date(job.posted_date).toLocaleDateString('pl-PL')}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-gray-600" />
                    <span>{job.is_remote ? 'Zdalnie' : 'W biurze'}</span>
                  </div>
                </div>

                {/* Apply Button */}
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3"
                  onClick={() => window.open(job.url, '_blank')}
                >
                  Aplikuj teraz
                </Button>
              </div>
            </div>
          </Card>

          <div className="prose max-w-none mb-8">
            <h2 className="text-xl font-semibold mb-4">Opis stanowiska</h2>
            <p className="whitespace-pre-line">{job.job_description}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Description */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Opis stanowiska</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.job_description}</p>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
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
