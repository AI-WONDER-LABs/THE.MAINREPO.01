'use client';

import React, { useState, useCallback } from 'react';
import { Component as ComponentType } from '@/types';
import { useBuilder } from '@/contexts/BuilderContext';

interface CanvasProps {
  components: ComponentType[];
}

let componentCounter = 0;

const getDefaultProps = (type: string): Record<string, string> => {
  switch (type) {
    case 'text':
      return { children: 'Text content' };
    case 'button':
      return { children: 'Button', type: 'button' };
    case 'image':
      return { src: '/placeholder.jpg', alt: 'Image' };
    case 'input':
      return { type: 'text', placeholder: 'Enter text...' };
    default:
      return {};
  }
};

const getDefaultStyles = (type: string): Record<string, string> => {
  switch (type) {
    case 'container':
      return { padding: '20px', minHeight: '100px' };
    case 'text':
      return { fontSize: '16px', margin: '10px 0' };
    case 'button':
      return { padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px' };
    case 'image':
      return { width: '100%', maxWidth: '400px' };
    default:
      return {};
  }
};

export const Canvas: React.FC<CanvasProps> = ({ components }) => {
  const { addComponent, selectedComponent, setSelectedComponent } = useBuilder();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const componentType = e.dataTransfer.getData('componentType');
    if (componentType) {
      componentCounter += 1;
      const newComponent: ComponentType = {
        id: `component-${componentCounter}`,
        type: componentType as ComponentType['type'],
        props: getDefaultProps(componentType),
        styles: getDefaultStyles(componentType),
      };
      addComponent(newComponent);
    }
  }, [addComponent]);

  const renderComponent = (component: ComponentType): React.ReactNode => {
    const isSelected = selectedComponent?.id === component.id;
    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedComponent(component);
    };

    const commonProps = {
      key: component.id,
      onClick: handleClick,
      style: {
        ...component.styles,
        outline: isSelected ? '2px solid #3b82f6' : 'none',
        cursor: 'pointer',
      },
    };

    switch (component.type) {
      case 'text':
        return <p {...commonProps}>{component.props.children || 'Text'}</p>;
      case 'button':
        return <button {...commonProps}>{component.props.children || 'Button'}</button>;
      case 'image':
        return <img {...commonProps} src={String(component.props.src)} alt={String(component.props.alt)} />;
      case 'input':
        return <input {...commonProps} type={String(component.props.type)} placeholder={String(component.props.placeholder)} />;
      case 'container':
      case 'card':
      case 'flex':
      case 'grid':
        return (
          <div {...commonProps}>
            {component.children?.map(child => renderComponent(child))}
          </div>
        );
      case 'navbar':
        return (
          <nav {...commonProps}>
            {component.children?.map(child => renderComponent(child)) || 'Navbar'}
          </nav>
        );
      case 'footer':
        return (
          <footer {...commonProps}>
            {component.children?.map(child => renderComponent(child)) || 'Footer'}
          </footer>
        );
      default:
        return <div {...commonProps}>Unknown component</div>;
    }
  };

  return (
    <div
      className={`flex-1 bg-gray-50 p-8 overflow-auto ${isDragOver ? 'bg-blue-50' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => setSelectedComponent(null)}
    >
      <div className="bg-white min-h-screen shadow-lg">
        {components.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-gray-400">
            Drag components here to start building
          </div>
        ) : (
          components.map(component => renderComponent(component))
        )}
      </div>
    </div>
  );
};
