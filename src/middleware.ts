import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";


export default withAuth(
  function middleware(req: NextRequestWithAuth){
    if(req.nextUrl.pathname.startsWith("/auth") && req.nextauth.token?.roles.some(rol => rol !== "ADMIN")){
      return NextResponse.rewrite(new URL("/denegado", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    }
  }
)


export const config = {
  matcher: [
    "/dashboard/:path*",
    "/categorias/:path*",
    "/subcategorias/:path*",
    "/marcas/:path*",
    "/modelos/:path*",
    "/equipos-de-trabajo/:path*",
    "/equipos/:path*",
    "/hardware/:path*",
    "/software/:path*",
    "/facultades/:path*",
    "/mantenimientos/:path*",
    "/ubicaciones/:path*",
    "/auth/:path*"
  ],
};