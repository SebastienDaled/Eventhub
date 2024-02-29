import Link from "next/link"
import { drupal } from "lib/drupal";

export function Header({ node }) {
  console.log(node);
  
  let bodeSummary = node.body?.processed.replace(/<p>/g, '').replace(/<\/p>/g, '');

  return (
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
  )
}