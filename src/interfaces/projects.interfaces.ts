export interface IProject {
  id: string;
  name: string;
  description: string;
  technician: string;
  phoneClientId: string;
  siteId: string;
  templateId: string;
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
  templateId: string;
  templateName: string;
  createdOn: string;
}
