import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from './api/client';
import { FormationFilters, Formation } from './types';
import { useDebouncedValue } from './hooks/useDebouncedValue';
import { Filters } from './components/Filters';
import { ResultsList } from './components/ResultsList';
import { MapView } from './components/MapView';
import { Pagination } from './components/Pagination';
import { Loading } from './components/Loading';
import { EmptyState } from './components/EmptyState';
import { ErrorState } from './components/ErrorState';

function App() {
  const [filters, setFilters] = useState<FormationFilters>({
    page: 1,
    limit: 10,
  });
  
  const [highlightedFormationId, setHighlightedFormationId] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const debouncedSearch = useDebouncedValue(filters.q || '', 400);
  
  const queryFilters = {
    ...filters,
    q: debouncedSearch,
  };
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['formations', queryFilters],
    queryFn: () => api.formations.list(queryFilters),
  });
  
  const handleFormationClick = (formation: Formation) => {
    const element = document.getElementById(`formation-${formation.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  
  const handleMarkerClick = (formation: Formation) => {
    setHighlightedFormationId(formation.id);
    if (resultsRef.current) {
      const element = resultsRef.current.querySelector(`[data-formation-id="${formation.id}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };
  
  useEffect(() => {
    const checkHealth = async () => {
      try {
        await api.health();
      } catch (err) {
        console.error('API health check failed:', err);
      }
    };
    checkHealth();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-xs border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Emfor - Recherche de Formations
          </h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <Filters filters={filters} onFiltersChange={setFilters} />
          </aside>
          
          <section className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Résultats ({data?.total || 0} formations)
                </h2>
                
                <div ref={resultsRef} className="max-h-[600px] overflow-y-auto pr-2">
                  {isLoading && <Loading />}
                  {error && <ErrorState error={error as Error} onRetry={refetch} />}
                  {data && data.items.length === 0 && <EmptyState />}
                  {data && data.items.length > 0 && (
                    <div data-testid="results-list">
                      <ResultsList
                        formations={data.items}
                        highlightedId={highlightedFormationId || undefined}
                        onFormationHover={setHighlightedFormationId}
                        onFormationClick={handleFormationClick}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="h-[600px]">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Carte des formations
                </h2>
                <MapView
                  formations={data?.items || []}
                  highlightedId={highlightedFormationId || undefined}
                  onMarkerClick={handleMarkerClick}
                  onMarkerHover={setHighlightedFormationId}
                />
              </div>
            </div>
            
            {data && data.pages > 1 && (
              <div className="bg-white rounded-lg shadow-md p-4">
                <Pagination
                  currentPage={data.page}
                  totalPages={data.pages}
                  onPageChange={(page) => setFilters({ ...filters, page })}
                />
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;