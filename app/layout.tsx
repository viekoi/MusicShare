import './globals.css'
import { Poppins } from 'next/font/google'

import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import Navbar from '@/components/navbar/Navbar'

const poppins = Poppins({ subsets: ['latin'],weight:'400'})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider/>
            <Navbar/>
            {children}
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
