'use client';

import { useState, useEffect } from 'react';
import { AnalyticsData } from '@/types';

export const useAnalytics = (projectId?: string) => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    pageViews: 0,
    uniqueVisitors: 0,
    averageSessionDuration: 0,
    bounceRate: 0,
    topPages: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (projectId) {
      fetchAnalytics(projectId);
    }
  }, [projectId]);

  const fetchAnalytics = async (id: string) => {
    setLoading(true);
    try {
      // Simulated analytics data - in production, this would call an API
      const mockData: AnalyticsData = {
        pageViews: Math.floor(Math.random() * 10000),
        uniqueVisitors: Math.floor(Math.random() * 5000),
        averageSessionDuration: Math.floor(Math.random() * 300),
        bounceRate: Math.random() * 100,
        topPages: [
          { path: '/', views: Math.floor(Math.random() * 5000) },
          { path: '/about', views: Math.floor(Math.random() * 2000) },
          { path: '/contact', views: Math.floor(Math.random() * 1000) },
        ],
      };
      setAnalytics(mockData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const trackEvent = async (eventName: string, properties?: Record<string, any>) => {
    // Simulated event tracking
    console.log('Track event:', eventName, properties);
  };

  const trackPageView = async (path: string) => {
    // Simulated page view tracking
    console.log('Track page view:', path);
  };

  return {
    analytics,
    loading,
    fetchAnalytics,
    trackEvent,
    trackPageView,
  };
};
