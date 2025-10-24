import { APIEndpoint } from '@/types';

export class APIGeneratorService {
  private endpoints: APIEndpoint[] = [];

  generateEndpoint(config: Omit<APIEndpoint, 'id'>): APIEndpoint {
    const endpoint: APIEndpoint = {
      id: Date.now().toString(),
      ...config,
    };
    this.endpoints.push(endpoint);
    return endpoint;
  }

  generateRESTAPI(resourceName: string): APIEndpoint[] {
    const basePath = `/${resourceName.toLowerCase()}`;
    
    return [
      this.generateEndpoint({
        method: 'GET',
        path: basePath,
        handler: `export async function GET() {\n  // Fetch all ${resourceName}\n  return Response.json([]);\n}`,
        authentication: false,
      }),
      this.generateEndpoint({
        method: 'POST',
        path: basePath,
        handler: `export async function POST(request: Request) {\n  const data = await request.json();\n  // Create ${resourceName}\n  return Response.json(data);\n}`,
        authentication: true,
      }),
      this.generateEndpoint({
        method: 'GET',
        path: `${basePath}/[id]`,
        handler: `export async function GET(request: Request, { params }: { params: { id: string } }) {\n  // Fetch ${resourceName} by ID\n  return Response.json({ id: params.id });\n}`,
        authentication: false,
      }),
      this.generateEndpoint({
        method: 'PUT',
        path: `${basePath}/[id]`,
        handler: `export async function PUT(request: Request, { params }: { params: { id: string } }) {\n  const data = await request.json();\n  // Update ${resourceName}\n  return Response.json({ ...data, id: params.id });\n}`,
        authentication: true,
      }),
      this.generateEndpoint({
        method: 'DELETE',
        path: `${basePath}/[id]`,
        handler: `export async function DELETE(request: Request, { params }: { params: { id: string } }) {\n  // Delete ${resourceName}\n  return Response.json({ success: true });\n}`,
        authentication: true,
      }),
    ];
  }

  generateGraphQLAPI(schema: string): string {
    return `import { createSchema, createYoga } from 'graphql-yoga';\n\nconst schema = createSchema({\n  typeDefs: \`\n${schema}\n  \`,\n  resolvers: {\n    Query: {\n      // Add your queries here\n    },\n    Mutation: {\n      // Add your mutations here\n    },\n  },\n});\n\nexport const yoga = createYoga({ schema });\n`;
  }

  generateNextAPIRoute(endpoint: APIEndpoint): string {
    return `// app/api${endpoint.path}/route.ts\n${endpoint.handler}`;
  }

  exportAllEndpoints(): string {
    return this.endpoints
      .map(endpoint => this.generateNextAPIRoute(endpoint))
      .join('\n\n');
  }

  getEndpoints(): APIEndpoint[] {
    return [...this.endpoints];
  }

  clearEndpoints(): void {
    this.endpoints = [];
  }
}

export const apiGenerator = new APIGeneratorService();
