'use client';

import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useState } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'ParkSpace',
    maintenanceMode: false,
    emailNotifications: true,
    smsNotifications: false,
    autoApproveSpaces: false,
    maxBookingDays: 30,
  });

  return (
    <div className="min-h-screen py-8 sm:py-12 lg:py-16 px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full">
      <div className="mb-8 sm:mb-12">
        <Link href="/admin/dashboard" className="inline-flex items-center text-blue-300 hover:text-blue-400 mb-4 transition-colors">
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
          System Settings
        </h1>
        <p className="text-base sm:text-lg text-white/70">
          Manage system configuration and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* General Settings */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">General Settings</h2>
            <div className="space-y-4">
              <Input
                label="Site Name"
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              />
              <Input
                label="Max Booking Days"
                type="number"
                value={settings.maxBookingDays.toString()}
                onChange={(e) => setSettings({ ...settings, maxBookingDays: parseInt(e.target.value) || 30 })}
              />
            </div>
          </Card>

          {/* Notification Settings */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">Notification Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-semibold text-white">Email Notifications</label>
                  <p className="text-xs text-white/60">Send email notifications to users</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                  className="w-5 h-5 rounded-lg bg-white/10 border-2 border-white/20 cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-semibold text-white">SMS Notifications</label>
                  <p className="text-xs text-white/60">Send SMS notifications to users</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.smsNotifications}
                  onChange={(e) => setSettings({ ...settings, smsNotifications: e.target.checked })}
                  className="w-5 h-5 rounded bg-white/10 border-2 border-white/20 cursor-pointer"
                />
              </div>
            </div>
          </Card>

          {/* System Settings */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">System Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-semibold text-white">Maintenance Mode</label>
                  <p className="text-xs text-white/60">Put the system in maintenance mode</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                  className="w-5 h-5 rounded bg-white/10 border-2 border-white/20 cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-semibold text-white">Auto Approve Spaces</label>
                  <p className="text-xs text-white/60">Automatically approve new space listings</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoApproveSpaces}
                  onChange={(e) => setSettings({ ...settings, autoApproveSpaces: e.target.checked })}
                  className="w-5 h-5 rounded bg-white/10 border-2 border-white/20 cursor-pointer"
                />
              </div>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button variant="secondary" size="lg">Save Changes</Button>
            <Button variant="outline" size="lg">Reset to Default</Button>
          </div>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" fullWidth>Backup Database</Button>
              <Button variant="outline" fullWidth>Clear Cache</Button>
              <Button variant="outline" fullWidth>Export Settings</Button>
              <Button variant="outline" fullWidth>Import Settings</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">System Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-white/70">Version</span>
                <span className="text-white">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Last Backup</span>
                <span className="text-white">2 hours ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Database Size</span>
                <span className="text-white">245 MB</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

