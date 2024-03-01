import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { DrupalMenuLinkContent, DrupalNode } from "next-drupal"

import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import { NodeArticleTeaser } from "components/node--article--teaser"
import { NodeEventTeaser } from "components/node--event--teaser"
import Image from "next/image"
import { absoluteUrl } from "lib/utils"
import { resolveWebformContent, Webform } from 'nextjs-drupal-webform';
import { useState } from "react"

interface IndexPageProps {
  header: any;
}



export default function ContactPage({ header }: IndexPageProps) {
  const [messageSuccess, setMessageSuccess] = useState(false)
  const [messageError, setMessageError] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    const response = await fetch(`/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: event.target.name.value,
        email: event.target.email.value,
        subject: event.target.subject.value,
        message: event.target.message.value,
      }),
    })

    if (response.ok) {
      // Show success.
      setMessageSuccess(true)
    }
    else if (!response.ok) {
      // Show error.
      setMessageError(true)
    }
  }

  return (
    <Layout node={header}>
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
          <form onSubmit={handleSubmit}>
            <div className="form__field">
              <label htmlFor="name" className="form__label">Name</label>
              <input type="text" id="name" name="name" className="form__input" placeholder="Fill in your name" required/>
            </div>
            <div className="form__field">
              <label htmlFor="email" className="form__label">Email</label>
              <input type="email" id="email" name="email" className="form__input" placeholder="Fill in your email" required />
            </div>
            <div className="form__field">
              <label htmlFor="subject" className="form__label">Subject</label>
              <input type="text" id="subject" name="subject" className="form__input" placeholder="Fill in the subject" required />
            </div>
            <div className="form__field">
              <label htmlFor="message" className="form__label">Message</label>
              <textarea id="message" name="message" className="form__input" placeholder="Fill in your message" required/>
            </div>
            <button type="submit" className="btn__submit">Submit</button>
          </form>

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
  // node--event
  // const nodes = await drupal.getResource(
  //   "node--page",
  //   "609f5d4e-4e18-4cda-a252-f227c990d564",
  //   { 
  //     params: {
  //       "filter[status]": 1,
  //       "fields[node--event]": "title,path,field_image,uid,created,field_hero_image_source,body",
  //       include: "node_type,uid",
  //       sort: "-created",
  //     },
  //   }
  // )  

  const header = await drupal.getResource(
    "node--page",
    "602b4cc5-6b79-4bd7-9054-d24ac27c2142",
  )
  console.log(header, 'header');

  const allImages = await drupal.getResourceCollectionFromContext(
    "file--file",
    context,
    { 
      params: {
        "filter[status]": 1,
        "fields[file--file]": "filename,uri",
        include: "uid",
        sort: "-created",
      },
    }
  )
  

  return {
    props: {
      header,
      
    },
  }
}