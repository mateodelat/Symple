import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import UserContextProvider from "@contexts/User/provider";
import EnterpriseContextProvider from "@contexts/Enterprise/provider";
import "@styles/global.scss";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <UserContextProvider>
          <EnterpriseContextProvider>
            <Toaster />
            {children}
          </EnterpriseContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
