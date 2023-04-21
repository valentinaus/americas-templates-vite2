import { ITemplate } from "./template.interfaces";

export interface IProject {
  id: string;
  name: string;
  description: string;
  technician: string;
  phoneClientId: string;
  phoneClientName: string;
  siteId: string;
  siteName: string;
  templateIds: string[];
  templates: ITemplate[];
  templateName: string;
  createdOn: string;
  isFinished: boolean;
}

export interface IProjectById {
  id: string;
  name: string;
  description: string;
  technician: string;
  phoneClientId: string;
  phoneClientName: string;
  siteId: string;
  siteName: string;
  templates: ITemplate[];
  templateName: string;
  createdOn: string;
  isFinished: boolean;
}

export interface IRecentProject {
  id: string;
  name: string;
  description: string;
  technician: string;
  phoneClientId: string;
  phoneClientName: string;
  siteId: string;
  siteName: string;
  templateIds: string[];
  templateName: string;
  createdOn: string;
  isFinished: boolean;
}
