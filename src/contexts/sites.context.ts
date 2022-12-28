import React, { createContext, Dispatch, SetStateAction } from "react";
import { ISite } from "../interfaces/sites.interfaces";

export interface ISiteCTX {
  sitesList: ISite[] | null;
  selectedSite: ISite | null;
  refreshList: boolean;
  isLoading: boolean;
  setSitesList: (payload: []) => void;
  setSelectedSite: (obj: any) => void;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;

  onOpenEditModal: any;
  onOpenDeleteModal: any;
}

export const initialSiteCTX: ISiteCTX = {
  sitesList: [],
  selectedSite: null,
  refreshList: false,
  isLoading: false,
  setSitesList: (payload: []) => {},
  setSelectedSite: (obj: any) => {},
  setRefresh: () => {},
  setIsLoading: () => {},

  onOpenEditModal: () => {},
  onOpenDeleteModal: () => {},
};

export const SitesCTX = createContext(initialSiteCTX);
