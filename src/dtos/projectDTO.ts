export interface IProject {
  project_name: string;
  description: string;
  team_id: string;
}

export interface ProjectUpdateDTO {
  project_name?: string;
  description?: string;
  team_id?: string;
}
