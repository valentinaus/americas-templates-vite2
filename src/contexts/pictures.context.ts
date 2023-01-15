import React, { createContext, Dispatch, SetStateAction } from "react";
import { IPicture } from "../interfaces/pictures.interfaces";

export interface IPictureCTX {
  picturesList: IPicture[] | null;
  selectedPicture: IPicture | null;
  refreshList: boolean;
  isLoading: boolean;
  setPicturesList: (payload: []) => void;
  setSelectedPicture: (obj: IPicture | null) => void;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;

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

  onOpenEditModal: () => {},
  onOpenDeleteModal: () => {},
};

export const PIcturesCTX = createContext(initialPicturesCTX);
