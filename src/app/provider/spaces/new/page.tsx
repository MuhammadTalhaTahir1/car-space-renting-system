'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { AuthGuard } from '@/components/AuthGuard';
import { useProviderProfile, useCreateProviderSpace } from '@/features/provider/hooks';
import { ProviderPendingNotice } from '@/components/ProviderPendingNotice';
import { useLogout } from '@/features/auth/hooks';
import SpaceImageUploader from '@/components/provider/SpaceImageUploader';

const amenityOptions = [
  'Covered',
  'Security Camera',
  'Lighting',
  'EV Charging',
  'Nearby Restrooms',
  'Wheelchair Accessible',
];

const availabilityOptions = [
  { value: '24/7', label: '24/7 Available' },
  { value: 'business', label: 'Business Hours Only' },
  { value: 'weekdays', label: 'Weekdays Only' },
  { value: 'weekends', label: 'Weekends Only' },
  { value: 'custom', label: 'Custom Hours' },
] as const;

type AvailabilityOption = (typeof availabilityOptions)[number]['value'];

type NewSpaceFormState = {
  location: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: string;
  description: string;
  capacity: string;
  amenities: string[];
  availability: AvailabilityOption;
  images: string[];
};

function mapAvailability(value: AvailabilityOption) {
  switch (value) {
    case '24/7':
      return '24_7' as const;
    case 'business':
      return 'business_hours' as const;
    default:
      return 'custom' as const;
  }
}

export default function NewSpacePage() {
  const [formData, setFormData] = useState<NewSpaceFormState>({
    location: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    price: '',
    description: '',
    capacity: '1',
    amenities: [],
    availability: '24/7',
    images: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const router = useRouter();
  const { data, isLoading, isError } = useProviderProfile();
  const logoutMutation = useLogout();
  const createSpaceMutation = useCreateProviderSpace();

  const status = data?.profile.status;

  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const selectedAmenitySet = useMemo(() => new Set(formData.amenities), [formData.amenities]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.location.trim()) newErrors.location = 'Location name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.price.trim()) {
      newErrors.price = 'Hourly price is required';
    } else if (Number.isNaN(Number(formData.price))) {
      newErrors.price = 'Hourly price must be a number';
    }
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.images.length < 2) newErrors.images = 'Please upload at least two photos of your space';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setGeneralError(null);
    createSpaceMutation.mutate(
      {
        title: formData.location.trim(),
        address: formData.address.trim() || undefined,
        city: formData.city.trim() || undefined,
        state: formData.state.trim() || undefined,
        zipCode: formData.zipCode.trim() || undefined,
        description: formData.description.trim(),
        hourlyRate: Number(formData.price),
        capacity: formData.capacity ? Number(formData.capacity) : undefined,
        amenities: formData.amenities,
        availabilityType: mapAvailability(formData.availability),
        // Future: capture custom hours (for now rely on availabilityType)
        customAvailability: undefined,
        images: formData.images,
        isActive: false,
      },
      {
        onSuccess: () => {
          router.push('/provider/spaces');
        },
        onError: (error) => {
          setGeneralError(error instanceof Error ? error.message : 'Failed to create space');
        },
      },
    );
  };

  return (
    <AuthGuard allowedRoles={['provider']}>
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center text-white/80">
          Loading provider profile...
        </div>
      ) : isError || !status ? (
        <div className="min-h-screen flex items-center justify-center text-white/80">
          Unable to load provider profile. Please try again later.
        </div>
      ) : status !== 'approved' ? (
        <ProviderPendingNotice
          onLogout={() =>
            logoutMutation.mutate(undefined, { onSuccess: () => router.push('/') })
          }
          isLoggingOut={logoutMutation.isPending}
        />
      ) : (
        <div className="min-h-screen py-8 sm:py-12 lg:py-16 px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full">
          <div className="mb-8 sm:mb-12">
            <Link
              href="/provider/spaces"
              className="inline-flex items-center text-blue-300 hover:text-blue-400 mb-4 transition-colors"
            >
              ← Back to Spaces
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
              Add New Parking Space
            </h1>
            <p className="text-base sm:text-lg text-white/70">
              Create a new listing for your parking space
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {generalError && (
              <Card className="p-4 border-red-500/40 bg-red-500/10 text-red-100 text-sm">
                {generalError}
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
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
                        placeholder="Sydney"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        error={errors.city}
                      />

                      <Input
                        label="State"
                        type="text"
                        placeholder="NSW"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      />

                      <Input
                        label="Postcode"
                        type="text"
                        placeholder="2000"
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

                <Card className="p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Pricing & Capacity</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Price per Hour"
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
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value as AvailabilityOption })}
                    >
                      {availabilityOptions.map((option) => (
                        <option key={option.value} value={option.value} className="bg-slate-900">
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {amenityOptions.map((amenity) => {
                      const isSelected = selectedAmenitySet.has(amenity);
                      return (
                        <button
                          key={amenity}
                          type="button"
                          onClick={() => toggleAmenity(amenity)}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            isSelected
                              ? 'border-blue-500/50 bg-blue-500/20'
                              : 'border-white/20 bg-white/5 hover:bg-white/10'
                          } text-white`}
                        >
                          <div className="font-semibold text-sm">{amenity}</div>
                        </button>
                      );
                    })}
                  </div>
                </Card>

                <Card className="p-6">
                  <SpaceImageUploader
                    images={formData.images}
                    onChange={(urls) => setFormData((prev) => ({ ...prev, images: urls }))}
                  />
                  {errors.images && (
                    <p className="text-xs text-red-300 mt-2">{errors.images}</p>
                  )}
                </Card>

                <div className="flex gap-4">
                  <Button type="submit" variant="secondary" size="lg" disabled={createSpaceMutation.isPending}>
                    {createSpaceMutation.isPending ? 'Creating...' : 'Create Space'}
                  </Button>
                  <Link href="/provider/spaces">
                    <Button type="button" variant="outline" size="lg" disabled={createSpaceMutation.isPending}>
                      Cancel
                    </Button>
                  </Link>
                </div>
              </div>

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
      )}
    </AuthGuard>
  );
}

