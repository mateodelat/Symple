import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./AuthProvider";
import {
  DepartmentContextProvider,
  EnterpriseContextProvider,
  UserContextProvider,
  RoleContextProvider,
} from "@contexts/index";
import "@styles/global.scss";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Symple",
  description:
    "Symple es una aplicacion web para las empresas que quieren calificar a sus empleados por medio de mentorias.",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <UserContextProvider>
            <EnterpriseContextProvider>
              <DepartmentContextProvider>
                <RoleContextProvider>
                  <Toaster />
                  {children}
                </RoleContextProvider>
              </DepartmentContextProvider>
            </EnterpriseContextProvider>
          </UserContextProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
