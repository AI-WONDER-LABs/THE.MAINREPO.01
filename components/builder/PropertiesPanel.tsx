'use client';

import React, { useState } from 'react';
import { useBuilder } from '@/contexts/BuilderContext';

export const PropertiesPanel: React.FC = () => {
  const { selectedComponent, updateComponent, deleteComponent } = useBuilder();
  const [editedProps, setEditedProps] = useState<Record<string, any>>({});
  const [editedStyles, setEditedStyles] = useState<Record<string, any>>({});

  if (!selectedComponent) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">Properties</h2>
        <p className="text-gray-400 text-sm">Select a component to edit its properties</p>
      </div>
    );
  }

  const handlePropChange = (key: string, value: any) => {
    const newProps = { ...selectedComponent.props, [key]: value };
    setEditedProps(newProps);
    updateComponent(selectedComponent.id, { props: newProps });
  };

  const handleStyleChange = (key: string, value: any) => {
    const newStyles = { ...selectedComponent.styles, [key]: value };
    setEditedStyles(newStyles);
    updateComponent(selectedComponent.id, { styles: newStyles });
  };

  const handleDelete = () => {
    deleteComponent(selectedComponent.id);
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Properties</h2>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Delete
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Component Type</h3>
        <div className="text-sm bg-gray-100 p-2 rounded">{selectedComponent.type}</div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Properties</h3>
        <div className="space-y-2">
          {Object.entries(selectedComponent.props || {}).map(([key, value]) => (
            <div key={key}>
              <label className="text-xs text-gray-600 block mb-1">{key}</label>
              <input
                type="text"
                value={value}
                onChange={(e) => handlePropChange(key, e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}
          {selectedComponent.type === 'text' && !selectedComponent.props?.children && (
            <div>
              <label className="text-xs text-gray-600 block mb-1">Content</label>
              <input
                type="text"
                value={selectedComponent.props?.children || ''}
                onChange={(e) => handlePropChange('children', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Styles</h3>
        <div className="space-y-2">
          {commonStyleProps.map((prop) => (
            <div key={prop.name}>
              <label className="text-xs text-gray-600 block mb-1">{prop.label}</label>
              <input
                type={prop.type}
                value={selectedComponent.styles?.[prop.name] || ''}
                onChange={(e) => handleStyleChange(prop.name, e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const commonStyleProps = [
  { name: 'padding', label: 'Padding', type: 'text' },
  { name: 'margin', label: 'Margin', type: 'text' },
  { name: 'backgroundColor', label: 'Background Color', type: 'color' },
  { name: 'color', label: 'Text Color', type: 'color' },
  { name: 'fontSize', label: 'Font Size', type: 'text' },
  { name: 'fontWeight', label: 'Font Weight', type: 'text' },
  { name: 'borderRadius', label: 'Border Radius', type: 'text' },
  { name: 'border', label: 'Border', type: 'text' },
  { name: 'width', label: 'Width', type: 'text' },
  { name: 'height', label: 'Height', type: 'text' },
];
