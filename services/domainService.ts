import { DomainConfig, DNSRecord } from '@/types';

export class DomainService {
  private domains: Map<string, DomainConfig> = new Map();

  async addDomain(domain: string): Promise<DomainConfig> {
    const config: DomainConfig = {
      domain,
      isActive: false,
      ssl: false,
      dnsRecords: this.generateDNSRecords(domain),
    };
    
    this.domains.set(domain, config);
    return config;
  }

  private generateDNSRecords(domain: string): DNSRecord[] {
    return [
      {
        type: 'A',
        name: '@',
        value: '76.76.21.21',
      },
      {
        type: 'CNAME',
        name: 'www',
        value: domain,
      },
      {
        type: 'TXT',
        name: '_verification',
        value: `site-verification=${this.generateVerificationToken()}`,
      },
    ];
  }

  private generateVerificationToken(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  async verifyDomain(domain: string): Promise<boolean> {
    // Simulated DNS verification
    const config = this.domains.get(domain);
    if (!config) return false;

    // In production, this would check actual DNS records
    config.isActive = true;
    this.domains.set(domain, config);
    return true;
  }

  async enableSSL(domain: string): Promise<boolean> {
    const config = this.domains.get(domain);
    if (!config || !config.isActive) return false;

    // Simulated SSL certificate generation
    config.ssl = true;
    this.domains.set(domain, config);
    return true;
  }

  async removeDomain(domain: string): Promise<boolean> {
    return this.domains.delete(domain);
  }

  getDomain(domain: string): DomainConfig | undefined {
    return this.domains.get(domain);
  }

  getAllDomains(): DomainConfig[] {
    return Array.from(this.domains.values());
  }

  async updateDNSRecords(domain: string, records: DNSRecord[]): Promise<boolean> {
    const config = this.domains.get(domain);
    if (!config) return false;

    config.dnsRecords = records;
    this.domains.set(domain, config);
    return true;
  }
}

export const domainService = new DomainService();
