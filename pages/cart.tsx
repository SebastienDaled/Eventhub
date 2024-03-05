import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { DrupalMenuLinkContent, DrupalNode, DrupalSearchApiFacet, getSearchIndexFromContext } from "next-drupal"

import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import { NodeArticleTeaser } from "components/node--article--teaser"
import { NodeEventTeaser } from "components/node--event--teaser"
import { use, useEffect, useState } from "react"
import { deserialize } from "v8"
import { log } from "console"
import { set } from "date-fns"

interface IndexPageProps {
  nodes: DrupalNode[];
  header: any;
  menu: any;
}

export default function CartPage({ nodes, header, menu }: IndexPageProps) {
  const [cartItems, setCartItems] = useState([]);
  const [standardNodes, setStandardNodes] = useState(nodes);

  // for each item in the cart get the node
  useEffect(() => {
    if (nodes && nodes.length) {
      const cart = JSON.parse(localStorage.getItem('shoppingCart'));
      const cartItems = cart.map((item) => {
        setStandardNodes(nodes);
        const items = standardNodes.map((node) => {
          if (node.id === item.id) {
            return {
              id: node.id,
              title: node.title,
              amount: item.tickets,
              price: node.field_min_price,
              city: node.field_city,
              date: node.field_date,
            };
          } else {
            return null;
          }
        }).filter(Boolean);
        
        return items;
      }
      );
      
      // there are cardItems with the same id, so we need to merge them
      const mergedCartItems = cartItems.reduce((acc, item) => {
        const existingItem = acc.find((i) => i[0].id === item[0].id);
        if (existingItem) {
          existingItem[0].amount += item[0].amount;
        } else {
          acc.push(item);
        }
        return acc;
      }, []);

      setCartItems(mergedCartItems);
    }

    window.addEventListener("storage", () => {
      if (nodes && nodes.length) {
        const cart = JSON.parse(localStorage.getItem('shoppingCart'));
        const cartItems = cart.map((item) => {
          setStandardNodes(nodes);
          const items = standardNodes.map((node) => {
            if (node.id === item.id) {
              return {
                id: node.id,
                title: node.title,
                amount: item.tickets,
                price: node.field_min_price,
                city: node.field_city,
                date: node.field_date,
              };
            } else {
              return null;
            }
          }).filter(Boolean);
          
          return items;
        }
        );
        
        // there are cardItems with the same id, so we need to merge them
        const mergedCartItems = cartItems.reduce((acc, item) => {
          const existingItem = acc.find((i) => i[0].id === item[0].id);
          if (existingItem) {
            existingItem[0].amount += item[0].amount;
          } else {
            acc.push(item);
          }
          return acc;
        }, []);
  
        setCartItems(mergedCartItems);
      }
    }
    );
    
  }, [nodes]);

  const payCart = () => {
    localStorage.setItem('shoppingCart', JSON.stringify([]));
    window.dispatchEvent(new Event("storage"));

    setCartItems([]);
  }

  const deleteTickets = (id) => {
    const cart = JSON.parse(localStorage.getItem('shoppingCart'));
    const newCart = cart.filter((item) => item.id !== id);
    localStorage.setItem('shoppingCart', JSON.stringify(newCart));
    window.dispatchEvent(new Event("storage"));
  }

  const ticketAmountUp = (id) => {
    const cart = JSON.parse(localStorage.getItem('shoppingCart'));
    const newCart = cart.map((item) => {
      if (item.id === id) {
        if (item.tickets < 5) {
          item.tickets++;
        }
      }
      return item;
    });
    localStorage.setItem('shoppingCart', JSON.stringify(newCart));
    window.dispatchEvent(new Event("storage"));
  }

  const ticketAmountDown = (id) => {
    const cart = JSON.parse(localStorage.getItem('shoppingCart'));
    const newCart = cart.map((item) => {
      if (item.id === id) {
        if (item.tickets > 1) {
          item.tickets--;
        }
      }
      return item;
    });
    localStorage.setItem('shoppingCart', JSON.stringify(newCart));
    window.dispatchEvent(new Event("storage"));
  }


  return (
    <Layout node={header} menu={menu} >
      <Head>
        <title>Shopping Cart | EventHub</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>

      <div className="corePage">
        <h1>Tickets</h1>
          {cartItems && cartItems.length ? (
            cartItems.map((node) => {
              return (
                <div key={node[0].id} className="ticketFull">
                  <div className="ticket">
                    <div className="ticket__info">
                      <h2>{node[0].title}</h2>
                      <h3>{node[0].city}</h3>
                      <h3>{new Date(node[0].date).toLocaleDateString()}</h3>
                    </div>
                    <div className="ticket__price">
                      <p>€{node[0].price} </p>
                    </div>
                  </div>
                  <div className="ticketAmount">
                    <button className="btn" onClick={() => ticketAmountUp(node[0].id)}>&#8593;</button>
                    <p>{node[0].amount}</p>
                    <button className="btn" onClick={() => ticketAmountDown(node[0].id)}>&darr;</button>
                    
                    <button onClick={() => deleteTickets(node[0].id)} className="btn btn--danger">&#x1F5D1;</button>
                  </div>
                </div>
              );
            }
          )
          ) : (
            <p className="ticketFull">No items in the cart</p>
          )
        }
        <h2 className="totalPrice">Total: €{cartItems.reduce((acc, item) => acc + item[0].price * item[0].amount, 0).toFixed(2)} </h2>

        <button className="btn" onClick={() => payCart()}>Pay</button>
      </div>
    </Layout>
  );
};

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  // node--event
  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--event",
    context,
    { 
      // order it on field_date
      params: {
        "filter[status]": 1,
        "filter[field_past_date]": 0,
        "fields[node--event]": "title,path,uid,field_hero_image_source,field_genre,field_country,field_date,field_city,field_min_price",
        include: "node_type,uid,field_genre,field_country",
        sort: "field_date",
      },
    }
  )

  const header = await drupal.getResource(
    "node--page",
    "602b4cc5-6b79-4bd7-9054-d24ac27c2142",
  )

  const menu = await drupal.getMenu("main");

  return {
    props: {
      nodes,
      header,
      menu,
    },
  }
}