import Head from "next/head"
import { GetStaticPropsResult } from "next"

import { getAllUsers } from "lib/drupal"

import { Layout } from "components/layout"
import { getJWT, getUid } from "lib/utils"

interface IndexPageProps {
  user: any;
}

export default function AccountPage({ user }: IndexPageProps) {
  console.log(user, 'user');
  

  const logout = () => {
    localStorage.removeItem('uid');
    // remove crsf token coockies, token and uid
    document.cookie = "X-CSRF-Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    window.location.assign('/auth');
  }

  if (!user) return <div style={{color: "white"}}>Loading...</div>;

  return (
    <Layout>
      <Head>
        <title>Shopping Cart | EventHub</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>

      <div className="corePage">
        <h1>Hi, {user.display_name}</h1>

        {user &&
          <div>
            <p>Username: {user.display_name}</p>
            {/* <p>Email: {user.mail}</p> */}
          </div>
        }

        <button className="btn" onClick={() => {
          logout();
        }}>Logout</button>
      </div>

    </Layout>
  );
};

export async function getServerSideProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  const uid = await getUid(context);
  
  const users = await getAllUsers();
  
  const user = users.find((u) => {
    return u.id === uid.replace(' ', '');
  });
  
  
  

  return {
    props: {
      user,
    },
  };
}