import Link from "next/link"

import { PreviewAlert } from "components/preview-alert"
import { drupal } from "lib/drupal";
import { Footer } from "./footer";
import { useRouter } from "next/router";
import { Header } from "./header";
import { use, useEffect, useRef, useState } from "react";
import { set } from "date-fns";
import { time } from "console";

export function Layout({ children, node, menu }) {
  const [cart, setCart] = useState([]);
  const [cartAmount, setCartAmount] = useState(0);
  let bodeSummary = node.body[0].processed.replace(/<p>/g, '').replace(/<\/p>/g, '');

  // get utl path
  const path = useRouter().pathname;
  
  // references to the dom elements
  const mainNavRef = useRef(null);
  const extraNavRef = useRef(null);
  const homeTitleRef = useRef(null);
  const homeDescRef = useRef(null);
  const navRef = useRef(null);
  const amountRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCart(JSON.parse(localStorage.getItem('shoppingCart')));

      window.addEventListener('storage', () => {
        const cart = localStorage.getItem('shoppingCart');
        if (window && extraNavRef.current && mainNavRef.current) {
          extraNavRef.current.style.visibility = 'visible';
          extraNavRef.current.style.transform = 'translateY(0)';
          mainNavRef.current.style.width = '80%';
          mainNavRef.current.style.transform = 'translateY(0)';
          amountRef.current.style.transform = 'scale(1.5) rotate(50deg)';
          // amountRef.current.style.transform = 'scale(1.5)';
        }
        setCart(JSON.parse(cart));
        
        setTimeout(() => {
          if (window && extraNavRef.current && mainNavRef.current) {
            amountRef.current.style.transform = 'rotate(0deg)';
          }
        }, 500);

        setTimeout(() => {
          if (window && extraNavRef.current && mainNavRef.current) {
            extraNavRef.current.style.visibility = 'hidden';
            extraNavRef.current.style.transform = 'translateY(-100%)';
            mainNavRef.current.style.width = '90%';
            mainNavRef.current.style.transform = 'translateY(-50%)';
          }
        }
        , 3000);
      });
    }
  }, []);

  useEffect(() => {
    setCartAmount(cart.length);
  }, [cart]);
  
  
  // animate the home page elements and the navigation
  useEffect(() => {
    if (homeTitleRef.current && homeDescRef.current && navRef.current) {
      homeTitleRef.current.style.transform = 'translateY(0)';
      homeTitleRef.current.style.opacity = '1';
      homeDescRef.current.style.transform = 'translateY(0)';
      homeDescRef.current.style.opacity = '1';
    }
    navRef.current.style.transform = 'translate(-50%, 0)';
    navRef.current.style.opacity = '1';
  
    window.addEventListener('scroll', () => {
      if (window && extraNavRef.current && mainNavRef.current) {
          if (window.scrollY > 100) {
            extraNavRef.current.style.visibility = 'hidden';
            extraNavRef.current.style.transform = 'translateY(-100%)';
            mainNavRef.current.style.width = '90%';
            mainNavRef.current.style.transform = 'translateY(-50%)';
          } else {
            extraNavRef.current.style.visibility = 'visible';
            extraNavRef.current.style.transform = 'translateY(0)';
            mainNavRef.current.style.width = '80%';
            mainNavRef.current.style.transform = 'translateY(0)';
          }
      }
    });
  }, [homeTitleRef, homeDescRef, navRef, extraNavRef, mainNavRef]);

  
  
  // else if (typeof window === "undefined") return <div></div>;
  
  return (
    <>
      <PreviewAlert />
      {/* max-w-screen-md px-6 mx-auto */}
      <div className="">
        <div className="nav" ref={navRef}>
            {/* top nav and main nav */}
            
            <div className="extranav" ref={extraNavRef}>
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
              <Link href="/cart" className={
                  path === '/cart' ? 'activeSmall' : ''
                }>
                &#x1F6D2;
              </Link>
              <span className="subText" ref={amountRef}>{cartAmount}</span>
            </div>

            <div className="mainnav" ref={mainNavRef}>
              <div className="mainnav__home">
                <Link href="/">
                  <h1>EventHub</h1>
                </Link>
              </div>
              <div className="mainnav__links">
                {menu.items.map((item, index) => {
                  return (
                    <Link href={item.url} key={index} className={
                      path === item.url ? 'active' : ''
                    }>
                      {item.title}
                    </Link>
                  )
                })}
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
              <h1 ref={homeTitleRef}>{node.title}</h1>
              <p ref={homeDescRef}>{bodeSummary}</p>
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

