'use client';

import { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function ProviderRegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal/Company Info
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    // Step 2: Business Details
    address: '',
    city: '',
    state: '',
    zipCode: '',
    businessType: 'individual', // individual or company
    // Step 3: Payment Details
    bankAccount: '',
    taxId: '',
    // Step 4: Password
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = () => {
    // Validate current step
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.companyName) newErrors.companyName = 'Company/Name is required';
      if (!formData.contactName) newErrors.contactName = 'Contact name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.phone) newErrors.phone = 'Phone is required';
    } else if (step === 2) {
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zipCode) newErrors.zipCode = 'Zip code is required';
    } else if (step === 3) {
      if (!formData.bankAccount) newErrors.bankAccount = 'Bank account is required';
      if (!formData.taxId) newErrors.taxId = 'Tax ID is required';
    } else if (step === 4) {
      if (!formData.password) newErrors.password = 'Password is required';
      if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0 && step < 4) {
      setStep(step + 1);
    } else if (step === 4 && Object.keys(newErrors).length === 0) {
      // Submit form
      console.log('Provider Registration:', formData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-28 sm:py-36 px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full">
      <div className="w-full max-w-5xl space-y-16 animate-fade-in-up">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-8">
            Provider Registration
          </h1>
          <p className="text-2xl sm:text-3xl text-white/80">Create your provider profile to list parking spaces</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-20">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center font-bold text-xl shadow-xl transition-all duration-300 ${
                  s === step
                    ? 'bg-blue-500 text-white scale-110'
                    : s < step
                    ? 'bg-green-500 text-white'
                    : 'bg-white/20 text-white/60'
                }`}
              >
                {s < step ? '✓' : s}
              </div>
              {s < 4 && (
                <div
                  className={`w-16 sm:w-24 h-2 mx-3 sm:mx-4 rounded-full transition-all duration-300 ${
                    s < step ? 'bg-green-500' : 'bg-white/20'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <Card className="p-14 sm:p-16 lg:p-20">
          {/* Step 1: Company/Personal Info */}
          {step === 1 && (
            <div className="space-y-12">
              <h2 className="text-4xl font-bold text-white mb-12">Company Information</h2>
              
              <div>
                <label className="block text-white/95 text-base font-semibold mb-10 tracking-wide">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-10">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, businessType: 'individual' })}
                    className={`p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      formData.businessType === 'individual'
                        ? 'border-white/50 bg-white/15 shadow-xl scale-105'
                        : 'border-white/20 bg-white/5 hover:bg-white/10'
                    } text-white`}
                  >
                    <div className="text-5xl mb-4">👤</div>
                    <div className="font-bold text-xl">Individual</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, businessType: 'company' })}
                    className={`p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      formData.businessType === 'company'
                        ? 'border-white/50 bg-white/15 shadow-xl scale-105'
                        : 'border-white/20 bg-white/5 hover:bg-white/10'
                    } text-white`}
                  >
                    <div className="text-5xl mb-4">🏢</div>
                    <div className="font-bold text-xl">Company</div>
                  </button>
                </div>
              </div>

              <Input
                label={formData.businessType === 'company' ? 'Company Name' : 'Full Name'}
                type="text"
                placeholder={formData.businessType === 'company' ? 'ABC Parking Inc.' : 'John Doe'}
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                error={errors.companyName}
              />

              <Input
                label="Contact Name"
                type="text"
                placeholder="John Doe"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                error={errors.contactName}
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="contact@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
              />

              <Input
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                error={errors.phone}
              />
            </div>
          )}

          {/* Step 2: Business Location */}
          {step === 2 && (
            <div className="space-y-10">
              <h2 className="text-4xl font-bold text-white mb-10">Business Location</h2>

              <Input
                label="Street Address"
                type="text"
                placeholder="123 Main Street"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                error={errors.address}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  error={errors.state}
                />

                <Input
                  label="Zip Code"
                  type="text"
                  placeholder="10001"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  error={errors.zipCode}
                />
              </div>
            </div>
          )}

          {/* Step 3: Payment Details */}
          {step === 3 && (
            <div className="space-y-10">
              <h2 className="text-4xl font-bold text-white mb-10">Payment Details</h2>

              <Input
                label="Bank Account Number"
                type="text"
                placeholder="**** **** **** 1234"
                value={formData.bankAccount}
                onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                error={errors.bankAccount}
              />

              <Input
                label="Tax ID / EIN"
                type="text"
                placeholder="12-3456789"
                value={formData.taxId}
                onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                error={errors.taxId}
              />

              <div className="bg-blue-500/20 border-2 border-blue-400/30 rounded-2xl p-8 backdrop-blur-sm">
                <p className="text-white/90 text-lg leading-relaxed flex items-start gap-4">
                  <span className="text-3xl">💡</span>
                  <span>Your payment details are securely encrypted. Funds will be transferred to your account after each successful booking.</span>
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Password */}
          {step === 4 && (
            <div className="space-y-10">
              <h2 className="text-4xl font-bold text-white mb-10">Create Password</h2>

              <Input
                label="Password"
                type="password"
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={errors.password}
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                error={errors.confirmPassword}
              />

              <div className="bg-yellow-500/20 border-2 border-yellow-400/30 rounded-2xl p-8 backdrop-blur-sm">
                <p className="text-white/90 text-lg leading-relaxed flex items-start gap-4">
                  <span className="text-3xl">⚠️</span>
                  <span>Your account will be pending admin approval. You'll receive an email once your account is verified.</span>
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-6 mt-12 pt-10 border-t-2 border-white/20">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="min-w-[160px]"
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={handleNext}
              className="min-w-[180px]"
            >
              {step === 4 ? 'Submit' : 'Next →'}
            </Button>
          </div>

          <div className="mt-10 text-center">
            <p className="text-white/80 text-base">
              Already have a provider account?{' '}
              <Link href="/login" className="text-white font-bold hover:underline text-lg">
                Sign in here
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

