export const mockSuppliers = [
  {
    id: '1',
    name: 'Addis Ababa Coffee Cooperative',
    totalFarmSize: 250,
    totalFarmers: 8,
    farmers: [
      {
        farmerId: 'F101',
        code: 'S-HK-0001',
        coffeeExporter: 'Nefas Silk Plc',
        coffeeSupplier: 'Dinkinesh Olana',
        farmerName: 'Abebe Kebede',
        genderId: 1,
        kebele: 'H/kero',
        farmSize: 0.5,
        geometryType: 'PointLocation',
        latitude: 8.574079,
        longitude: 34.766757
      },
      {
        farmerId: 'F102',
        code: 'S-HK-0002',
        coffeeExporter: 'Nefas Silk Plc',
        coffeeSupplier: 'Dinkinesh Olana',
        farmerName: 'Sara Tesfaye',
        genderId: 2,
        kebele: 'H/kero',
        farmSize: 1.0,
        geometryType: 'PointLocation',
        latitude: 8.571929,
        longitude: 34.772468
      },
      {
        farmerId: 'F103',
        code: 'S-HK-0003',
        coffeeExporter: 'Nefas Silk Plc',
        coffeeSupplier: 'Dinkinesh Olana',
        farmerName: 'Tadesse Haile',
        genderId: 1,
        kebele: 'H/kero',
        farmSize: 1.5,
        geometryType: 'PointLocation',
        latitude: 8.577142,
        longitude: 34.771564
      },
      {
        farmerId: 'F104',
        code: 'S-HK-0004',
        coffeeExporter: 'Nefas Silk Plc',
        coffeeSupplier: 'Dinkinesh Olana',
        farmerName: 'Tigist Mengistu',
        genderId: 2,
        kebele: 'H/kero',
        farmSize: 1.0,
        geometryType: 'PointLocation',
        latitude: 8.574079,
        longitude: 34.766757
      },
      {
        farmerId: 'F105',
        code: 'S-HK-0005',
        coffeeExporter: 'Nefas Silk Plc',
        coffeeSupplier: 'Dinkinesh Olana',
        farmerName: 'Mohammed Ali',
        genderId: 1,
        kebele: 'H/kero',
        farmSize: 1.0,
        geometryType: 'PointLocation',
        latitude: 8.571929,
        longitude: 34.772468
      },
      {
        farmerId: 'F106',
        code: 'S-HK-0006',
        coffeeExporter: 'Nefas Silk Plc',
        coffeeSupplier: 'Dinkinesh Olana',
        farmerName: 'Hirut Solomon',
        genderId: 2,
        kebele: 'H/kero',
        farmSize: 2.3,
        geometryType: 'PointLocation',
        latitude: 8.577142,
        longitude: 34.771564
      },
      {
        farmerId: 'F107',
        code: 'S-HK-0001',
        coffeeExporter: 'Nefas Silk Plc',
        coffeeSupplier: 'Dinkinesh Olana',
        farmerName: 'Yohannes Tekle',
        genderId: 1,
        kebele: 'H/kero',
        farmSize: 1.0,
        geometryType: 'PointLocation',
        latitude: 8.574079,
        longitude: 34.766757
      },
      {
        farmerId: 'F108',
        code: 'S-HK-0002',
        coffeeExporter: 'Nefas Silk Plc',
        coffeeSupplier: 'Dinkinesh Olana',
        farmerName: 'Bethlehem Hailu',
        genderId: 2,
        kebele: 'H/kero',
        farmSize: 0.5,
        geometryType: 'PointLocation',
        latitude: 8.571929,
        longitude: 34.772468
      }
    ]
  },
  {
    id: '2',
    name: 'Oromia Coffee Union',
    totalFarmSize: 280,
    totalFarmers: 8,
    farmers: [
      {
        farmerId: 'F201',
        code: 'S-HK-0001',
        coffeeExporter: 'Nefas Silk Plc',
        coffeeSupplier: 'Gemechu Bekele',
        farmerName: 'Mohammed Ahmed',
        genderId: 1,
        kebele: 'H/kero',
        farmSize: 0.5,
        geometryType: 'PointLocation',
        latitude: 8.574079,
        longitude: 34.766757
      },
      // ... 7 more farmers with similar pattern
    ]
  },
  {
    id: '3',
    name: 'Sidama Coffee Farmers Cooperative',
    totalFarmSize: 320,
    totalFarmers: 8,
    farmers: [
      {
        farmerId: 'F301',
        code: 'S-HK-0001',
        coffeeExporter: 'Nefas Silk Plc',
        coffeeSupplier: 'Tadesse Hailu',
        farmerName: 'Dawit Mengistu',
        genderId: 1,
        kebele: 'H/kero',
        farmSize: 0.5,
        geometryType: 'PointLocation',
        latitude: 8.574079,
        longitude: 34.766757
      },
      // ... 7 more farmers with similar pattern
    ]
  },
  {
    id: '4',
    name: 'Yirgacheffe Coffee Farmers Cooperative',
    totalFarmSize: 290,
    totalFarmers: 10,
    farmers: Array(10).fill(null).map((_, index) => ({
      farmerId: `F4${(index + 1).toString().padStart(2, '0')}`,
      code: `S-YR-${(index + 1).toString().padStart(4, '0')}`,
      coffeeExporter: 'Yirgacheffe Export Union',
      coffeeSupplier: 'Yirgacheffe Coffee Farmers Cooperative',
      farmerName: ['Alemayehu Tadesse', 'Birtukan Alemu', 'Chala Bekele', 'Desta Haile', 
                  'Ephrem Wolde', 'Fikirte Tesfaye', 'Girma Mengistu', 'Hanna Desta', 
                  'Ibrahim Mohammed', 'Jalene Tadesse'][index],
      genderId: index % 2 === 0 ? 1 : 2,
      kebele: 'Yirgacheffe',
      farmSize: [0.5, 1.0, 1.5, 0.75, 1.25, 0.8, 1.3, 0.9, 1.1, 0.7][index],
      geometryType: 'PointLocation',
      latitude: 6.1728 + (index * 0.001),
      longitude: 38.2071 + (index * 0.001)
    }))
  },
  {
    id: '5',
    name: 'Jimma Coffee Growers',
    totalFarmSize: 310,
    totalFarmers: 9,
    farmers: Array(9).fill(null).map((_, index) => ({
      farmerId: `F5${(index + 1).toString().padStart(2, '0')}`,
      code: `S-JM-${(index + 1).toString().padStart(4, '0')}`,
      coffeeExporter: 'Jimma Export Company',
      coffeeSupplier: 'Jimma Coffee Growers',
      farmerName: ['Kebede Assefa', 'Lemlem Hailu', 'Mulatu Teshome', 'Nardos Bekele',
                  'Obsa Demeke', 'Paulos Girma', 'Rahel Solomon', 'Samuel Tekle',
                  'Tigist Yohannes'][index],
      genderId: index % 2 === 0 ? 1 : 2,
      kebele: 'Jimma',
      farmSize: [1.2, 0.8, 1.5, 0.9, 1.1, 1.3, 0.7, 1.0, 0.6][index],
      geometryType: 'PointLocation',
      latitude: 7.6742 + (index * 0.001),
      longitude: 36.8344 + (index * 0.001)
    }))
  },
  {
    id: '6',
    name: 'Harar Coffee Alliance',
    totalFarmSize: 270,
    totalFarmers: 8,
    farmers: Array(8).fill(null).map((_, index) => ({
      farmerId: `F6${(index + 1).toString().padStart(2, '0')}`,
      code: `S-HR-${(index + 1).toString().padStart(4, '0')}`,
      coffeeExporter: 'Harar Export Union',
      coffeeSupplier: 'Harar Coffee Alliance',
      farmerName: ['Usman Ali', 'Violet Desta', 'Wondwossen Haile', 'Xena Bekele',
                  'Yared Solomon', 'Zema Tekle', 'Abebe Wolde', 'Bethelhem Kassahun'][index],
      genderId: index % 2 === 0 ? 1 : 2,
      kebele: 'Harar',
      farmSize: [0.9, 1.1, 0.8, 1.2, 1.0, 0.7, 1.3, 0.6][index],
      geometryType: 'PointLocation',
      latitude: 9.3127 + (index * 0.001),
      longitude: 42.1150 + (index * 0.001)
    }))
  },
  {
    id: '7',
    name: 'Guji Coffee Cooperative',
    totalFarmSize: 340,
    totalFarmers: 11,
    farmers: Array(11).fill(null).map((_, index) => ({
      farmerId: `F7${(index + 1).toString().padStart(2, '0')}`,
      code: `S-GJ-${(index + 1).toString().padStart(4, '0')}`,
      coffeeExporter: 'Guji Export Union',
      coffeeSupplier: 'Guji Coffee Cooperative',
      farmerName: ['Chaltu Negash', 'Dagmawi Tekle', 'Elsabet Haile', 'Fasika Bekele',
                  'Getachew Alemu', 'Hiwot Desta', 'Iyasu Wolde', 'Konjit Solomon',
                  'Leul Mengistu', 'Meskerem Hailu', 'Nahom Tesfaye'][index],
      genderId: index % 2 === 0 ? 1 : 2,
      kebele: 'Guji',
      farmSize: [1.0, 0.8, 1.2, 0.9, 1.1, 0.7, 1.3, 1.0, 0.6, 1.4, 0.8][index],
      geometryType: 'PointLocation',
      latitude: 5.6417 + (index * 0.001),
      longitude: 39.7324 + (index * 0.001)
    }))
  },
  {
    id: '8',
    name: 'Limu Coffee Farmers Union',
    totalFarmSize: 300,
    totalFarmers: 9,
    farmers: Array(9).fill(null).map((_, index) => ({
      farmerId: `F8${(index + 1).toString().padStart(2, '0')}`,
      code: `S-LM-${(index + 1).toString().padStart(4, '0')}`,
      coffeeExporter: 'Limu Export Company',
      coffeeSupplier: 'Limu Coffee Farmers Union',
      farmerName: ['Omega Tadesse', 'Petros Alemu', 'Quincy Bekele', 'Ruth Haile',
                  'Solomon Wolde', 'Tizita Mengistu', 'Urael Desta', 'Wendy Tekle',
                  'Yonas Solomon'][index],
      genderId: index % 2 === 0 ? 1 : 2,
      kebele: 'Limu',
      farmSize: [0.7, 1.1, 0.9, 1.3, 0.8, 1.2, 1.0, 0.6, 1.4][index],
      geometryType: 'PointLocation',
      latitude: 8.1789 + (index * 0.001),
      longitude: 36.9587 + (index * 0.001)
    }))
  },
  {
    id: '9',
    name: 'Kaffa Coffee Association',
    totalFarmSize: 280,
    totalFarmers: 8,
    farmers: Array(8).fill(null).map((_, index) => ({
      farmerId: `F9${(index + 1).toString().padStart(2, '0')}`,
      code: `S-KF-${(index + 1).toString().padStart(4, '0')}`,
      coffeeExporter: 'Kaffa Export Union',
      coffeeSupplier: 'Kaffa Coffee Association',
      farmerName: ['Zelalem Haile', 'Almaz Bekele', 'Bereket Wolde', 'Caleb Mengistu',
                  'Daniel Solomon', 'Eden Tekle', 'Feven Desta', 'Genet Alemu'][index],
      genderId: index % 2 === 0 ? 1 : 2,
      kebele: 'Kaffa',
      farmSize: [1.2, 0.8, 1.0, 0.9, 1.1, 0.7, 1.3, 0.6][index],
      geometryType: 'PointLocation',
      latitude: 7.2675 + (index * 0.001),
      longitude: 36.2537 + (index * 0.001)
    }))
  },
  {
    id: '10',
    name: 'Bench Maji Coffee Producers',
    totalFarmSize: 260,
    totalFarmers: 8,
    farmers: Array(8).fill(null).map((_, index) => ({
      farmerId: `F10${(index + 1).toString().padStart(2, '0')}`,
      code: `S-BM-${(index + 1).toString().padStart(4, '0')}`,
      coffeeExporter: 'Bench Maji Export Company',
      coffeeSupplier: 'Bench Maji Coffee Producers',
      farmerName: ['Helen Tadesse', 'Isaac Bekele', 'Janet Wolde', 'Kidus Haile',
                  'Lily Solomon', 'Marcus Desta', 'Nina Tekle', 'Omar Alemu'][index],
      genderId: index % 2 === 0 ? 1 : 2,
      kebele: 'Bench Maji',
      farmSize: [0.9, 1.1, 0.8, 1.2, 1.0, 0.7, 1.3, 0.6][index],
      geometryType: 'PointLocation',
      latitude: 6.9746 + (index * 0.001),
      longitude: 35.5948 + (index * 0.001)
    }))
  }
]; 