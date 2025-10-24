'use client';

import { useState, useEffect } from 'react';

interface DragDropHandlers {
  onDragStart: (e: React.DragEvent, data: any) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, callback: (data: any) => void) => void;
  isDragging: boolean;
}

export const useDragDrop = (): DragDropHandlers => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragData, setDragData] = useState<any>(null);

  const onDragStart = (e: React.DragEvent, data: any) => {
    setIsDragging(true);
    setDragData(data);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', JSON.stringify(data));
  };

  const onDragEnd = (e: React.DragEvent) => {
    setIsDragging(false);
    setDragData(null);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (e: React.DragEvent, callback: (data: any) => void) => {
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
