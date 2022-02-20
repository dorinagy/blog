import { User, UserRole } from '../entities/user';

export class UserDto {
  id?: number;
  email?: string;
  userName?: string;
  role?: UserRole;

  constructor(user?: User) {
    if (user) {
      this.id = user.id;
      this.email = user.email;
      this.userName = user.userName;
      this.role = user.role;
    }
  }
}
