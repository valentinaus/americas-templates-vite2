import React, { createContext, Dispatch, SetStateAction } from "react";
import { IUsers } from "../interfaces/users.interfaces";

export interface IUsersCTX {
  usersList: IUsers[] | null;
  selectedUser: IUsers | null;
  refreshList: boolean;
  isLoading: boolean;
  setUsersList: (payload: []) => void;
  setSelectedUser: (obj: any) => void;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;

  onOpenEditModal: any;
  onOpenDeleteModal: any;
}

export const initialUserCTX: IUsersCTX = {
  usersList: [],
  selectedUser: null,
  refreshList: false,
  isLoading: false,
  setUsersList: (payload: []) => {},
  setSelectedUser: (obj: any) => {},
  setRefresh: () => {},
  setIsLoading: () => {},

  onOpenEditModal: () => {},
  onOpenDeleteModal: () => {},
};

export const UsersCTX = createContext(initialUserCTX);
