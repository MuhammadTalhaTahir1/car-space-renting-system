'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { AuthGuard } from '@/components/AuthGuard';
import {
  useProviderProfile,
  useProviderSpace,
  useUpdateProviderSpace,
  useToggleProviderSpaceActivation,
} from '@/features/provider/hooks';
import { ProviderPendingNotice } from '@/components/ProviderPendingNotice';
import { useLogout } from '@/features/auth/hooks';

const amenityOptions = [
  'Covered',
  'Security Camera',
  'Lighting',
  'EV Charging',
  'Nearby Restrooms',
  'Wheelchair Accessible',
];

type AvailabilityOption = '24/7' | 'business' | 'custom';

function toFormAvailability(value: string): AvailabilityOption {
  switch (value) {
    case '24_7':
      return '24/7';
    case 'business_hours':
      return 'business';
    default:
      return 'custom';
  }
}

function toApiAvailability(value: AvailabilityOption) {
  switch (value) {
    case '24/7':
      return '24_7' as const;
    case 'business':
      return 'business_hours' as const;
    default:
      return 'custom' as const;
  }
}

type EditFormState = {
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
};

export default function EditSpacePage() {
  const params = useParams<{ id: string }>();
  const spaceId = params?.id;

  const [formData, setFormData] = useState<EditFormState>({
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
  });
  const [generalError, setGeneralError] = useState<string | null>(null);

  const router = useRouter();
  const { data, isLoading, isError } = useProviderProfile();
  const logoutMutation = useLogout();
  const updateSpaceMutation = useUpdateProviderSpace();
  const spaceQuery = useProviderSpace(spaceId);
  const toggleActivation = useToggleProviderSpaceActivation();

  const status = data?.profile.status;
  const space = spaceQuery.data;

  useEffect(() => {
    if (space) {
      setFormData({
        location: space.title ?? '',
        address: space.address ?? '',
        city: space.city ?? '',
        state: space.state ?? '',
        zipCode: space.zipCode ?? '',
        price: space.hourlyRate?.toString() ?? '',
        description: space.description ?? '',
        capacity: space.capacity?.toString() ?? '1',
        amenities: space.amenities ?? [],
        availability: toFormAvailability(space.availabilityType),
      });
    }
  }, [space]);

  const selectedAmenities = useMemo(() => new Set(formData.amenities), [formData.amenities]);

  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!spaceId) return;

    setGeneralError(null);

    updateSpaceMutation.mutate(
      {
        id: spaceId,
        title: formData.location.trim(),
        address: formData.address.trim() || undefined,
        city: formData.city.trim() || undefined,
        state: formData.state.trim() || undefined,
        zipCode: formData.zipCode.trim() || undefined,
        description: formData.description.trim(),
        hourlyRate: Number(formData.price),
        capacity: formData.capacity ? Number(formData.capacity) : undefined,
        amenities: formData.amenities,
        availabilityType: toApiAvailability(formData.availability),
        images: space?.images ?? [],
        isActive: space?.isActive ?? false,
      },
      {
        onSuccess: () => {
          router.push('/provider/spaces');
        },
        onError: (error) => {
          setGeneralError(error instanceof Error ? error.message : 'Failed to update space');
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
      ) : spaceQuery.isLoading ? (
        <div className="min-h-screen flex items-center justify-center text-white/80">
          Loading space details...
        </div>
      ) : spaceQuery.isError || !space ? (
        <div className="min-h-screen flex items-center justify-center text-white/80">
          Unable to load this space. It may have been removed.
        </div>
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
              Edit Parking Space
            </h1>
            <p className="text-base sm:text-lg text-white/70">
              Update your parking space listing
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
                        label="Postcode"
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

                <Card className="p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Pricing & Capacity</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Price per Hour"
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
                    <label className="block text-white/95 text-sm font-semibold mb-2">
                      Availability
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                      value={formData.availability}
                      onChange={(e) =>
                        setFormData({ ...formData, availability: e.target.value as AvailabilityOption })
                      }
                    >
                      <option value="24/7" className="bg-slate-900">
                        24/7 Available
                      </option>
                      <option value="business" className="bg-slate-900">
                        Business Hours Only
                      </option>
                      <option value="custom" className="bg-slate-900">
                        Custom Hours
                      </option>
                    </select>
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {amenityOptions.map((amenity) => {
                      const isSelected = selectedAmenities.has(amenity);
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

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    variant="secondary"
                    size="lg"
                    disabled={updateSpaceMutation.isPending}
                  >
                    {updateSpaceMutation.isPending ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Link href="/provider/spaces">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      disabled={updateSpaceMutation.isPending}
                    >
                      Cancel
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Space Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Status</span>
                      <span
                        className="px-3 py-1 rounded text-xs font-medium"
                        style={{
                          background:
                            space.status === 'approved'
                              ? 'rgba(34, 197, 94, 0.2)'
                              : space.status === 'pending'
                              ? 'rgba(251, 191, 36, 0.2)'
                              : 'rgba(239, 68, 68, 0.2)',
                          color:
                            space.status === 'approved'
                              ? '#86efac'
                              : space.status === 'pending'
                              ? '#fde047'
                              : '#fca5a5',
                        }}
                      >
                        {space.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Activation</span>
                      <span className="text-sm font-bold text-white flex items-center gap-2">
                        {space.isActive ? 'Active' : 'Inactive'}
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={toggleActivation.isPending}
                          onClick={() =>
                            toggleActivation.mutate({
                              spaceId: space.id,
                              isActive: !space.isActive,
                            })
                          }
                        >
                          {toggleActivation.isPending ? 'Updating...' : space.isActive ? 'Deactivate' : 'Activate'}
                        </Button>
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Created</span>
                      <span className="text-sm font-bold text-white">
                        {new Date(space.createdAt).toLocaleDateString('en-AU', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Actions</h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() =>
                        toggleActivation.mutate({
                          spaceId: space.id,
                          isActive: !space.isActive,
                        })
                      }
                      disabled={toggleActivation.isPending}
                      style={{
                        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.1) 100%)',
                        borderColor: 'rgba(239, 68, 68, 0.3)',
                        color: '#fca5a5',
                        opacity: toggleActivation.isPending ? 0.6 : 1,
                      }}
                    >
                      {toggleActivation.isPending
                        ? 'Updating...'
                        : space.isActive
                        ? 'Deactivate Space'
                        : 'Activate Space'}
                    </Button>
                    <Button
                      variant='outline'
                      fullWidth
                      disabled
                      style={{
                        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.1) 100%)',
                        borderColor: 'rgba(239, 68, 68, 0.3)',
                        color: '#fca5a5',
                        opacity: 0.6,
                      }}
                    >
                      Delete Space (coming soon)
                    </Button>
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

