import { IPicture } from "./pictures.interfaces";

export interface ITemplate {
  id: string;
  name: string;
  description: string;
  allowEmpty?: boolean;
}

export interface ITemplateInfo {
  id: string;
  name: string;
  description: string;
  photosAssigned: number;
  photos: IPicture[] | null;
}
