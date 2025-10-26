'use client';

import { useState } from 'react';

interface DragDropHandlers {
  onDragStart: (e: React.DragEvent, data: unknown) => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, callback: (data: unknown) => void) => void;
  isDragging: boolean;
}

export const useDragDrop = (): DragDropHandlers => {
  const [isDragging, setIsDragging] = useState(false);

  const onDragStart = (e: React.DragEvent, data: unknown) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', JSON.stringify(data));
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (e: React.DragEvent, callback: (data: unknown) => void) => {
    e.preventDefault();
    e.stopPropagation();
    
    const dataStr = e.dataTransfer.getData('text/plain');
    if (dataStr) {
      try {
        const data = JSON.parse(dataStr);
        callback(data);
      } catch (error) {
        console.error('Error parsing drag data:', error);
      }
    }
    
    setIsDragging(false);
  };

  return {
    onDragStart,
    onDragEnd,
    onDragOver,
    onDrop,
    isDragging,
  };
};
