'use client'

import { useState, useEffect } from 'react'
import { Settings as SettingsIcon } from 'lucide-react'

interface SettingsProps {
  onUnitChange?: (unit: string) => void
}

export function Settings({ onUnitChange }: SettingsProps) {
  const [selectedUnit, setSelectedUnit] = useState('inch')

  // Load saved unit from localStorage on mount
  useEffect(() => {
    const savedUnit = localStorage.getItem('dimensionUnit')
    if (savedUnit) {
      setSelectedUnit(savedUnit)
    }
  }, [])

  const handleUnitChange = (unit: string) => {
    setSelectedUnit(unit)
    // Save to localStorage
    localStorage.setItem('dimensionUnit', unit)
    // Notify parent component
    onUnitChange?.(unit)
  }

  const units = [
    { value: 'inch', label: 'Imperial (ft/in)', description: 'Feet and inches' },
    { value: 'm', label: 'Metric - Meters (m)', description: 'Meters' },
    { value: 'cm', label: 'Metric - Centimeters (cm)', description: 'Centimeters' },
    { value: 'mm', label: 'Metric - Millimeters (mm)', description: 'Millimeters' },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <div className="flex items-center gap-3 text-gray-800 mb-6">
        <SettingsIcon className="h-7 w-7" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Dimension Unit</h2>
          <p className="text-sm text-gray-600 mb-4">
            Select the unit system for displaying dimensions in the floorplan, wall labels, and item measurements.
          </p>
        </div>

        <div className="space-y-3">
          {units.map((unit) => (
            <label
              key={unit.value}
              className="flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-all"
              style={{
                borderColor: selectedUnit === unit.value ? '#3b82f6' : '#e5e7eb',
                backgroundColor: selectedUnit === unit.value ? '#eff6ff' : 'white',
              }}
            >
              <input
                type="radio"
                name="dimensionUnit"
                value={unit.value}
                checked={selectedUnit === unit.value}
                onChange={(e) => handleUnitChange(e.target.value)}
                className="mt-1.5 w-4 h-4"
              />
              <div className="flex-1">
                <div className="font-semibold text-base text-gray-900">{unit.label}</div>
                <div className="text-sm text-gray-600 mt-1">{unit.description}</div>
              </div>
              {selectedUnit === unit.value && (
                <div className="text-blue-600 font-medium text-sm mt-1.5">✓ Active</div>
              )}
            </label>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <p className="text-sm text-blue-900">
            <strong>Current selection:</strong> {units.find(u => u.value === selectedUnit)?.label}
          </p>
          <p className="text-sm text-blue-700 mt-2">
            This setting applies globally to:
          </p>
          <ul className="text-sm text-blue-700 mt-1 ml-4 list-disc">
            <li>2D floorplan wall measurements</li>
            <li>3D item dimensions (width, height, depth)</li>
            <li>All dimension displays throughout the application</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
