'use client';

import React, { useState } from 'react';
import { useBuilder } from '@/contexts/BuilderContext';
import { FiCode, FiDownload, FiX } from 'react-icons/fi';

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({ isOpen, onClose }) => {
  const { exportCode } = useBuilder();
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      const generatedCode = exportCode();
      setCode(generatedCode);
    }
  }, [isOpen, exportCode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'component.tsx';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FiCode /> Export Code
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto">
            <code className="text-sm font-mono">{code}</code>
          </pre>
        </div>

        <div className="flex justify-end gap-2 p-4 border-t">
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <FiDownload /> Download
          </button>
        </div>
      </div>
    </div>
  );
};
