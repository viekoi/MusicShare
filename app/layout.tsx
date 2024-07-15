import "./globals.css";
import { Poppins } from "next/font/google";
import ToasterProvider from "@/providers/ToasterProvider";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import Navbar from "@/components/navbar/Navbar";
import Player from "@/components/Player";
import QueryProvider from "@/providers/QueryProvider";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Vkoi Music",
  description: "music and chill!!!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <QueryProvider>
          <SupabaseProvider>
            <UserProvider>
              <ToasterProvider />
              <ModalProvider />
              <Navbar />
              {children}
              <Player />
            </UserProvider>
          </SupabaseProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
