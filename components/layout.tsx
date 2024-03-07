import Link from "next/link"

import { PreviewAlert } from "components/preview-alert"
import { drupal } from "lib/drupal";
import { Footer } from "./footer";
import { useRouter } from "next/router";
import { Header } from "./header";
import { use, useEffect, useRef, useState } from "react";
import { set } from "date-fns";
import { time } from "console";
import { Navigation } from "./navigation";

export function Layout({ children, menu }) {
  return (
    <>
      <PreviewAlert />
      <div className="">
        <Navigation menu={menu} />
        
        <main>{children}</main>

        <Footer />
      </div>
    </>
  )
}

