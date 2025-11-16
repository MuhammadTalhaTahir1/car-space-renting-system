'use client';

import { useState } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { AuthGuard } from '@/components/AuthGuard';

export default function NewSpacePage() {
  const [formData, setFormData] = useState({
    location: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    price: '',
    description: '',
    capacity: '1',
    amenities: [] as string[],
    availability: '24/7',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const amenitiesOptions = [
    'Covered',
    'Security Camera',
    'Lighting',
    'EV Charging',
    'Nearby Restrooms',
    'Wheelchair Accessible',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.location) newErrors.location = 'Location name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.description) newErrors.description = 'Description is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('New Space:', formData);
      // Handle form submission
    }
  };

  const toggleAmenity = (amenity: string) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.includes(amenity)
        ? formData.amenities.filter(a => a !== amenity)
        : [...formData.amenities, amenity],
    });
  };

  return (
    <AuthGuard allowedRoles={['provider']}>
      <div className="min-h-screen py-8 sm:py-12 lg:py-16 px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full">
      <div className="mb-8 sm:mb-12">
        <Link href="/provider/spaces" className="inline-flex items-center text-blue-300 hover:text-blue-400 mb-4 transition-colors">
          ← Back to Spaces
        </Link>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
          Add New Parking Space
        </h1>
        <p className="text-base sm:text-lg text-white/70">
          Create a new listing for your parking space
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-white mb-6">Basic Information</h2>
              <div className="space-y-4">
                <Input
                  label="Location Name"
                  type="text"
                  placeholder="e.g., Downtown Central Parking"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  error={errors.location}
                />

                <Input
                  label="Street Address"
                  type="text"
                  placeholder="123 Main Street"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  error={errors.address}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="City"
                    type="text"
                    placeholder="New York"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    error={errors.city}
                  />

                  <Input
                    label="State"
                    type="text"
                    placeholder="NY"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  />

                  <Input
                    label="Zip Code"
                    type="text"
                    placeholder="10001"
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
                    placeholder="Describe your parking space, nearby landmarks, and any important details..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                  {errors.description && (
                    <p className="text-red-400 text-xs mt-1">{errors.description}</p>
                  )}
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
                  placeholder="5.00"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  error={errors.price}
                />

                <Input
                  label="Capacity (Number of Vehicles)"
                  type="number"
                  placeholder="1"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                />
              </div>

              <div className="mt-4">
                <label className="block text-white/95 text-sm font-semibold mb-2">
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
              <Button type="submit" variant="secondary" size="lg">
                Create Space
              </Button>
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
              <h3 className="text-lg font-bold text-white mb-4">Listing Tips</h3>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Use clear, descriptive location names</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Include nearby landmarks in description</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Set competitive pricing based on area</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Highlight all available amenities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Be accurate with availability hours</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">Approval Process</h3>
              <p className="text-sm text-white/70 mb-4">
                New space listings require admin approval before they become active. This typically takes 24-48 hours.
              </p>
              <div className="bg-yellow-500/20 border-2 border-yellow-400/30 rounded-lg p-4">
                <p className="text-white/90 text-xs leading-relaxed">
                  ⚠️ Your space will be reviewed to ensure it meets our quality standards before being published.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </form>
      </div>
    </AuthGuard>
  );
}

