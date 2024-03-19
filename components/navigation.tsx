import Link from "next/link"
import { useRouter } from "next/router";
import { use, useEffect, useRef, useState } from "react";

export function Navigation() {
  const [cart, setCart] = useState([]);
  const [cartAmount, setCartAmount] = useState(0);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const mainNavRef = useRef(null);
  const extraNavRef = useRef(null);
  const navRef = useRef(null);
  const amountRef = useRef(null);

  const path = useRouter().pathname;

  const [mainMenuData, setMainMenuData] = useState([]);
  const [extraMenuData, setExtraMenuData] = useState([]);
  const [userMenuData, setUserMenuData] = useState([]);

  useEffect(() => {
    localStorage.getItem('uid') ? setUserLoggedIn(true) : setUserLoggedIn(false);
  }
  , []);

  useEffect(() => {
    fetch('/api/menu', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        },
    })
      .then(response => response.json())
      .then(data => {
        setMainMenuData(data.main.tree);
        setExtraMenuData(data.extra.tree);
        setUserMenuData(data.userMenu.tree);
      })
  }, []);
    
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCart(JSON.parse(localStorage.getItem('shoppingCart')));

      window.addEventListener('storage', () => {
        const cart = localStorage.getItem('shoppingCart');
        if (window && extraNavRef.current && mainNavRef.current && window.innerWidth > 768) {
          extraNavRef.current.style.visibility = 'visible';
          extraNavRef.current.style.transform = 'translateY(0)';
          mainNavRef.current.style.width = '80%';
          mainNavRef.current.style.transform = 'translateY(0)';
          amountRef.current.style.transform = 'scale(1.5) rotate(50deg)';
        }
        setCart(JSON.parse(cart));
        
        setTimeout(() => {
          if (window && extraNavRef.current && mainNavRef.current && window.innerWidth > 768) {
            amountRef.current.style.transform = 'rotate(0deg)';
          }
        }, 500);

        setTimeout(() => {
          if (window && extraNavRef.current && mainNavRef.current && window.innerWidth > 768) {
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

  useEffect(() => {
    if (navRef.current) {
      navRef.current.style.transform = 'translate(-50%, 0)';
      navRef.current.style.opacity = '1';
    }
  
    window.addEventListener('scroll', () => {
      if (window && extraNavRef.current && mainNavRef.current && window.innerWidth > 768) {
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

    mainNavRef.current.addEventListener('pointerover', () => {
      if (window && extraNavRef.current && mainNavRef.current && window.innerWidth > 768) {
        extraNavRef.current.style.visibility = 'visible';
        extraNavRef.current.style.transform = 'translateY(0)';
        mainNavRef.current.style.width = '80%';
        mainNavRef.current.style.transform = 'translateY(0)';
      }
    }
    );
  }, [navRef, extraNavRef, mainNavRef]);


  if (!mainMenuData && !extraMenuData && !userMenuData) return (
    <div className="nav" ref={navRef} style={{visibility: "hidden"}}>
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
          {mainMenuData.map((item, index) => {
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
  );

  
  return (
    <div className="nav" ref={navRef}>
      <div className="extranav" ref={extraNavRef}>
        {extraMenuData.map((item, index) => {
          return (
            <Link href={item.url} key={index} className={
              path === item.url ? 'activeSmall' : ''
            }>
              {item.title}
            </Link>
          )
        })}
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
          {mainMenuData.map((item, index) => {
            return (
              <Link href={item.url} key={index} className={
                path === item.url ? 'active' : ''
              }>
                {item.title}
              </Link>
            )
          })}
          <div className="usernav_links">
            {userMenuData.map((item, index) => {
              return (
                userLoggedIn ? (
                 item.description !== null ? (
                  <Link href={item.url
                  } key={index} className={
                    path === item.url ? 'active' : ''
                  }>
                    {item.title}
                  </Link>
                 ) : (
                  null
                 )
                ) : (
                  item.description === null ? (
                    <Link href={item.url
                    } key={index} className={
                      path === item.url ? 'active' : ''
                    }>
                      {item.title}
                    </Link>
                  ) : (
                    null
                  )
                )
              )
            }
            )}
          </div>
        </div>
        <div className="hamburgerMenu">
          <div className="hamburgerMenu__button">
            <div className="hamburgerMenu__line"></div>
            <div className="hamburgerMenu__line"></div>
            <div className="hamburgerMenu__line"></div>
          </div>
          <div className="hamburgermenu__links">
            {mainMenuData.map((item, index) => {
                return (
                  <Link href={item.url} key={index} className={
                    path === item.url ? 'hamburgerLink active' : 'hamburgerLink'
                  }>
                    {item.title}
                  </Link>
                )
              })}
              {userMenuData.map((item, index) => {
                return (
                  <Link href={item.url} key={index} className={ 
                    path === item.url ? 'hamburgerLink active' : 'hamburgerLink'
                  }>
                    {item.title}
                  </Link>
                )
              }
              )}
          </div>
        </div>
      </div>
    </div>
  )
}