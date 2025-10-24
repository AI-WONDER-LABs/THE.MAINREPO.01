'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Project } from '@/types';

interface AppContextType {
  projects: Project[];
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  createProject: (name: string, description?: string) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  deleteProject: (projectId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const createProject = (name: string, description?: string) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name,
      description,
      pages: [{
        id: 'home',
        name: 'Home',
        path: '/',
        components: [],
      }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProjects([...projects, newProject]);
    setCurrentProject(newProject);
  };

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    setProjects(projects.map(p => 
      p.id === projectId 
        ? { ...p, ...updates, updatedAt: new Date().toISOString() }
        : p
    ));
    if (currentProject?.id === projectId) {
      setCurrentProject({ ...currentProject, ...updates, updatedAt: new Date().toISOString() });
    }
  };

  const deleteProject = (projectId: string) => {
    setProjects(projects.filter(p => p.id !== projectId));
    if (currentProject?.id === projectId) {
      setCurrentProject(null);
    }
  };

  return (
    <AppContext.Provider value={{
      projects,
      currentProject,
      setCurrentProject,
      createProject,
      updateProject,
      deleteProject,
    }}>
      {children}
    </AppContext.Provider>
  );
};
