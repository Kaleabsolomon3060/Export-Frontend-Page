export interface Farmer {
  farmerId: string
  farmerName: string
  genderId: number
  farmSize: number
  latitude: number
  longitude: number
}

export interface Supplier {
  id: string
  name: string
  totalFarmSize: number
  totalFarmers: number
  farmers: Farmer[]
} 