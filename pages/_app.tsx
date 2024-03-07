import { AppProps } from "next/app"

import "styles/variables/variables.css"
import 'styles/header.css'
import "styles/globals.css"
import "styles/animations.css"
import "styles/forms/form.css"


export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
