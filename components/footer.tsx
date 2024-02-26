import Link from "next/link"
import { drupal } from "lib/drupal";

export function Footer() {
  return (
    <footer>
      <div className="mainFooter">
        <div>
          <Link href="/events"><h4>Events</h4></Link>
          <ul>
            <li>
              <Link href="/events">Pop</Link>
            </li>
            <li>
              <Link href="/events">Comedie</Link>
            </li>
            <li>
              <Link href="/events">Hip Hop</Link>
            </li>
            <li>
              <Link href="/events">Sports</Link>
            </li>
          </ul>
        </div>
        <div>
          <Link href="/articles"><h4>articles</h4></Link>
          <ul>
            <li>
              <Link href="/events">Pop</Link>
            </li>
            <li>
              <Link href="/events">Comedie</Link>
            </li>
            <li>
              <Link href="/events">Hip Hop</Link>
            </li>
            <li>
              <Link href="/events">Sports</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Socials</h4>
          <ul>
            <li>
              <Link href="/events">Instagram</Link>
            </li>
            <li>
              <Link href="/events">Facebook</Link>
            </li>
            <li>
              <Link href="/events">Twitter</Link>
            </li>
            <li>
              <Link href="/events">LinkedIn</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="bottomFooter">
        <div className="bottomFooter_block">
          <div>
            <h1>EventHub <span>©2024 Sebastien Daled-Rosseel</span></h1>
          </div>
          <div className="bottomFooter_links">
            {/* Cookieverklarin, Gebruiksvoorwaarden, Privacyverklaring, Cookie */}
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