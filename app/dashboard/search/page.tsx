'use client'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { mockSuppliers } from '@/app/data/mockData'
import { Supplier } from '@/app/types'
import { useAuth } from '@/app/contexts/AuthContext'

interface SearchResultsProps {
  name: string
  size: string
}

export default function SearchResultsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const [searchResults, setSearchResults] = useState<Supplier[]>([])
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      router.push('/login')
      return
    }

    // Get search parameters
    const name = searchParams.get('name') || ''
    const size = searchParams.get('size') || ''
    
    const filteredResults = mockSuppliers.filter(supplier => {
      const nameMatch = supplier.name.toLowerCase().includes(name.toLowerCase())
      const sizeMatch = size ? supplier.totalFarmSize.toString().includes(size) : true
      return nameMatch && sizeMatch
    })
    
    setSearchResults(filteredResults)
  }, [searchParams, user, router])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Search Results</h1>
        <button
          onClick={() => router.back()}
          className="text-sm text-purple-600 hover:text-purple-700 flex items-center"
        >
          <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Farmers</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {searchResults.map((supplier, index) => (
              <tr 
                key={supplier.id}
                onClick={() => router.push(`/dashboard/supplier/${supplier.id}`)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{supplier.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{supplier.totalFarmSize} ha</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{supplier.totalFarmers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 