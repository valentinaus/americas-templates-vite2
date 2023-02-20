import React, { createContext, Dispatch, SetStateAction } from "react";
import { IProject } from "../interfaces/projects.interfaces";

export interface IProjectCTX {
  projectsList: IProject[] | null;
  selectedProject: IProject | null;
  refreshList: boolean;
  isLoading: boolean;
  setProjectsList: (payload: []) => void;
  setSelectedProject: (obj: any) => void;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;

  onOpenEditModal: any;
  onOpenDeleteModal: any;
  onOpenChangeStatusModal: any;
}

export const initialProjectCTX: IProjectCTX = {
  projectsList: [],
  selectedProject: null,
  refreshList: false,
  isLoading: false,
  setProjectsList: (payload: []) => {},
  setSelectedProject: (obj: any) => {},
  setRefresh: () => {},
  setIsLoading: () => {},

  onOpenEditModal: () => {},
  onOpenDeleteModal: () => {},
  onOpenChangeStatusModal: () => {},
};

export const ProjectsCTX = createContext(initialProjectCTX);
