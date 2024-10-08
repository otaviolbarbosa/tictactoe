import type { Metadata } from "next";
import "./globals.css";
import { FC } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { SessionProvider } from "next-auth/react";
import StoreProvider from "./store/StoreProvider";

export const metadata: Metadata = {
  title: "Tic Tac Toe",
  description: "Code Challenge",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <SessionProvider>
          <StoreProvider>{children}</StoreProvider>
        </SessionProvider>
        <ToastContainer />
      </body>
    </html>
  );
};

export default RootLayout;
