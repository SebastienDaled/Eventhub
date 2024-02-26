import Link from "next/link"

import { PreviewAlert } from "components/preview-alert"
import { drupal } from "lib/drupal";
import { Footer } from "./footer";
import { useRouter } from "next/router";

export function Layout({ children, node }) {
  let bodeSummary = node.body?.processed.replace(/<p>/g, '').replace(/<\/p>/g, '');
  
  return (
    <>
      <PreviewAlert />
      {/* max-w-screen-md px-6 mx-auto */}
      <div className="">
        <div className="nav">
            {/* top nav and main nav */}
            
            <div className="extranav">
              <Link href="/about-us">
                About Us
              </Link>
              <Link href="/contact">
                Contact
              </Link>
            </div>

            <div className="mainnav">
              <div className="mainnav__home">
                <Link href="/">
                  <h1>EventHub</h1>
                </Link>
              </div>
              <div className="mainnav__links">
                <Link href="/events">
                  Events
                </Link>
                <Link href="/articles">
                  Articles
                </Link>
                <Link href="/search">
                  Search
                </Link>
              </div>
            </div>
          </div>
        
        {/* if page is on / */}
        {useRouter().pathname === '/' && (
          <header>
            <div className="headerInfo">
              <h1>{node.title}</h1>
              <p>{bodeSummary}</p>
            </div>
          </header>
        )}
        {/* <main className="container py-10 mx-auto">{children}</main> */}
        <main>{children}</main>

        <Footer />
      </div>
    </>
  )
}

