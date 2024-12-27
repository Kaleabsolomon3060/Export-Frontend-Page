export interface Farmer {
  farmerId: number
  farmerName: string
  supplierId: number
  genderId: number
  farmSize: number
  locationId: number
  pointLocationId: number
  latitude: number
  longitude: number
}

export interface Supplier {
  id: number
  name: string
  totalFarmSize: number
  totalFarmers: number
  farmers: Farmer[]
} 