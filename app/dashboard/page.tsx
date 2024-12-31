'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { mockSuppliers } from '@/app/data/mockData'
import { Supplier } from '@/app/types'

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

  const handleSearch = () => {
    if (!searchTerm.name) {
      return;
    }

    const filteredResults = mockSuppliers.filter(supplier => {
      const nameMatch = supplier.name.toLowerCase().includes(searchTerm.name.toLowerCase())
      return nameMatch
    })
    
    setSearchResults(filteredResults)
    setShowResults(true)
    setShowSearchForm(false)
    setShowSupplierDetails(false)
    
    setSearchTerm({ name: '' })
  }

  const handleSupplierClick = (supplier: Supplier) => {
    setSelectedSupplier(supplier)
    setShowSupplierDetails(true)
    setShowResults(false)
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

  const handleExportFormat = (format: 'csv' | 'json') => {
    const selectedFarmerData = selectedSupplier?.farmers.filter(farmer => 
      selectedFarmers.includes(farmer.farmerId)
    )

    if (format === 'csv') {
      // Updated CSV headers to match table columns
      const csvContent = [
        ['Code', 'Coffee Exporter', 'Coffee Supplier', 'Farmer ID', 'Name', 'Gender', 
         'Location (Kebele)', 'Farm Size (ha)', 'Geometry Type', 'Longitude', 'Latitude'],
        ...selectedFarmerData!.map(farmer => [
          farmer.code,
          farmer.coffeeExporter,
          farmer.coffeeSupplier,
          farmer.farmerId,
          farmer.farmerName,
          farmer.genderId === 1 ? 'M' : 'F',
          farmer.kebele,
          farmer.farmSize.toString(),
          farmer.geometryType,
          farmer.longitude,
          farmer.latitude
        ])
      ].map(row => row.join(',')).join('\n')

      downloadFile(csvContent, `${selectedSupplier?.name}_selected_farmers.csv`, 'text/csv')
    } else {
      // JSON format already includes all data
      const jsonContent = JSON.stringify(selectedFarmerData, null, 2)
      downloadFile(jsonContent, `${selectedSupplier?.name}_selected_farmers.json`, 'application/json')
    }

    setShowExportModal(false)
    setExportedFarmers(prev => [...prev, ...selectedFarmers])
    setSelectedFarmers([])
  }

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

        {/* View Card - Similar structure with green accent */}
        <div 
          onClick={() => setShowResults(true)}
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
                  onClick={handleSearch}
                  disabled={!searchTerm.name}
                  className={`w-full py-2 px-4 rounded-md transition-colors duration-200 
                    ${!searchTerm.name
                      ? 'bg-[#2ecc71]/50 cursor-not-allowed'
                      : 'bg-[#2ecc71] hover:bg-[#2ecc71]/90'
                    }
                    text-white focus:outline-none focus:ring-2 focus:ring-offset-2 
                    focus:ring-[#2ecc71]`}
                >
                  Search
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
                {(searchResults.length > 0 ? searchResults : mockSuppliers).map((supplier, index) => (
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a2633] border border-[#44bcd8]/30 rounded-lg p-6 w-full max-w-7xl h-[90vh]
            shadow-[0_0_25px_rgba(68,188,216,0.25)] animate-fade-in flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#44bcd8]">{selectedSupplier.name}</h2>
              <button
                onClick={() => {
                  setShowSupplierDetails(false)
                  setSelectedSupplier(null)
                  setShowResults(true)
                }}
                className="text-[#44bcd8] hover:text-[#44bcd8]/80"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flex-1 overflow-auto">
              <div className="flex justify-between items-start mb-6">
                {/* Left side - Title and Metrics */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-medium text-[#44bcd8]">Farmer Details</h3>
                  
                  <div className="flex flex-col gap-3 bg-[#0c141c]/50 p-4 rounded-lg border border-[#44bcd8]/20">
                    {/* Required Container Size Input */}
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-medium text-[#44bcd8]/80 min-w-[180px]">Required Container Size:</span>
                      <input
                        type="number"
                        min="0"
                        value={requiredContainerSize}
                        onChange={(e) => setRequiredContainerSize(Number(e.target.value))}
                        className="w-32 px-3 py-1.5 bg-[#0c141c] border border-[#44bcd8]/30 rounded-md 
                          text-white placeholder-[#44bcd8]/50 text-sm text-center
                          focus:ring-[#44bcd8] focus:border-[#44bcd8]"
                        placeholder=""
                      />
                    </div>

                    {/* Required Farm Unit Size Display */}
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-medium text-[#44bcd8]/80 min-w-[180px]">Required Farm Unit Size:</span>
                      <span className="w-32 px-3 py-1.5 bg-[#0c141c] border border-[#44bcd8]/30 rounded-md 
                        text-[#44bcd8] text-sm text-center">
                        {calculateRequiredFarmSize(requiredContainerSize)} ha
                      </span>
                    </div>

                    {/* Selected Farm Unit Size Display */}
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-medium text-[#44bcd8]/80 min-w-[180px]">Selected Farm Unit Size:</span>
                      <span className="w-32 px-3 py-1.5 bg-[#0c141c] border border-[#44bcd8]/30 rounded-md 
                        text-[#2ecc71] text-sm text-center">
                        {totalFarmSize.toFixed(2)} ha
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right side - Action Buttons */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSelectedFarmers([])}
                    className="px-4 py-2 text-[#44bcd8] border border-[#44bcd8] rounded-lg
                      hover:bg-[#44bcd8]/10 transition-colors duration-200"
                    disabled={selectedFarmers.length === 0}
                  >
                    Undo All
                  </button>
                  <button
                    onClick={handleExportClick}
                    className="px-4 py-2 bg-[#2ecc71] text-white rounded-lg
                      hover:bg-[#2ecc71]/90 transition-colors duration-200"
                    disabled={selectedFarmers.length === 0}
                  >
                    Export Selected ({selectedFarmers.length})
                  </button>
                </div>
              </div>
              <table className="min-w-full divide-y divide-[#44bcd8]/10">
                <thead className="bg-[#0c141c]/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Coffee Exporter</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Coffee Supplier</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Farmer's Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Gender</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Location (Kebele)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Farm Size (ha)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Geometry Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Long</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Lat</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-[#1a2633] divide-y divide-[#44bcd8]/10">
                  {selectedSupplier.farmers.map((farmer) => {
                    const isSelected = selectedFarmers.includes(farmer.farmerId);
                    const isExported = exportedFarmers.includes(farmer.farmerId);
                    
                    return (
                      <tr 
                        key={farmer.farmerId}
                        className={`${isSelected ? 'bg-[#2ecc71]/10' : ''} 
                          ${isExported ? 'opacity-50' : ''} 
                          transition-colors duration-200`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#44bcd8]/80">{farmer.code}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#44bcd8]/80">{farmer.coffeeExporter}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#44bcd8]/80">{farmer.coffeeSupplier}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{farmer.farmerName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#44bcd8]/80">
                          {farmer.genderId === 1 ? 'M' : 'F'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#44bcd8]/80">{farmer.kebele}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2ecc71]">{farmer.farmSize}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#44bcd8]/80">{farmer.geometryType}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#44bcd8]/80">{farmer.longitude}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#44bcd8]/80">{farmer.latitude}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleFarmerSelection(farmer.farmerId)}
                            disabled={isExported}
                            className={`px-3 py-1 rounded-md transition-colors duration-200 ${
                              isExported
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : isSelected
                                  ? 'bg-[#2ecc71] text-white hover:bg-[#2ecc71]/90'
                                  : 'border border-[#2ecc71] text-[#2ecc71] hover:bg-[#2ecc71]/10'
                            }`}
                          >
                            {isExported ? 'Exported' : isSelected ? 'Selected' : 'Select'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
                onClick={() => handleExportFormat('csv')}
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
                onClick={() => handleExportFormat('json')}
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
  )
}