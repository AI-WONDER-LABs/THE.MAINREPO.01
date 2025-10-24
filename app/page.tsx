import Link from "next/link";
import { FiCode, FiLayout, FiZap, FiGlobe, FiBarChart, FiCpu } from "react-icons/fi";

export default function Home() {
  const features = [
    {
      icon: <FiLayout size={32} />,
      title: "Drag & Drop Builder",
      description: "Intuitive visual editor for building websites without code",
    },
    {
      icon: <FiCode size={32} />,
      title: "Code Export",
      description: "Export clean React/HTML code for your projects",
    },
    {
      icon: <FiZap size={32} />,
      title: "Multi-Page Support",
      description: "Create complex websites with multiple pages",
    },
    {
      icon: <FiCpu size={32} />,
      title: "AI Integration",
      description: "AI-powered component generation and content creation",
    },
    {
      icon: <FiGlobe size={32} />,
      title: "Domain Management",
      description: "Connect custom domains with SSL support",
    },
    {
      icon: <FiBarChart size={32} />,
      title: "Analytics",
      description: "Track visitor behavior and page performance",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Build Beautiful Websites
            <br />
            <span className="text-blue-600">Without Code</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A powerful React/Next.js SaaS website and app builder with drag-and-drop UI,
            code export, AI integration, and more.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/builder"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Building
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-blue-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of developers building amazing websites
          </p>
          <Link
            href="/builder"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Launch Builder
          </Link>
        </div>
      </div>
    </div>
  );
}

