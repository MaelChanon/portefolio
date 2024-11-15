import { Project } from '@types';
import { createContext, ReactNode, useContext } from 'react';

export interface IProjectContext {
  project: Project;
}

export const ProjectContext = createContext<IProjectContext>({} as IProjectContext);

interface IProjectProvider {
  children: ReactNode;
  project: Project;
}

export const ProjectProvider = ({ children, project }: IProjectProvider) => {
  const value: IProjectContext = {
    project,
  };
  return <ProjectContext.Provider value={{ ...value }}>{children}</ProjectContext.Provider>;
};

export const useProject = (): IProjectContext => useContext(ProjectContext);
