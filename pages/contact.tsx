import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import { useState } from "react"
import Yaml from 'js-yaml';
import { Webform } from "components/webform"

interface IndexPageProps {
  header: any;
  menu: any;
  webform: any;
  resource: any;
}

export default function ContactPage({ header, menu, webform, resource }: IndexPageProps) {
  return (
    <Layout menu={menu} >
      <Head>
        <title>Events | EventHub</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>

      <div className="corePage">
        <h1>Contact</h1>

        <div className="form__container">
          <Webform element={webform} id={resource.title} />

          <div className="asideArea">
            <p>We value your feedback and are here to assist you. Feel free to reach out to us through the following channels:</p>

            <h2>General Info:</h2>
            <p>Email: info@yourwebsite.com</p>
            <h2>Event Submissions:</h2>
            <p>Email: events@yourwebsite.com</p>
            <h2>Want To Sponsor?</h2>
            <p>Email: advertising@yourwebsite.com</p>
            <h2>Social Media:</h2>
            <p>Connect with us on Facebook, Instagram, Twitter and LinkedIn</p>
            <h2>Office Address:</h2>
            <p>EventHub</p>
            <p>1234 Main Street</p>
            <p>City, State 12345</p>
            <h2>Business Hours:</h2>
            <p>Monday to Friday: 9:00 AM - 6:00 PM (local time)</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  const header = await drupal.getResource(
    "node--page",
    "602b4cc5-6b79-4bd7-9054-d24ac27c2142",
  );
  
  const menu = await drupal.getMenu("main");

  const resource = await drupal.getResource(
    'webform--webform',
    "ddce9d01-3be3-4b39-877a-05a65504c9a0",
  );
  
  const webform = await Yaml.load(resource.elements);
  
  return {
    props: {
      header,
      menu,
      webform,
      resource,
    },
  }
}