import { ToastContainer, Slide } from 'react-toastify'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import '@/styles/globals.scss'
import { Poppins } from 'next/font/google'
import "react-toastify/dist/ReactToastify.css";
import Theme from '@/components/Theme'
import NextAuthSessionProvider from '@/Providers/NextAuthSessionProvider'
import NextThemeProvider from '@/Providers/NextThemeProvider'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ["400", "500", "600", "700", "800", "900"],
})

export const metadata = {
  title: 'Attendence Manager',
  description: 'Attendence Manager Of Motihari College Of Engineering, Motihari',
}

export default function RootLayout({ children }) {
  return (

    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className} >
        <NextAuthSessionProvider>
          <NextThemeProvider defaultTheme='system' storageKey='theme' disableTransitionOnChange={true} >
            <Header />
            <Theme />
            {children}
            <Footer />
            <ToastContainer position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              transition={Slide}
              // progressStyle={''}
              className={"toast_container"}
              theme="colored" />
          </NextThemeProvider>
        </NextAuthSessionProvider>
      </body>
    </html>

  )
}
