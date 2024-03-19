import { AppProps } from "next/app"

import "styles/variables/variables.css"
import 'styles/header.css'
import "styles/globals.css"
import "styles/animations.css"
import "styles/forms/form.css"
import "styles/calendar/calendar.css"
import "styles/navigation/navigation.css"
import { SessionProvider } from "next-auth/react"
import { use, useEffect } from "react"

const restrictedRoutes = [
  '/account',
  '/favourites',
]

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (!localStorage.getItem('uid') && restrictedRoutes.includes(window.location.pathname)) {
      window.location.assign('/auth');
    }
  }
  , []);


  return <Component {...pageProps} />
}

// export default function App({
//   Component,
//   pageProps: { session, ...pageProps },
// }: AppProps) {
//   return (
//     <SessionProvider session={session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//   )
// }