'use client';

import React from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { FiEye, FiUsers, FiClock, FiTrendingDown } from 'react-icons/fi';

interface AnalyticsDashboardProps {
  projectId?: string;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ projectId }) => {
  const { analytics, loading } = useAnalytics(projectId);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading analytics...</div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Page Views',
      value: analytics.pageViews.toLocaleString(),
      icon: <FiEye className="text-blue-500" size={24} />,
      change: '+12%',
    },
    {
      label: 'Unique Visitors',
      value: analytics.uniqueVisitors.toLocaleString(),
      icon: <FiUsers className="text-green-500" size={24} />,
      change: '+8%',
    },
    {
      label: 'Avg. Session Duration',
      value: `${Math.floor(analytics.averageSessionDuration / 60)}m ${analytics.averageSessionDuration % 60}s`,
      icon: <FiClock className="text-purple-500" size={24} />,
      change: '+5%',
    },
    {
      label: 'Bounce Rate',
      value: `${analytics.bounceRate.toFixed(1)}%`,
      icon: <FiTrendingDown className="text-red-500" size={24} />,
      change: '-3%',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-500 text-sm">{stat.label}</div>
              {stat.icon}
            </div>
            <div className="text-3xl font-bold mb-2">{stat.value}</div>
            <div className="text-sm text-green-600">{stat.change} from last week</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
        <div className="space-y-3">
          {analytics.topPages.map((page, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-sm font-medium">{page.path}</div>
                <div className="text-xs text-gray-500">{page.views.toLocaleString()} views</div>
              </div>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{
                    width: `${(page.views / analytics.topPages[0].views) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
