'use client';

import React from 'react';
import { ComponentType } from '@/types';
import { FiLayout, FiType, FiSquare, FiImage, FiEdit, FiGrid, FiMenu } from 'react-icons/fi';

interface ComponentPaletteProps {
  onSelectComponent: (type: ComponentType) => void;
}

const componentTypes: Array<{ type: ComponentType; icon: React.ReactNode; label: string }> = [
  { type: 'container', icon: <FiLayout />, label: 'Container' },
  { type: 'text', icon: <FiType />, label: 'Text' },
  { type: 'button', icon: <FiSquare />, label: 'Button' },
  { type: 'image', icon: <FiImage />, label: 'Image' },
  { type: 'input', icon: <FiEdit />, label: 'Input' },
  { type: 'form', icon: <FiEdit />, label: 'Form' },
  { type: 'navbar', icon: <FiMenu />, label: 'Navbar' },
  { type: 'footer', icon: <FiLayout />, label: 'Footer' },
  { type: 'card', icon: <FiSquare />, label: 'Card' },
  { type: 'grid', icon: <FiGrid />, label: 'Grid' },
  { type: 'flex', icon: <FiLayout />, label: 'Flex' },
];

export const ComponentPalette: React.FC<ComponentPaletteProps> = ({ onSelectComponent }) => {
  const handleDragStart = (e: React.DragEvent, type: ComponentType) => {
    e.dataTransfer.setData('componentType', type);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="bg-white border-r border-gray-200 p-4 w-64 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Components</h2>
      <div className="grid grid-cols-2 gap-2">
        {componentTypes.map(({ type, icon, label }) => (
          <div
            key={type}
            draggable
            onDragStart={(e) => handleDragStart(e, type)}
            onClick={() => onSelectComponent(type)}
            className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-500 transition-colors"
          >
            <div className="text-2xl mb-2">{icon}</div>
            <span className="text-xs text-center">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
