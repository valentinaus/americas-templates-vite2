import React, { createContext, Dispatch, SetStateAction } from "react";
import { IPicture } from "../interfaces/pictures.interfaces";
import { paginationI } from "../pages/pictures.pages";

export interface IPictureCTX {
  picturesList: IPicture[] | null;
  selectedPicture: IPicture | null;
  refreshList: boolean;
  isLoading: boolean;
  setPicturesList: (payload: []) => void;
  setSelectedPicture: (obj: IPicture | null) => void;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;

  paginationInfo: paginationI | null;
  setPaginationInfo: Dispatch<SetStateAction<paginationI | null>>;

  onOpenEditModal: any;
  onOpenDeleteModal: any;
}

export const initialPicturesCTX: IPictureCTX = {
  picturesList: [],
  selectedPicture: null,
  refreshList: false,
  isLoading: false,
  setPicturesList: (payload: []) => {},
  setSelectedPicture: (obj: any) => {},
  setRefresh: () => {},
  setIsLoading: () => {},

  paginationInfo: null,
  setPaginationInfo: () => {},

  onOpenEditModal: () => {},
  onOpenDeleteModal: () => {},
};

export const PIcturesCTX = createContext(initialPicturesCTX);
