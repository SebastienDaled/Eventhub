import Link from "next/link"
import { useEffect, useState } from "react";

export function Footer() {
  const [topFooter, setTopFooter] = useState([]);
  
  useEffect(() => {
    fetch('/api/menus/footer', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setTopFooter(data.topFooter.tree);
      })
  }, []);

  if (topFooter.length === 0) return null;
  
  return (
    <footer>
      <div className="mainFooter">
        {topFooter.map((item, index) => {
          return (
            <div key={index}>
              <h4><Link href={item.url}>{item.title}</Link></h4>
              <ul>
                {item.items && item.items.map((child, index) => {
                  return (
                    <li key={index}>
                      <Link href={child.url}>{child.title}</Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        }
        )}
      </div>
      <div className="bottomFooter">
        <div className="bottomFooter_block">
          <div>
            <h1>EventHub <span className="extraInfoText">©2024 Sebastien Daled-Rosseel</span></h1>
          </div>
          <div className="bottomFooter_links">
            <Link href="/cookieverklaring">Cookieverklaring</Link>
            <Link href="/gebruiksvoorwaarden">Gebruiksvoorwaarden</Link>
            <Link href="/privacyverklaring">Privacyverklaring</Link>
            <Link href="/cookie">Cookie</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}