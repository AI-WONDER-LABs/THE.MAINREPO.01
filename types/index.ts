// Core types for the frontend builder application

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  subscription?: 'free' | 'pro' | 'enterprise';
}

export interface Page {
  id: string;
  name: string;
  path: string;
  components: Component[];
  metadata?: PageMetadata;
}

export interface PageMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
}

export interface Component {
  id: string;
  type: ComponentType;
  props: Record<string, string | number | boolean>;
  children?: Component[];
  styles?: Record<string, string>;
}

export type ComponentType = 
  | 'container'
  | 'text'
  | 'button'
  | 'image'
  | 'input'
  | 'form'
  | 'navbar'
  | 'footer'
  | 'card'
  | 'grid'
  | 'flex';

export interface Project {
  id: string;
  name: string;
  description?: string;
  pages: Page[];
  createdAt: string;
  updatedAt: string;
  domain?: string;
}

export interface DomainConfig {
  domain: string;
  isActive: boolean;
  ssl: boolean;
  dnsRecords?: DNSRecord[];
}

export interface DNSRecord {
  type: 'A' | 'CNAME' | 'TXT';
  name: string;
  value: string;
}

export interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  averageSessionDuration: number;
  bounceRate: number;
  topPages: Array<{ path: string; views: number }>;
}

export interface AIModelConfig {
  provider: 'openai' | 'anthropic' | 'custom';
  model: string;
  apiKey?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface APIEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  handler: string;
  authentication?: boolean;
}
