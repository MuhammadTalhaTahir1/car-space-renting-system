'use client';

import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function ReportsPage() {
  return (
    <div className="min-h-screen py-8 sm:py-12 lg:py-16 px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full">
      <div className="mb-8 sm:mb-12">
        <Link href="/admin/dashboard" className="inline-flex items-center text-blue-300 hover:text-blue-400 mb-4 transition-colors">
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
          Reports & Analytics
        </h1>
        <p className="text-base sm:text-lg text-white/70">
          View detailed analytics and generate reports
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card hover className="p-6">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-xl font-bold text-white mb-2">Revenue Reports</h3>
          <p className="text-sm text-white/70 mb-4">View detailed revenue analytics and financial reports</p>
          <Button variant="outline" size="sm">Generate Report</Button>
        </Card>

        <Card hover className="p-6">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-xl font-bold text-white mb-2">User Reports</h3>
          <p className="text-sm text-white/70 mb-4">Analyze user growth and engagement metrics</p>
          <Button variant="outline" size="sm">Generate Report</Button>
        </Card>

        <Card hover className="p-6">
          <div className="text-4xl mb-4">🚗</div>
          <h3 className="text-xl font-bold text-white mb-2">Space Reports</h3>
          <p className="text-sm text-white/70 mb-4">View space utilization and availability reports</p>
          <Button variant="outline" size="sm">Generate Report</Button>
        </Card>

        <Card hover className="p-6">
          <div className="text-4xl mb-4">📅</div>
          <h3 className="text-xl font-bold text-white mb-2">Booking Reports</h3>
          <p className="text-sm text-white/70 mb-4">Analyze booking patterns and trends</p>
          <Button variant="outline" size="sm">Generate Report</Button>
        </Card>

        <Card hover className="p-6">
          <div className="text-4xl mb-4">⭐</div>
          <h3 className="text-xl font-bold text-white mb-2">Review Reports</h3>
          <p className="text-sm text-white/70 mb-4">View customer satisfaction and reviews</p>
          <Button variant="outline" size="sm">Generate Report</Button>
        </Card>

        <Card hover className="p-6">
          <div className="text-4xl mb-4">📈</div>
          <h3 className="text-xl font-bold text-white mb-2">Performance Reports</h3>
          <p className="text-sm text-white/70 mb-4">System performance and optimization metrics</p>
          <Button variant="outline" size="sm">Generate Report</Button>
        </Card>
      </div>
    </div>
  );
}

