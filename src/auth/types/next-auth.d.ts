import { Authority } from "../interfaces/Authority.interface";
import "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    roles: Authority[];
  }
}

declare module "next-auth" {
    interface Session {
        user: {
            nombreCompleto: string;
            email: string;
            token: string;
            roles: Authority[]
        }
    }
}