import { AnalyticsData } from '@/types';

export class AnalyticsService {
  private sessionId: string;
  private startTime: number;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  }

  async trackPageView(path: string, projectId?: string): Promise<void> {
    const event = {
      type: 'pageview',
      path,
      projectId,
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
    };
    
    // In production, this would send to analytics backend
    console.log('Analytics event:', event);
  }

  async trackEvent(
    eventName: string,
    properties?: Record<string, string | number | boolean>,
    _projectId?: string
  ): Promise<void> {
    const event = {
      type: 'event',
      name: eventName,
      properties,
      projectId: _projectId,
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
    };
    
    console.log('Analytics event:', event);
  }

  async getAnalytics(_projectId: string, _timeRange?: string): Promise<AnalyticsData> {
    // Simulated analytics data - in production, this would fetch from backend
    return {
      pageViews: Math.floor(Math.random() * 10000),
      uniqueVisitors: Math.floor(Math.random() * 5000),
      averageSessionDuration: Math.floor(Math.random() * 300),
      bounceRate: Math.random() * 100,
      topPages: [
        { path: '/', views: Math.floor(Math.random() * 5000) },
        { path: '/about', views: Math.floor(Math.random() * 2000) },
        { path: '/contact', views: Math.floor(Math.random() * 1000) },
        { path: '/services', views: Math.floor(Math.random() * 1500) },
        { path: '/blog', views: Math.floor(Math.random() * 800) },
      ],
    };
  }

  getSessionDuration(): number {
    return Math.floor((Date.now() - this.startTime) / 1000);
  }

  endSession(): void {
    const duration = this.getSessionDuration();
    this.trackEvent('session_end', { duration });
  }
}

export const analyticsService = new AnalyticsService();
