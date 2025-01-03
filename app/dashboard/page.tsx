'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { mockSuppliers } from '@/app/data/mockData'
import { Supplier } from '@/app/types'

// Component definitions
interface ViewOnlyFarmersListProps {
  supplier: Supplier;
  onBack: () => void;
  setViewMode: (mode: 'suppliers' | 'farmers' | null) => void;
}

interface ViewOnlySupplierListProps {
  onSupplierSelect: (supplier: Supplier) => void;
  suppliers: Supplier[];
  onClose: () => void;
}

interface ExportHistory {
  id: string;
  customerName: string;
  exportDate: string;
  containerSize: number;
}

interface SearchFarmersListProps {
  supplier: Supplier;
  onBack: () => void;
  requiredContainerSize: number;
  setRequiredContainerSize: (size: number) => void;
  totalFarmSize: number;
  calculateRequiredFarmSize: (size: number) => string;
  setShowSupplierDetails: (show: boolean) => void;
  setShowSearchForm: (show: boolean) => void;
  setSelectedSupplier: (supplier: Supplier | null) => void;
  setViewMode: (mode: 'suppliers' | 'farmers' | null) => void;
  selectedFarmers: string[];
  handleFarmerSelection: (farmerId: string) => void;
  handleUndoSelection: (farmerId: string) => void;
  exportedFarmers: string[];
  setExportHistory: (history: ExportHistory[]) => void;
  searchTerm: { name: string };
  handleExportFormat: (format: 'csv' | 'json') => void;
}

const ViewOnlySupplierList: React.FC<ViewOnlySupplierListProps> = ({ 
  onSupplierSelect, 
  suppliers,
  onClose 
}) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-[#1a2633] border border-[#44bcd8]/30 rounded-lg p-6 w-full max-w-7xl h-[90vh]
      shadow-[0_0_25px_rgba(68,188,216,0.25)] animate-fade-in flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#44bcd8]">Supplier List</h2>
        <button onClick={onClose} className="text-[#44bcd8] hover:text-[#44bcd8]/80">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <table className="min-w-full divide-y divide-[#44bcd8]/10">
        <thead className="bg-[#0c141c]/50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Supplier</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Total Size</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Total Farmers</th>
          </tr>
        </thead>
        <tbody className="bg-[#1a2633] divide-y divide-[#44bcd8]/10">
          {suppliers.map((supplier, index) => (
            <tr 
              key={supplier.id}
              onClick={() => onSupplierSelect(supplier)}
              className="hover:bg-[#44bcd8]/5 cursor-pointer transition-colors duration-200"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#44bcd8]/80">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{supplier.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2ecc71]">{supplier.totalFarmSize} ha</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2ecc71]">{supplier.totalFarmers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ViewOnlyFarmersList: React.FC<ViewOnlyFarmersListProps> = ({ 
  supplier,
  onBack,
  setViewMode,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a2633] border border-[#44bcd8]/30 rounded-lg p-6 w-full max-w-7xl h-[90vh]
        shadow-[0_0_25px_rgba(68,188,216,0.25)] animate-fade-in flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#44bcd8]">{supplier.name}</h2>
          <button onClick={onBack} className="text-[#44bcd8] hover:text-[#44bcd8]/80">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-6 flex-1 overflow-auto">
          <table className="min-w-full divide-y divide-[#44bcd8]/10">
            <thead className="bg-[#0c141c]/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Coffee Export</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Coffee Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Farmer's Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Sex</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Place/Kebele</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Coffee Farm Unit Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Geometry Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Longitude (Lon)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Latitude (Lat)</th>
              </tr>
            </thead>
            <tbody className="bg-[#1a2633] divide-y divide-[#44bcd8]/10">
              {supplier.farmers.map((farmer) => (
                <tr key={farmer.farmerId} className="hover:bg-[#44bcd8]/5 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#44bcd8]/80">{farmer.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#44bcd8]/80">{farmer.coffeeExporter}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#44bcd8]/80">{farmer.coffeeSupplier}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{farmer.farmerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#44bcd8]/80">{farmer.genderId === 1 ? 'M' : 'F'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#44bcd8]/80">{farmer.kebele}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2ecc71]">{farmer.farmSize} ha</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#44bcd8]/80">{farmer.geometryType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#44bcd8]/80">{farmer.longitude}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#44bcd8]/80">{farmer.latitude}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Create SearchFarmersList component
const SearchFarmersList: React.FC<SearchFarmersListProps> = ({ 
  supplier,
  onBack,
  requiredContainerSize,
  setRequiredContainerSize,
  totalFarmSize,
  calculateRequiredFarmSize,
  setShowSupplierDetails,
  setShowSearchForm,
  setSelectedSupplier,
  setViewMode,
  selectedFarmers,
  handleFarmerSelection,
  handleUndoSelection,
  exportedFarmers,
  setExportHistory,
  searchTerm,
  handleExportFormat,
}) => {
  const router = useRouter();
  const [showExportOptions, setShowExportOptions] = useState(false);

  const downloadFile = (content: string, fileName: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a2633] border border-[#44bcd8]/30 rounded-lg p-6 w-full max-w-7xl h-[90vh]
        shadow-[0_0_25px_rgba(68,188,216,0.25)] animate-fade-in flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#44bcd8]">{supplier.name}</h2>
          <button onClick={onBack} className="text-[#44bcd8] hover:text-[#44bcd8]/80">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-6 flex-1 overflow-auto">
          <div className="flex justify-between items-start mb-6">
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-medium text-[#44bcd8]">Farmer Details</h3>
              
              {/* Metrics Section */}
              <div className="flex flex-col gap-3 bg-[#0c141c]/50 p-4 rounded-lg border border-[#44bcd8]/20">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-[#44bcd8]/80 min-w-[180px]">Required Container Size:</span>
                  <input
                    type="number"
                    min="0"
                    value={requiredContainerSize}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value >= 0) {
                        setRequiredContainerSize(value);
                      }
                    }}
                    className="w-32 px-3 py-1.5 bg-[#0c141c] border border-[#44bcd8]/30 rounded-md 
                      text-white text-sm text-center"
                    placeholder="Enter size"
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-[#44bcd8]/80 min-w-[180px]">Required Farm Unit Size:</span>
                  <span className="w-32 px-3 py-1.5 bg-[#0c141c] border border-[#44bcd8]/30 rounded-md 
                    text-[#2ecc71] text-sm text-center">
                    {calculateRequiredFarmSize(requiredContainerSize)} ha
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-[#44bcd8]/80 min-w-[180px]">Selected Farm Unit Size:</span>
                  <span className="w-32 px-3 py-1.5 bg-[#0c141c] border border-[#44bcd8]/30 rounded-md 
                    text-[#2ecc71] text-sm text-center">
                    {totalFarmSize} ha
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Add Export Button */}
          <div className="flex justify-end mb-4 gap-2">
            <button
              onClick={() => {
                selectedFarmers.forEach(farmerId => handleUndoSelection(farmerId));
              }}
              className={`px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2
                ${selectedFarmers.length > 0 
                  ? 'bg-[#44bcd8]/20 text-[#44bcd8] hover:bg-[#44bcd8]/30'
                  : 'bg-[#44bcd8]/10 text-[#44bcd8]/50 cursor-not-allowed'
                }`}
              disabled={selectedFarmers.length === 0}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M19 7l-7 7-7-7" />
              </svg>
              Undo All
            </button>
            <button
              onClick={() => setShowExportOptions(true)}
              disabled={selectedFarmers.length === 0}
              className={`px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2
                ${selectedFarmers.length > 0
                  ? 'bg-[#2ecc71]/20 text-[#2ecc71] hover:bg-[#2ecc71]/30'
                  : 'bg-[#2ecc71]/10 text-[#2ecc71]/50 cursor-not-allowed'
                }`}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Export Selected
            </button>
          </div>

          {/* Farmers Table */}
          <table className="min-w-full divide-y divide-[#44bcd8]/10">
            <thead className="bg-[#0c141c]/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Coffee Export</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Coffee Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Farmer's Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Sex</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Place/Kebele</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Coffee Farm Unit Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Geometry Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Longitude (Lon)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Latitude (Lat)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-[#1a2633] divide-y divide-[#44bcd8]/10">
              {supplier.farmers.map((farmer) => {
                const isExported = exportedFarmers.includes(farmer.farmerId);
                const isSelected = selectedFarmers.includes(farmer.farmerId);
                
                return (
                  <tr 
                    key={farmer.farmerId}
                    className={`
                      transition-colors duration-200
                      ${isExported ? 'bg-[#2ecc71]/5' : 'hover:bg-[#44bcd8]/5 cursor-pointer'}
                      ${isSelected ? 'bg-[#44bcd8]/10' : ''}
                    `}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center">
                        <span className={`${isExported ? 'text-[#2ecc71]' : 'text-[#44bcd8]/80'}`}>
                          {farmer.code}
                        </span>
                        {isExported && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#2ecc71]/20 text-[#2ecc71]">
                            Exported
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#44bcd8]/80">{farmer.coffeeExporter}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#44bcd8]/80">{farmer.coffeeSupplier}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{farmer.farmerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#44bcd8]/80">{farmer.genderId === 1 ? 'M' : 'F'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#44bcd8]/80">{farmer.kebele}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2ecc71]">{farmer.farmSize} ha</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#44bcd8]/80">{farmer.geometryType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#44bcd8]/80">{farmer.longitude}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#44bcd8]/80">{farmer.latitude}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFarmerSelection(farmer.farmerId);
                        }}
                        className={`px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2
                          ${selectedFarmers.includes(farmer.farmerId)
                            ? 'bg-[#2ecc71]/20 text-[#2ecc71] hover:bg-[#2ecc71]/30'
                            : 'bg-[#44bcd8]/20 text-[#44bcd8] hover:bg-[#44bcd8]/30'
                          }`}
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {selectedFarmers.includes(farmer.farmerId) ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          )}
                        </svg>
                        {selectedFarmers.includes(farmer.farmerId) ? 'Selected' : 'Select'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Options Modal */}
      {showExportOptions && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-[#1a2633] border border-[#44bcd8]/30 rounded-lg p-6 w-full max-w-md
            shadow-[0_0_25px_rgba(68,188,216,0.25)] animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#44bcd8]">Choose Export Format</h2>
              <button onClick={() => setShowExportOptions(false)} className="text-[#44bcd8] hover:text-[#44bcd8]/80">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  handleExportFormat('csv');
                  setShowExportOptions(false);
                }}
                className="flex flex-col items-center gap-3 p-4 bg-[#0c141c] border border-[#44bcd8]/30 
                  rounded-lg hover:bg-[#44bcd8]/10 transition-colors duration-200"
              >
                <svg className="h-8 w-8 text-[#44bcd8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm font-medium text-[#44bcd8]">CSV Format</span>
              </button>
              
              <button
                onClick={() => {
                  handleExportFormat('json');
                  setShowExportOptions(false);
                }}
                className="flex flex-col items-center gap-3 p-4 bg-[#0c141c] border border-[#44bcd8]/30 
                  rounded-lg hover:bg-[#44bcd8]/10 transition-colors duration-200"
              >
                <svg className="h-8 w-8 text-[#44bcd8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                <span className="text-sm font-medium text-[#44bcd8]">JSON Format</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main component
export default function DashboardPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [showSearchForm, setShowSearchForm] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [showSupplierDetails, setShowSupplierDetails] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const [searchTerm, setSearchTerm] = useState({ name: '' })
  const [searchResults, setSearchResults] = useState<Supplier[]>([])
  const [selectedFarmers, setSelectedFarmers] = useState<string[]>([])
  const [exportedFarmers, setExportedFarmers] = useState<string[]>([])
  const [requiredContainerSize, setRequiredContainerSize] = useState(0)
  const [totalFarmSize, setTotalFarmSize] = useState(0)
  const [showExportModal, setShowExportModal] = useState(false)
  const [showSizeWarning, setShowSizeWarning] = useState(false)
  const [warningMessage, setWarningMessage] = useState('')
  const [processedSuppliers, setProcessedSuppliers] = useState<Supplier[]>([])
  const [viewMode, setViewMode] = useState<'suppliers' | 'farmers' | null>(null);
  const [viewSelectedSupplier, setViewSelectedSupplier] = useState<Supplier | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [exportHistory, setExportHistory] = useState<ExportHistory[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [selectedHistoryRecord, setSelectedHistoryRecord] = useState<ExportHistory | null>(null);
  const [showHistoryDetails, setShowHistoryDetails] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);

  useEffect(() => {
    // Initialize processed suppliers when component mounts
    setProcessedSuppliers(updateSuppliersList(mockSuppliers));
  }, []);

  const handleSearch = () => {
    if (!searchTerm.name) {
      return;
    }

    // Get all farmers from all suppliers
    const allFarmers = processedSuppliers.flatMap(supplier => 
      supplier.farmers.map(farmer => ({
        ...farmer,
        supplierName: supplier.name
      }))
    );

    // Create search results supplier with explicit source
    const searchResultsSupplier: Supplier = {
      id: 'search-results',
      name: `Search Results for: ${searchTerm.name}`,
      source: 'search' as const,
      totalFarmers: allFarmers.length,
      totalFarmSize: allFarmers.reduce((sum, farmer) => sum + farmer.farmSize, 0),
      farmers: allFarmers
    };
    
    setSelectedSupplier(searchResultsSupplier);
    setShowSupplierDetails(true);
    setShowResults(false);
    setShowSearchForm(false);
    setSearchTerm({ name: '' });
  };

  const handleSupplierClick = (supplier: Supplier) => {
    // Ensure we're using the processed supplier data
    const processedSupplier = processedSuppliers.find(s => s.id === supplier.id);
    setSelectedSupplier(processedSupplier || supplier);
    setShowSupplierDetails(true);
    setShowResults(false);
  }

  const handleFarmerSelection = (farmerId: string) => {
    if (exportedFarmers.includes(farmerId)) {
      return; // Prevent selection if already exported
    }

    const farmerToAdd = selectedSupplier?.farmers.find(f => f.farmerId === farmerId);
    if (!farmerToAdd) return;

    const requiredSizeInHectares = Number(calculateRequiredFarmSize(requiredContainerSize));
    const newTotalSize = selectedFarmers.includes(farmerId)
      ? totalFarmSize - farmerToAdd.farmSize
      : totalFarmSize + farmerToAdd.farmSize;

    if (newTotalSize > requiredSizeInHectares) {
      alert('Required Farm Unit Size would be exceeded. Cannot select more farmers.');
      return;
    }
    
    setSelectedFarmers(prev => 
      prev.includes(farmerId) 
        ? prev.filter(id => id !== farmerId)
        : [...prev, farmerId]
    );
  }

  const handleExportClick = () => {
    setShowExportModal(true)
  }

  const calculateTotalFarmSize = () => {
    if (!selectedSupplier) return 0;
    
    return selectedSupplier.farmers
      .filter(farmer => selectedFarmers.includes(farmer.farmerId))
      .reduce((total, farmer) => total + farmer.farmSize, 0);
  };

  const calculateRequiredFarmSize = (containers: number) => {
    return (containers * 2.6667).toFixed(2);
  };

  // Update total farm size whenever selected farmers change
  useEffect(() => {
    setTotalFarmSize(calculateTotalFarmSize());
  }, [selectedFarmers, selectedSupplier]);

  useEffect(() => {
    const requiredSizeInHectares = Number(calculateRequiredFarmSize(requiredContainerSize));
    if (totalFarmSize === requiredSizeInHectares) {
      setWarningMessage('Required Farm Unit Size reached. Cannot select more farmers.');
      setShowSizeWarning(true);
    } else if (totalFarmSize > requiredSizeInHectares) {
      setWarningMessage('Required Farm Unit Size would be exceeded. Cannot select more farmers.');
      setShowSizeWarning(true);
    } else {
      setShowSizeWarning(false);
    }
  }, [totalFarmSize, requiredContainerSize]);

  const calculateSupplierTotals = (supplier: Supplier) => {
    const totalFarmers = supplier.farmers.length;
    const totalFarmSize = supplier.farmers.reduce((sum, farmer) => sum + farmer.farmSize, 0);
    
    // Ensure supplier name in farmers matches the main supplier name
    const updatedFarmers = supplier.farmers.map(farmer => ({
      ...farmer,
      coffeeSupplier: supplier.name // Ensure consistency with supplier name
    }));
    
    return {
      ...supplier,
      farmers: updatedFarmers,
      totalFarmers,
      totalFarmSize: Number(totalFarmSize.toFixed(2))
    };
  };

  const updateSuppliersList = (suppliers: Supplier[]) => {
    return suppliers.map(calculateSupplierTotals);
  };

  const handleViewClick = () => {
    setViewMode('suppliers');
    setShowSearchForm(false);
    setShowSupplierDetails(false);
    setShowResults(false);
  };

  const handleViewSupplierSelect = (supplier: Supplier) => {
    const supplierWithSource = {
      ...supplier,
      source: 'view' as const
    };
    setViewSelectedSupplier(supplierWithSource);
    setViewMode('farmers');
  };

  const handleViewBack = () => {
    setViewMode('suppliers');
    setViewSelectedSupplier(null);
  };

  const handleNext = () => {
    if (!searchTerm.name) {
      return;
    }

    // Collect all farmers from all suppliers into a single list
    const allFarmers = processedSuppliers.flatMap(supplier => 
      supplier.farmers.map(farmer => ({
        ...farmer,
        coffeeSupplier: supplier.name
      }))
    );

    // Create a consolidated view with all farmers
    const consolidatedView = {
      id: 'all-farmers',
      name: searchTerm.name,
      totalFarmers: allFarmers.length,
      totalFarmSize: allFarmers.reduce((sum, farmer) => sum + farmer.farmSize, 0),
      farmers: allFarmers
    };

    // Only update states related to search section
    setSelectedSupplier(consolidatedView);
    setShowSupplierDetails(true);
    setShowSearchForm(false);
    setSearchTerm({ name: '' });
    // Don't modify viewMode or viewSelectedSupplier here
  };

  const handleUndoSelection = (farmerId: string) => {
    setSelectedFarmers(prev => prev.filter(id => id !== farmerId));
    setTotalFarmSize(prev => {
      const farmer = selectedSupplier?.farmers.find(f => f.farmerId === farmerId);
      return farmer ? prev - farmer.farmSize : prev;
    });
  };

  const downloadFile = (content: string, fileName: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleExportFormat = (format: 'csv' | 'json') => {
    // Get selected farmers' data
    const selectedFarmersData = selectedSupplier?.farmers.filter(farmer => 
      selectedFarmers.includes(farmer.farmerId)
    );

    // Add to export history with customer name from search input
    const newExportRecord: ExportHistory = {
      id: Date.now().toString(),
      customerName: searchTerm.name, // Get customer name from search input
      exportDate: new Date().toLocaleDateString(),
      containerSize: requiredContainerSize
    };
    setExportHistory(prev => [...prev, newExportRecord]);

    // Add selected farmers to exported list
    setExportedFarmers(prev => [...prev, ...selectedFarmers]);

    if (format === 'csv') {
      // CSV Headers
      const headers = [
        'Code',
        'Coffee Exporter',
        'Coffee Supplier',
        "Farmer's Name",
        'Gender',
        'Location (Kebele)',
        'Latitude',
        'Longitude',
        'Farm Size (ha)'
      ].join(',');
      // CSV Rows
      const rows = selectedFarmersData?.map(farmer => [
        farmer.code || '',
        farmer.coffeeExporter || '',
        farmer.coffeeSupplier || '',
        farmer.farmerName,
        farmer.genderId === 1 ? 'M' : 'F',
        farmer.kebele || '',
        farmer.latitude,
        farmer.longitude,
        farmer.farmSize
      ].join(','));
      const csvContent = [headers, ...(rows || [])].join('\n');
      downloadFile(csvContent, `farmers_export_${Date.now()}.csv`, 'text/csv');
    } else {
      // JSON Format
      const jsonData = selectedFarmersData?.map(farmer => ({
        code: farmer.code || '',
        coffeeExporter: farmer.coffeeExporter || '',
        coffeeSupplier: farmer.coffeeSupplier || '',
        farmerName: farmer.farmerName,
        gender: farmer.genderId === 1 ? 'M' : 'F',
        kebele: farmer.kebele || '',
        latitude: farmer.latitude,
        longitude: farmer.longitude,
        farmSize: farmer.farmSize
      }));
      const jsonContent = JSON.stringify(jsonData ?? [], null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `farmers_export_${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    setShowExportModal(false);
    setSelectedFarmers([]); // Clear selection after export
  };

  const HistoryDetails: React.FC<{
    customerName: string;
    exportedFarmers: string[];
    processedSuppliers: Supplier[];
    onClose: () => void;
  }> = ({ customerName, exportedFarmers, processedSuppliers, onClose }) => {
    // Get all exported farmers for this customer
    const exportedFarmersList = processedSuppliers
      .flatMap(supplier => supplier.farmers)
      .filter(farmer => exportedFarmers.includes(farmer.farmerId));

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
        <div className="bg-[#1a2633] border border-[#9b59b6]/30 rounded-lg p-6 w-full max-w-7xl h-[90vh]
          shadow-[0_0_25px_rgba(155,89,182,0.25)] animate-fade-in flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#9b59b6]">
              Exported Farmers - {customerName}
            </h2>
            <button onClick={onClose} className="text-[#9b59b6] hover:text-[#9b59b6]/80">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <table className="min-w-full divide-y divide-[#9b59b6]/10">
            <thead className="bg-[#0c141c]/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#9b59b6] uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#9b59b6] uppercase tracking-wider">Coffee Export</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#9b59b6] uppercase tracking-wider">Coffee Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#9b59b6] uppercase tracking-wider">Farmer's Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#9b59b6] uppercase tracking-wider">Sex</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#9b59b6] uppercase tracking-wider">Place/Kebele</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#9b59b6] uppercase tracking-wider">Coffee Farm Unit Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#9b59b6] uppercase tracking-wider">Geometry Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#9b59b6] uppercase tracking-wider">Longitude (Lon)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#9b59b6] uppercase tracking-wider">Latitude (Lat)</th>
              </tr>
            </thead>
            <tbody className="bg-[#1a2633] divide-y divide-[#9b59b6]/10">
              {exportedFarmersList.map((farmer) => (
                <tr key={farmer.farmerId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#9b59b6]/80">{farmer.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#9b59b6]/80">{farmer.coffeeExporter}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#9b59b6]/80">{farmer.coffeeSupplier}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{farmer.farmerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#9b59b6]/80">{farmer.genderId === 1 ? 'M' : 'F'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#9b59b6]/80">{farmer.kebele}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2ecc71]">{farmer.farmSize} ha</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#9b59b6]/80">{farmer.geometryType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#9b59b6]/80">{farmer.longitude}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#9b59b6]/80">{farmer.latitude}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-[#1a2633] shadow-[0_0_15px_rgba(68,188,216,0.15)] border border-[#44bcd8]/30 rounded-lg p-6 animate-fade-in">
        <h1 className="text-2xl font-semibold text-[#44bcd8] mb-2">Supplier Management</h1>
        <p className="text-gray-400 mb-2">
          Manage your supplier and farmer information.
        </p>
        <p className="text-gray-400">
          Welcome back, <span className="text-[#2ecc71] font-medium">{user?.name}</span>!
        </p>
      </div>

      {/* Enhanced Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Search Card */}
        <div 
          onClick={() => setShowSearchForm(true)}
          className="group relative bg-[#1a2633] border border-[#44bcd8]/30 
            rounded-lg overflow-hidden transition-all duration-300 
            hover:shadow-[0_0_25px_rgba(68,188,216,0.25)]"
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#44bcd8]/0 to-[#44bcd8]/5 
            group-hover:from-[#44bcd8]/5 group-hover:to-[#44bcd8]/10 transition-all duration-300" />
          
          <div className="relative p-8">
            <div className="flex items-center">
              <div className="p-4 rounded-full bg-[#44bcd8]/10 text-[#44bcd8] 
                group-hover:scale-110 transition-all duration-300">
                <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="ml-6">
                <h2 className="text-xl font-semibold text-[#44bcd8] 
                  group-hover:translate-x-2 transition-all duration-300">
                  Search
                </h2>
                <p className="text-sm text-[#44bcd8]/70 mt-1 
                  group-hover:translate-x-2 transition-all duration-300 delay-75">
                  Find specific records
                </p>
              </div>
            </div>
            
            {/* Action Hint */}
            <div className="mt-6 flex items-center text-[#44bcd8]/50 text-sm
              group-hover:translate-x-2 transition-all duration-300 delay-100">
              <span>Click to search</span>
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* View Card */}
        <div 
          onClick={handleViewClick}
          className="group relative bg-[#1a2633] border border-[#2ecc71]/30 
            rounded-lg overflow-hidden transition-all duration-300 
            hover:shadow-[0_0_25px_rgba(46,204,113,0.25)]"
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2ecc71]/0 to-[#2ecc71]/5 
            group-hover:from-[#2ecc71]/5 group-hover:to-[#2ecc71]/10 transition-all duration-300" />
          
          <div className="relative p-8">
            <div className="flex items-center">
              <div className="p-4 rounded-full bg-[#2ecc71]/10 text-[#2ecc71] 
                group-hover:scale-110 transition-all duration-300">
                <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div className="ml-6">
                <h2 className="text-xl font-semibold text-[#2ecc71] 
                  group-hover:translate-x-2 transition-all duration-300">
                  View
                </h2>
                <p className="text-sm text-[#2ecc71]/70 mt-1 
                  group-hover:translate-x-2 transition-all duration-300 delay-75">
                  Check all records
                </p>
              </div>
            </div>
            
            {/* Action Hint */}
            <div className="mt-6 flex items-center text-[#2ecc71]/50 text-sm
              group-hover:translate-x-2 transition-all duration-300 delay-100">
              <span>Click to view all</span>
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* History Card */}
        <div 
          onClick={() => setShowHistory(true)}
          className="group relative bg-[#1a2633] border border-[#9b59b6]/30 
            rounded-lg overflow-hidden transition-all duration-300 
            hover:shadow-[0_0_25px_rgba(155,89,182,0.25)]"
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#9b59b6]/0 to-[#9b59b6]/5 
            group-hover:from-[#9b59b6]/5 group-hover:to-[#9b59b6]/10 transition-all duration-300" />
          
          <div className="relative p-8">
            <div className="flex items-center">
              <div className="p-4 rounded-full bg-[#9b59b6]/10 text-[#9b59b6] 
                group-hover:scale-110 transition-all duration-300">
                <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-6">
                <h2 className="text-xl font-semibold text-[#9b59b6] 
                  group-hover:translate-x-2 transition-all duration-300">
                  History
                </h2>
                <p className="text-sm text-[#9b59b6]/70 mt-1 
                  group-hover:translate-x-2 transition-all duration-300 delay-75">
                  View export history
                </p>
              </div>
            </div>
            
            {/* Action Hint */}
            <div className="mt-6 flex items-center text-[#9b59b6]/50 text-sm
              group-hover:translate-x-2 transition-all duration-300 delay-100">
              <span>Click to view history</span>
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Search Form Modal */}
      {showSearchForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a2633] border border-[#44bcd8]/30 rounded-lg p-6 w-full max-w-xl
            shadow-[0_0_25px_rgba(68,188,216,0.25)] animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#44bcd8]">Search</h2>
              <button 
                onClick={() => setShowSearchForm(false)}
                className="text-[#44bcd8]/80 hover:text-[#44bcd8] transition-colors duration-200"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#44bcd8]/80 mb-1">Customer Name</label>
                <input
                  type="text"
                  value={searchTerm.name}
                  onChange={(e) => setSearchTerm({ ...searchTerm, name: e.target.value })}
                  className="block w-full px-3 py-2 bg-[#0c141c] border border-[#44bcd8]/30 rounded-md 
                    text-white placeholder-[#44bcd8]/50
                    focus:ring-[#44bcd8] focus:border-[#44bcd8] sm:text-sm"
                />
              </div>
              <div className="pt-4">
                <button
                  onClick={handleNext}
                  disabled={!searchTerm.name}
                  className={`w-full py-2 px-4 rounded-md transition-colors duration-200 
                    ${!searchTerm.name
                      ? 'bg-[#2ecc71]/50 cursor-not-allowed'
                      : 'bg-[#2ecc71] hover:bg-[#2ecc71]/90'
                    }
                    text-white focus:outline-none focus:ring-2 focus:ring-offset-2 
                    focus:ring-[#2ecc71]`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Modal */}
      {showResults && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a2633] border border-[#44bcd8]/30 rounded-lg p-6 w-full max-w-7xl h-[90vh]
            shadow-[0_0_25px_rgba(68,188,216,0.25)] animate-fade-in flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#44bcd8]">Supplier List</h2>
              <button onClick={() => setShowResults(false)} className="text-[#44bcd8] hover:text-[#44bcd8]/80">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <table className="min-w-full divide-y divide-[#44bcd8]/10">
              <thead className="bg-[#0c141c]/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Supplier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Total Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Total Farmers</th>
                </tr>
              </thead>
              <tbody className="bg-[#1a2633] divide-y divide-[#44bcd8]/10">
                {(searchResults.length > 0 ? searchResults : processedSuppliers).map((supplier, index) => (
                  <tr 
                    key={supplier.id}
                    onClick={() => handleSupplierClick(supplier)}
                    className="hover:bg-[#44bcd8]/5 cursor-pointer transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#44bcd8]/80">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{supplier.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2ecc71]">{supplier.totalFarmSize} ha</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2ecc71]">{supplier.totalFarmers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Supplier Details Modal */}
      {showSupplierDetails && selectedSupplier && (
        <SearchFarmersList 
          supplier={selectedSupplier}
          onBack={() => {
            setShowSupplierDetails(false);
            setSelectedSupplier(null);
            setShowResults(false);
            setShowSearchForm(false);
          }}
          requiredContainerSize={requiredContainerSize}
          setRequiredContainerSize={setRequiredContainerSize}
          totalFarmSize={totalFarmSize}
          calculateRequiredFarmSize={calculateRequiredFarmSize}
          setShowSupplierDetails={setShowSupplierDetails}
          setShowSearchForm={setShowSearchForm}
          setSelectedSupplier={setSelectedSupplier}
          setViewMode={setViewMode}
          selectedFarmers={selectedFarmers}
          handleFarmerSelection={handleFarmerSelection}
          handleUndoSelection={handleUndoSelection}
          exportedFarmers={exportedFarmers}
          setExportHistory={setExportHistory}
          searchTerm={searchTerm}
          handleExportFormat={handleExportFormat}
        />
      )}

      {viewMode === 'farmers' && viewSelectedSupplier && (
        <ViewOnlyFarmersList 
          supplier={viewSelectedSupplier}
          onBack={handleViewBack}
          setViewMode={setViewMode}
        />
      )}

      {/* Export Format Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a2633] border border-[#44bcd8]/30 rounded-lg p-6 w-full max-w-md
            shadow-[0_0_25px_rgba(68,188,216,0.25)] animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#44bcd8]">Choose Export Format</h2>
              <button 
                onClick={() => setShowExportModal(false)}
                className="text-[#44bcd8]/80 hover:text-[#44bcd8] transition-colors duration-200"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  handleExportFormat('csv');
                  setShowExportModal(false);
                }}
                className="flex flex-col items-center gap-3 p-4 bg-[#0c141c] border border-[#44bcd8]/30 
                  rounded-lg hover:bg-[#44bcd8]/10 transition-colors duration-200"
              >
                <svg className="h-8 w-8 text-[#44bcd8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm font-medium text-[#44bcd8]">CSV Format</span>
              </button>
              
              <button
                onClick={() => {
                  handleExportFormat('json');
                  setShowExportModal(false);
                }}
                className="flex flex-col items-center gap-3 p-4 bg-[#0c141c] border border-[#44bcd8]/30 
                  rounded-lg hover:bg-[#44bcd8]/10 transition-colors duration-200"
              >
                <svg className="h-8 w-8 text-[#44bcd8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                <span className="text-sm font-medium text-[#44bcd8]">JSON Format</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'suppliers' && (
        <ViewOnlySupplierList 
          onSupplierSelect={handleViewSupplierSelect}
          suppliers={processedSuppliers}
          onClose={() => setViewMode(null)}
        />
      )}

      {/* History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a2633] border border-[#9b59b6]/30 rounded-lg p-6 w-full max-w-3xl h-[90vh]
            shadow-[0_0_25px_rgba(155,89,182,0.25)] animate-fade-in flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#9b59b6]">Export History</h2>
              <button onClick={() => setShowHistory(false)} className="text-[#9b59b6] hover:text-[#9b59b6]/80">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <table className="min-w-full divide-y divide-[#9b59b6]/10">
              <thead className="bg-[#0c141c]/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#9b59b6] uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#9b59b6] uppercase tracking-wider">Customer Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#9b59b6] uppercase tracking-wider">Container Size</th>
                </tr>
              </thead>
              <tbody className="bg-[#1a2633] divide-y divide-[#9b59b6]/10">
                {exportHistory.map((record) => (
                  <tr 
                    key={record.id}
                    onClick={() => {
                      setSelectedHistoryRecord(record);
                      setShowHistoryDetails(true);
                      setSelectedCustomer(record.customerName);
                      setShowHistory(false);
                    }}
                    className="hover:bg-[#9b59b6]/5 cursor-pointer transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{record.exportDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{record.customerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2ecc71]">{record.containerSize}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* History Details Modal */}
      {showHistoryDetails && selectedCustomer && (
        <HistoryDetails
          customerName={selectedCustomer}
          exportedFarmers={exportedFarmers}
          processedSuppliers={processedSuppliers}
          onClose={() => {
            setShowHistoryDetails(false);
            setSelectedCustomer(null);
            setShowHistory(true);
          }}
        />
      )}
    </div>
  )
}