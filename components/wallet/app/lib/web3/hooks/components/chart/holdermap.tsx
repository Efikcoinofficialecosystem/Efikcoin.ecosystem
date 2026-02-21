// components/charts/HolderMap.tsx
'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useHolderCount } from '@/lib/web3/hooks/useEFIK'

// Mock data - in production, integrate with a geolocation service
const countryCoordinates: Record<string, [number, number]> = {
  'US': [37.0902, -95.7129],
  'GB': [51.509865, -0.118092],
  'NG': [9.081999, 8.675277], // Nigeria
  'JP': [36.204824, 138.252924],
  'AU': [-25.274398, 133.775136],
  'BR': [-14.235004, -51.92528],
  'IN': [20.593684, 78.96288],
  'CN': [35.86166, 104.195397],
  'DE': [51.165691, 10.451526],
  'FR': [46.603354, 1.888334],
}

export function HolderMap() {
  const { holders } = useHolderCount()
  const [holderLocations, setHolderLocations] = useState<any[]>([])

  useEffect(() => {
    // In production, you would map wallet addresses to countries
    // This could be done by asking users to set their country in profile
    // or using IP geolocation on first connection
    
    // For demo, distribute holders randomly across countries
    const countries = Object.keys(countryCoordinates)
    const locations = holders.map((address, index) => ({
      address,
      country: countries[index % countries.length],
      coordinates: countryCoordinates[countries[index % countries.length]],
    }))
    
    setHolderLocations(locations)
  }, [holders])

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: '100%', width: '100%', background: '#1a1a1a' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      
      {holderLocations.map((location, idx) => (
        <CircleMarker
          key={idx}
          center={location.coordinates}
          radius={8}
          fillColor="#f59e0b"
          color="#ffffff"
          weight={1}
          opacity={0.8}
          fillOpacity={0.6}
        >
          <Popup>
            <div className="text-black">
              <strong>Holder:</strong> {location.address.slice(0, 6)}...{location.address.slice(-4)}
              <br />
              <strong>Country:</strong> {location.country}
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}
