import Head from "next/head"
import { LoginForm } from "components/auth--login"
import { Layout } from "components/layout"
import { useState } from "react"
import { RegisterForm } from "components/auth--register"

export default function LoginPage() {
  const [hasAccount, setHasAccount] = useState(true)

  return (
    <>
      <Layout>
        <Head>
          <title>Next.js for Drupal | Authentication Example</title>
        </Head>
        <div className="corePage">
          <article>
            {/* <RegisterForm />

            <LoginForm /> */}

            {hasAccount ? (
              <LoginForm />
            ) : (
              <RegisterForm />
            )}

            <button className="underline mt-5" onClick={() => setHasAccount(!hasAccount)}>
              {hasAccount ? "No account yet? Register here " : "Already have an account? Login here"}
            </button>
          </article>
        </div>
      </Layout>
    </>
  )
}