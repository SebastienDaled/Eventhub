import Link from "next/link"
import { useRouter } from "next/router";

export function Breadcrumb() {
  const router = useRouter();
  let path = router.asPath;
  path = path.replace(/^\//g, '').replace(/-/g, ' ');

  const breadcrumbArray = path.split('/');

  return (
    <div style={{color: "white"}} className="mb-6">
      {breadcrumbArray.map((crumb, index) => {
        const url = breadcrumbArray.slice(0, index + 1).join('/');
        return (
          <span key={index}>
            <Link href={`/${url.replace(/\s/g, "-")}`} className={index + 1 !== breadcrumbArray.length ? "underline" : null}>
              {crumb}
            </Link>
            {index < breadcrumbArray.length - 1 && <span> &gt; </span>}
          </span>
        )
      })}
    </div>
  )
}