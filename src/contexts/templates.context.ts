import React, { createContext, Dispatch, SetStateAction } from "react";
import { ITemplate, ITemplateInfo } from "../interfaces/template.interfaces";

export interface ITemplateCTX {
  templatesList: ITemplate[] | null;
  selectedTemplate: ITemplate | null;
  refreshList: boolean;
  isLoading: boolean;
  loadingInfo: boolean;
  templateInfo: ITemplateInfo | null;
  setTemplatesList: (payload: []) => void;
  setSelectedTemplate: (obj: any) => void;
  setTemplateInfo: (obj: any) => void;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setLoadingInfo: Dispatch<SetStateAction<boolean>>;

  onOpenEditModal: any;
  onOpenDeleteModal: any;
  onOpenAddPicsModal: any;
  onOpenTemplatDetails: any;
}

export const initialTemplateCTX: ITemplateCTX = {
  templatesList: [],
  selectedTemplate: null,
  refreshList: false,
  isLoading: false,
  templateInfo: null,
  loadingInfo: false,
  setTemplatesList: (payload: []) => {},
  setSelectedTemplate: (obj: any) => {},
  setTemplateInfo: (obj: any) => {},
  setRefresh: () => {},
  setIsLoading: () => {},
  setLoadingInfo: () => {},
  onOpenEditModal: () => {},
  onOpenDeleteModal: () => {},
  onOpenAddPicsModal: () => {},
  onOpenTemplatDetails: () => {},
};

export const TemplatesCTX = createContext(initialTemplateCTX);
