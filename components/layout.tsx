import Link from "next/link"

import { PreviewAlert } from "components/preview-alert"
import { drupal } from "lib/drupal";
import { Footer } from "./footer";
import { useRouter } from "next/router";
import { Header } from "./header";

export function Layout({ children, node }) {
  let bodeSummary = node.body[0].processed.replace(/<p>/g, '').replace(/<\/p>/g, '');
  
  // get utl path
  const path = useRouter().pathname;

  return (
    <>
      <PreviewAlert />
      {/* max-w-screen-md px-6 mx-auto */}
      <div className="">
        <div className="nav">
            {/* top nav and main nav */}
            
            <div className="extranav">
              <Link href="/about-us" className={
                  path === '/about-us' ? 'activeSmall' : ''
                }>
                About Us
              </Link>
              <Link href="/contact" className={
                  path === '/contact' ? 'activeSmall' : ''
                }>
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
                <Link href="/events" className={
                  path === '/events' ? 'active' : ''
                }>
                  Events
                </Link>
                <Link href="/articles" className={
                  path === '/articles' ? 'active' : ''
                }>
                  Articles
                </Link>
                <Link href="/search" className={
                  path === '/search' ? 'active' : ''
                }>
                  Search
                </Link>
                <Link href="/calender" className={
                  path === '/calender' ? 'active' : ''
                }>
                  Calender
                </Link>
              </div>
            </div>
          </div>
        
        {/* if page is on / */}
        {useRouter().pathname === '/' && (
          <header>
            <div className="assets">
              <div className="circleSmall circleSmall--left"></div>
              <div className="circleBig"></div>
              <div className="circleSmall circleSmall--right"></div>
            </div>
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

