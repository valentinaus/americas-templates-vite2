import React, { createContext, Dispatch, SetStateAction } from "react";
import { IPhoneNumber } from "../interfaces/phoneNumber.interfaces";

export interface IPhoneNumberCTX {
  phoneNumberList: IPhoneNumber[] | null;
  selectedPhoneNumber: IPhoneNumber | null;
  refreshList: boolean;
  isLoading: boolean;
  setPhoneNumberList: (payload: []) => void;
  setSelectedPhoneNumber: (obj: any) => void;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;

  onOpenEditModal: any;
  onOpenDeleteModal: any;
}

export const initialPhoneNumberCTX: IPhoneNumberCTX = {
  phoneNumberList: [],
  selectedPhoneNumber: null,
  refreshList: false,
  isLoading: false,
  setPhoneNumberList: (payload: []) => {},
  setSelectedPhoneNumber: (obj: any) => {},
  setRefresh: () => {},
  setIsLoading: () => {},

  onOpenEditModal: () => {},
  onOpenDeleteModal: () => {},
};
export const PhoneNumbersCTX = createContext(initialPhoneNumberCTX);
