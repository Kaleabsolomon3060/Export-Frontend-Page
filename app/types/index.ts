export interface Farmer {
  farmerId: string
  farmerName: string
  genderId: number
  farmSize: number
  latitude: number
  longitude: number
  code?: string
  coffeeExporter?: string
  coffeeSupplier?: string
  kebele?: string
  geometryType?: string
  containers?: number
}

export interface SelectedFarmerData extends Farmer {
  containers: number
}

export interface Supplier {
  id: string
  name: string
  totalFarmSize: number
  totalFarmers: number
  farmers: Farmer[]
  source?: 'search' | 'view'
} 