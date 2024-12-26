'use client'
import { useState } from 'react'

export default function DashboardPage() {
  const [showSearchForm, setShowSearchForm] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [showSupplierDetails, setShowSupplierDetails] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null)
  const [formData, setFormData] = useState({
    customerName: '',
    containerSize: ''
  })

  // Updated mock data structure with supplier and farmer information
  const mockResults = [
    {
      supplierId: "001",
      supplierName: "Ethiopian Coffee Exports",
      totalFarmSize: "5000 acres",
      totalFarmerCount: 5,
      details: {
        farmers: [
          {
            farmerId: 1,
            farmerName: "Yadesa Deresa",
            supplierId: 1,
            genderId: 1,
            farmSize: 0.5,
            locationId: 1,
            pointLocationId: 1,
            latitude: 34.766757,
            longitude: 8.574079
          },
          {
            farmerId: 2,
            farmerName: "Chaltu Bekele",
            supplierId: 1,
            genderId: 2,
            farmSize: 0.7,
            locationId: 1,
            pointLocationId: 2,
            latitude: 34.768123,
            longitude: 8.575642
          },
          {
            farmerId: 3,
            farmerName: "Tolesa Mulatu",
            supplierId: 1,
            genderId: 1,
            farmSize: 0.4,
            locationId: 1,
            pointLocationId: 3,
            latitude: 34.765890,
            longitude: 8.573456
          },
          {
            farmerId: 4,
            farmerName: "Dinknesh Hailu",
            supplierId: 1,
            genderId: 2,
            farmSize: 0.6,
            locationId: 1,
            pointLocationId: 4,
            latitude: 34.767234,
            longitude: 8.576789
          },
          {
            farmerId: 5,
            farmerName: "Gemechu Tadesse",
            supplierId: 1,
            genderId: 1,
            farmSize: 0.8,
            locationId: 1,
            pointLocationId: 5,
            latitude: 34.764567,
            longitude: 8.572345
          }
        ],
        location: "Jimma Zone"
      }
    },
    {
      supplierId: "002",
      supplierName: "Oromia Coffee Union",
      totalFarmSize: "3500 acres",
      totalFarmerCount: 5,
      details: {
        farmers: [
          {
            farmerId: 6,
            farmerName: "Abebe Kebede",
            supplierId: 2,
            genderId: 1,
            farmSize: 0.9,
            locationId: 2,
            pointLocationId: 6,
            latitude: 34.772345,
            longitude: 8.582341
          },
          {
            farmerId: 7,
            farmerName: "Tigist Alemu",
            supplierId: 2,
            genderId: 2,
            farmSize: 0.6,
            locationId: 2,
            pointLocationId: 7,
            latitude: 34.773456,
            longitude: 8.583452
          },
          {
            farmerId: 8,
            farmerName: "Girma Tadesse",
            supplierId: 2,
            genderId: 1,
            farmSize: 0.8,
            locationId: 2,
            pointLocationId: 8,
            latitude: 34.771234,
            longitude: 8.581234
          },
          {
            farmerId: 9,
            farmerName: "Hiwot Mengistu",
            supplierId: 2,
            genderId: 2,
            farmSize: 0.5,
            locationId: 2,
            pointLocationId: 9,
            latitude: 34.774567,
            longitude: 8.584567
          },
          {
            farmerId: 10,
            farmerName: "Fekadu Tessema",
            supplierId: 2,
            genderId: 1,
            farmSize: 0.7,
            locationId: 2,
            pointLocationId: 10,
            latitude: 34.770123,
            longitude: 8.580123
          }
        ],
        location: "Sidama Region"
      }
    },
    // ... 6 more suppliers with similar structure
  ]

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search form submission logic here
    console.log('Search:', formData)
    setShowSearchForm(false)
    setFormData({ customerName: '', containerSize: '' })
  }

  const handleViewClick = () => {
    setShowResults(true)
    setShowSupplierDetails(false)
    setSelectedSupplier(null)
  }

  const handleSupplierClick = (supplier: any) => {
    setSelectedSupplier(supplier)
    setShowSupplierDetails(true)
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white shadow rounded-lg p-6 animate-fade-in">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Supplier Stoke</h1>
        <p className="text-gray-600">
          Welcome to Nefas Silk Export!
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Search Card */}
        <div 
          onClick={() => setShowSearchForm(true)}
          className="bg-white shadow-md rounded-lg p-8 hover:shadow-xl 
            transform hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
        >
          <div className="flex items-center">
            <div className="p-4 rounded-full bg-gradient-to-br from-purple-100 to-purple-50 
              text-purple-600 group-hover:shadow-inner transition-all duration-300">
              <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="ml-6">
              <h2 className="text-xl font-semibold text-gray-700 group-hover:text-purple-600 
                transition-colors duration-300">Search</h2>
              <p className="text-sm text-gray-500 mt-1">Find specific records</p>
            </div>
          </div>
        </div>

        {/* View Card */}
        <div 
          onClick={handleViewClick}
          className="bg-white shadow-md rounded-lg p-8 hover:shadow-xl 
            transform hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
        >
          <div className="flex items-center">
            <div className="p-4 rounded-full bg-gradient-to-br from-green-100 to-green-50 
              text-green-600 group-hover:shadow-inner transition-all duration-300">
              <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="ml-6">
              <h2 className="text-xl font-semibold text-gray-700 group-hover:text-green-600 
                transition-colors duration-300">View</h2>
              <p className="text-sm text-gray-500 mt-1">Check all records</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Form Modal */}
      {showSearchForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 animate-fade-in">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Search Records</h2>
            <form onSubmit={handleSearchSubmit} className="space-y-6">
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
                  Customer Name
                </label>
                <input
                  type="text"
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2
                    focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Enter customer name..."
                />
              </div>
              <div>
                <label htmlFor="containerSize" className="block text-sm font-medium text-gray-700">
                  Container Size
                </label>
                <input
                  type="text"
                  id="containerSize"
                  value={formData.containerSize}
                  onChange={(e) => setFormData({ ...formData, containerSize: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2
                    focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Enter container size..."
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 text-white px-4 py-2 rounded-md bg-purple-600 
                    hover:bg-purple-700 transition-colors duration-200"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowSearchForm(false)
                    setFormData({ customerName: '', containerSize: '' })
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md
                    hover:bg-gray-300 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Results Modal */}
      {showResults && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-5xl w-full mx-4 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Supplier Records</h2>
              <button
                onClick={() => setShowResults(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="overflow-x-auto max-h-[calc(100vh-200px)]">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Supplier ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Supplier Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Farm Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Farmer Count
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockResults.map((result, index) => (
                    <tr 
                      key={index} 
                      className="hover:bg-gray-50 cursor-pointer" 
                      onClick={() => handleSupplierClick(result)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {result.supplierId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 font-medium">
                        {result.supplierName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {result.totalFarmSize}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {result.totalFarmerCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Supplier Details Modal */}
      {showSupplierDetails && selectedSupplier && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-7xl w-full mx-4 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">{selectedSupplier.supplierName}</h2>
              <button
                onClick={() => setShowSupplierDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Farmer ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Farmer Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gender ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Farm Size</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Point Location ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Latitude</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Longitude</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedSupplier.details.farmers.map((farmer: any) => (
                      <tr key={farmer.farmerId} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{farmer.farmerId}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{farmer.farmerName}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{farmer.supplierId}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{farmer.genderId}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{farmer.farmSize} acres</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{farmer.locationId}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{farmer.pointLocationId}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{farmer.latitude}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{farmer.longitude}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-lg font-medium text-gray-900">{selectedSupplier.details.location}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 