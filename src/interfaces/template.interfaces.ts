import { IPicture } from "./pictures.interfaces";

export interface ITemplate {
  id: string;
  name: string;
  description: string;
}

export interface ITemplateInfo {
  id: string;
  name: string;
  description: string;
  photos: IPicture[] | null;
}
