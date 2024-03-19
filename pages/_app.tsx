import { AppProps } from "next/app"

import "styles/variables/variables.css"
import 'styles/header.css'
import "styles/globals.css"
import "styles/animations.css"
import "styles/forms/form.css"
import "styles/calendar/calendar.css"
import "styles/navigation/navigation.css"
import "styles/comment/comment.css"

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}