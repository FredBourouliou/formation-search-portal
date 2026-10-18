import { FormationFilters } from '../types';

interface FiltersProps {
  filters: FormationFilters;
  onFiltersChange: (filters: FormationFilters) => void;
}

const DEPARTEMENTS = [
  { code: '', label: 'Tous les départements' },
  { code: '21', label: '21 - Côte-d\'Or' },
  { code: '25', label: '25 - Doubs' },
  { code: '39', label: '39 - Jura' },
  { code: '58', label: '58 - Nièvre' },
  { code: '70', label: '70 - Haute-Saône' },
  { code: '71', label: '71 - Saône-et-Loire' },
  { code: '89', label: '89 - Yonne' },
  { code: '90', label: '90 - Territoire de Belfort' },
];

const MODALITES = [
  { value: '', label: 'Toutes les modalités' },
  { value: 'presentiel', label: 'Présentiel' },
  { value: 'distanciel', label: 'Distanciel' },
  { value: 'hybride', label: 'Hybride' },
];

export function Filters({ filters, onFiltersChange }: FiltersProps) {
  const handleInputChange = (field: keyof FormationFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [field]: value,
      page: 1,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Filtres de recherche</h2>
      
      <div>
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
          Rechercher
        </label>
        <input
          type="text"
          id="search"
          value={filters.q || ''}
          onChange={(e) => handleInputChange('q', e.target.value)}
          placeholder="Titre, organisme, ville..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="departement" className="block text-sm font-medium text-gray-700 mb-1">
          Département
        </label>
        <select
          id="departement"
          value={filters.departement || ''}
          onChange={(e) => handleInputChange('departement', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        >
          {DEPARTEMENTS.map((dept) => (
            <option key={dept.code} value={dept.code}>
              {dept.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="modalite" className="block text-sm font-medium text-gray-700 mb-1">
          Modalité
        </label>
        <select
          id="modalite"
          value={filters.modalite || ''}
          onChange={(e) => handleInputChange('modalite', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        >
          {MODALITES.map((mod) => (
            <option key={mod.value} value={mod.value}>
              {mod.label}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() => onFiltersChange({ page: 1, limit: 10 })}
        className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-hidden focus:ring-2 focus:ring-gray-500"
      >
        Réinitialiser les filtres
      </button>
    </div>
  );
}