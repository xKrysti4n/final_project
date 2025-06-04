
import React from 'react';
import SearchHeader from '@/components/SearchHeader';
import FiltersSidebar from '@/components/FiltersSidebar';
import JobResults from '@/components/JobResults';
import AISearchModal from '@/components/AISearchModal';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <SearchHeader />
      <div className="flex h-[calc(100vh-80px)]">
        <FiltersSidebar />
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-8">
            <JobResults />
          </div>
        </div>
      </div>
      <AISearchModal />
    </div>
  );
};

export default Index;
