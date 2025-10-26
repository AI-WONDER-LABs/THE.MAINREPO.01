'use client';

import React from 'react';
import { Header } from '@/components/ui/Header';
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
        <AnalyticsDashboard />
      </div>
    </div>
  );
}
