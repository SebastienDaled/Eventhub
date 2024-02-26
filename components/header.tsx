import Link from "next/link"
import { drupal } from "lib/drupal";

export function Header({ node }) {
  let bodeSummary = node.body?.processed.replace(/<p>/g, '').replace(/<\/p>/g, '');

  return (
    <header>
        <div className="headerInfo">
          <h1>{node.title}</h1>
          <p>{bodeSummary}</p>
        </div>
    </header>
  )
}