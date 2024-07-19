import "./globals.css";
import { Poppins } from "next/font/google";
import ToasterProvider from "@/providers/ToasterProvider";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import Navbar from "@/components/navbar/Navbar";
import Player from "@/components/Player";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Music Share",
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
        <SupabaseProvider>
          <UserProvider>
            <ToasterProvider />
            <ModalProvider />
            <div className="relative min-h-screen h-full w-full flex flex-col">
              <Navbar />
              {children}
              <Player />
            </div>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
