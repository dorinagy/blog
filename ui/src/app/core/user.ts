export interface User {
  id?: number;
  userName: string;
  role: UserRole;
}

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
}
