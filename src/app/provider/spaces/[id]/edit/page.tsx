'use client';

import { useState } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function EditSpacePage() {
  const [formData, setFormData] = useState({
    location: 'Downtown Central',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    price: '5',
    description: 'Secure covered parking space in the heart of downtown. 24/7 access with CCTV monitoring.',
    capacity: '1',
    amenities: ['Covered', 'Security Camera', 'Lighting'],
    availability: '24/7',
  });

  const amenitiesOptions = [
    'Covered',
    'Security Camera',
    'Lighting',
    'EV Charging',
    'Nearby Restrooms',
    'Wheelchair Accessible',
  ];

  const toggleAmenity = (amenity: string) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.includes(amenity)
        ? formData.amenities.filter(a => a !== amenity)
        : [...formData.amenities, amenity],
    });
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 lg:py-16 px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full">
      <div className="mb-8 sm:mb-12">
        <Link href="/provider/spaces" className="inline-flex items-center text-blue-300 hover:text-blue-400 mb-4 transition-colors">
          ← Back to Spaces
        </Link>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
          Edit Parking Space
        </h1>
        <p className="text-base sm:text-lg text-white/70">
          Update your parking space listing
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">Basic Information</h2>
            <div className="space-y-4">
              <Input
                label="Location Name"
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />

              <Input
                label="Street Address"
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="City"
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />

                <Input
                  label="State"
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />

                <Input
                  label="Zip Code"
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-white/95 text-sm font-semibold mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 resize-none"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
          </Card>

          {/* Pricing & Capacity */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">Pricing & Capacity</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Price per Hour ($)"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />

              <Input
                label="Capacity (Number of Vehicles)"
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              />
            </div>

            <div className="mt-4">
              <label className="block text-black/95 text-sm font-semibold mb-2 h-100">
                Availability
              </label>
              <select
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              >
                <option value="24/7" className="bg-slate-900">24/7 Available</option>
                <option value="business" className="bg-slate-900">Business Hours Only</option>
                <option value="weekdays" className="bg-slate-900">Weekdays Only</option>
                <option value="weekends" className="bg-slate-900">Weekends Only</option>
                <option value="custom" className="bg-slate-900">Custom Hours</option>
              </select>
            </div>
          </Card>

          {/* Amenities */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {amenitiesOptions.map((amenity) => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    formData.amenities.includes(amenity)
                      ? 'border-blue-500/50 bg-blue-500/20'
                      : 'border-white/20 bg-white/5 hover:bg-white/10'
                  } text-white`}
                >
                  <div className="font-semibold text-sm">{amenity}</div>
                </button>
              ))}
            </div>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button variant="secondary" size="lg">Save Changes</Button>
            <Link href="/provider/spaces">
              <Button type="button" variant="outline" size="lg">
                Cancel
              </Button>
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">Space Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/70">Status</span>
                <span 
                  className="px-3 py-1 rounded text-xs font-medium"
                  style={{
                    background: 'rgba(34, 197, 94, 0.2)',
                    color: '#86efac',
                  }}
                >
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/70">Total Bookings</span>
                <span className="text-sm font-bold text-white">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/70">Total Revenue</span>
                <span className="text-sm font-bold text-green-400">$240</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" fullWidth style={{
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.1) 100%)',
                borderColor: 'rgba(239, 68, 68, 0.3)',
                color: '#fca5a5',
              }}>
                Deactivate Space
              </Button>
              <Button variant="outline" fullWidth style={{
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.1) 100%)',
                borderColor: 'rgba(239, 68, 68, 0.3)',
                color: '#fca5a5',
              }}>
                Delete Space
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

