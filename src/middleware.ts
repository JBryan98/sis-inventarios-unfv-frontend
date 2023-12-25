export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    "/categorias/:path*",
    "/subcategorias/:path*",
    "/marcas/:path*",
    "/modelos/:path*",
    "/equipos-trabajo/:path*",
    "/equipos/:path*",
    "/hardware/:path*",
    "/software/:path*",
    "/facultades/:path*",
    "/mantenimientos/:path*",
    "/ubicaciones/:path*",
  ],
};