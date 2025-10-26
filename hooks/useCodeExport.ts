'use client';

import { useState, useCallback } from 'react';

interface CodeExportOptions {
  framework?: 'react' | 'vue' | 'html';
  includeStyles?: boolean;
}

interface ComponentData {
  type?: string;
  props?: Record<string, string | number | boolean>;
  styles?: Record<string, string>;
  children?: ComponentData[];
}

export const useCodeExport = () => {
  const [exportedCode, setExportedCode] = useState<string>('');

  const exportAsReact = useCallback((components: ComponentData[], options: CodeExportOptions = {}) => {
    const { includeStyles = true } = options;

    const generateCode = (comp: ComponentData, indent = 2): string => {
      const spaces = ' '.repeat(indent);
      const props = Object.entries(comp.props || {})
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');

      const styles = includeStyles && comp.styles
        ? `style={${JSON.stringify(comp.styles)}}`
        : '';

      const tag = comp.type || 'div';
      const children = comp.children?.map((c: ComponentData) => generateCode(c, indent + 2)).join('\n') || '';

      if (children) {
        return `${spaces}<${tag} ${props} ${styles}>\n${children}\n${spaces}</${tag}>`;
      }
      return `${spaces}<${tag} ${props} ${styles} />`;
    };

    const code = `import React from 'react';\n\nexport default function Component() {\n  return (\n    <div>\n${components.map(c => generateCode(c)).join('\n')}\n    </div>\n  );\n}\n`;
    
    setExportedCode(code);
    return code;
  }, []);

  const exportAsHTML = useCallback((components: ComponentData[]) => {
    const generateHTML = (comp: ComponentData, indent = 2): string => {
      const spaces = ' '.repeat(indent);
      const props = Object.entries(comp.props || {})
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');

      const styleAttr = comp.styles
        ? `style="${Object.entries(comp.styles).map(([k, v]) => `${k}: ${v}`).join('; ')}"`
        : '';

      const tag = comp.type || 'div';
      const children = comp.children?.map((c: ComponentData) => generateHTML(c, indent + 2)).join('\n') || '';

      if (children) {
        return `${spaces}<${tag} ${props} ${styleAttr}>\n${children}\n${spaces}</${tag}>`;
      }
      return `${spaces}<${tag} ${props} ${styleAttr}></${tag}>`;
    };

    const code = `<!DOCTYPE html>\n<html>\n<head>\n  <title>Generated Page</title>\n</head>\n<body>\n${components.map(c => generateHTML(c)).join('\n')}\n</body>\n</html>`;
    
    setExportedCode(code);
    return code;
  }, []);

  const downloadCode = useCallback((filename: string, code: string) => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }, []);

  return {
    exportedCode,
    exportAsReact,
    exportAsHTML,
    downloadCode,
  };
};
