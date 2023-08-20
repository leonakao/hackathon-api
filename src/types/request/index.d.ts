import { AuthenticatedUser } from 'src/modules/auth/services/signIn.service';

export {};

declare global {
  namespace Express {
    export interface Request {
      user: AuthenticatedUser;
    }
  }
}
