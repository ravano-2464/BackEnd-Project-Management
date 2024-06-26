import { IRoles } from "./roleDTO";
import { TeamDTO } from "./teamDTO";

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  roles: IRoles[];
  teams: TeamDTO[];
}

export interface UserCreateDTO {
  name: string;
  email: string;
  password: string;
  role_ids: string[];
}

export interface UserUpdateDTO {
  name?: string;
  email?: string;
  password?: string;
  role_ids?: string[];
  team_ids?: string[];
}
