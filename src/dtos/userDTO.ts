export interface UserDTO {
  id: string;
  name: string;
  email: string;
  password: string;
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
