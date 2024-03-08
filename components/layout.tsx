import { PreviewAlert } from "components/preview-alert"
import { Footer } from "./footer";
import { Navigation } from "./navigation";

export function Layout({ children }) {
  return (
    <>
      <PreviewAlert />
      <div className="">
        <Navigation />
        
        <main>{children}</main>

        <Footer />
      </div>
    </>
  )
}

