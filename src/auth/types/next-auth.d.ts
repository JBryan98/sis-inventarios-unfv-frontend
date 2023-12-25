import { Authority } from "../interfaces/Authority";
import "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        email: string;
        token: string;
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