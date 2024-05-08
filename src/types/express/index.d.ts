export type User = {
  userId: number;
  email: string;
  isVerified: boolean;
};

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
