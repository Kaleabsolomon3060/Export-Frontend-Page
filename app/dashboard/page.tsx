'use client'
import { useState } from 'react'
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
  const [searchTerm, setSearchTerm] = useState({ name: '', size: '' })
  const [searchResults, setSearchResults] = useState<Supplier[]>([])
  const [selectedFarmers, setSelectedFarmers] = useState<string[]>([])
  const [exportedFarmers, setExportedFarmers] = useState<string[]>([])

  const handleSearch = () => {
    // Don't search if both fields are empty
    if (!searchTerm.name && !searchTerm.size) {
      return;
    }

    const filteredResults = mockSuppliers.filter(supplier => {
      const nameMatch = supplier.name.toLowerCase().includes(searchTerm.name.toLowerCase())
      const sizeMatch = searchTerm.size ? supplier.totalFarmSize.toString().includes(searchTerm.size) : true
      return nameMatch && sizeMatch
    })
    
    setSearchResults(filteredResults)
    setShowResults(true)
    setShowSearchForm(false)
    setShowSupplierDetails(false)
    
    // Reset search terms after search
    setSearchTerm({ name: '', size: '' })
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
    
    setSelectedFarmers(prev => 
      prev.includes(farmerId) 
        ? prev.filter(id => id !== farmerId)
        : [...prev, farmerId]
    )
  }

  const handleExport = () => {
    const selectedFarmerData = selectedSupplier?.farmers.filter(farmer => 
      selectedFarmers.includes(farmer.farmerId)
    )
    
    // Create CSV content
    const csvContent = [
      ['Farmer ID', 'Name', 'Gender', 'Farm Size (ha)', 'Location'],
      ...selectedFarmerData!.map(farmer => [
        farmer.farmerId,
        farmer.farmerName,
        farmer.genderId === 1 ? 'Male' : 'Female',
        farmer.farmSize.toString(),
        `${farmer.latitude}, ${farmer.longitude}`
      ])
    ].map(row => row.join(',')).join('\n')

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedSupplier?.name}_selected_farmers.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    // After successful export, update exported farmers list
    setExportedFarmers(prev => [...prev, ...selectedFarmers])
    setSelectedFarmers([]) // Clear current selections
  }

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
              <div>
                <label className="block text-sm font-medium text-[#44bcd8]/80 mb-1">Container Size</label>
                <input
                  type="text"
                  value={searchTerm.size}
                  onChange={(e) => setSearchTerm({ ...searchTerm, size: e.target.value })}
                  className="block w-full px-3 py-2 bg-[#0c141c] border border-[#44bcd8]/30 rounded-md 
                    text-white placeholder-[#44bcd8]/50
                    focus:ring-[#44bcd8] focus:border-[#44bcd8] sm:text-sm"
                />
              </div>
              <div className="pt-4">
                <button
                  onClick={handleSearch}
                  disabled={!searchTerm.name && !searchTerm.size}
                  className={`w-full py-2 px-4 rounded-md transition-colors duration-200 
                    ${(!searchTerm.name && !searchTerm.size)
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
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-[#44bcd8]">Farmer Details</h3>
                <div className="space-x-4">
                  <button
                    onClick={() => setSelectedFarmers([])}
                    className="px-4 py-2 text-[#44bcd8] border border-[#44bcd8] rounded-lg
                      hover:bg-[#44bcd8]/10 transition-colors duration-200"
                    disabled={selectedFarmers.length === 0}
                  >
                    Undo All
                  </button>
                  <button
                    onClick={handleExport}
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Farmer ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Gender</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Farm Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#44bcd8] uppercase tracking-wider">Location</th>
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#44bcd8]/80">{farmer.farmerId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white flex items-center gap-2">
                          {farmer.farmerName}
                          {isExported ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#44bcd8]/20 text-[#44bcd8]">
                              Exported
                            </span>
                          ) : isSelected && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#2ecc71]/20 text-[#2ecc71]">
                              Selected
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#44bcd8]/80">
                          {farmer.genderId === 1 ? 'Male' : 'Female'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2ecc71]">{farmer.farmSize} ha</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#44bcd8]/80">
                          {farmer.latitude}, {farmer.longitude}
                        </td>
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
    </div>
  )
}