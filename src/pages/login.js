import LoginForm from "../components/auth/LoginForm";
import Head from "next/head";
export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Quark | Login</title>
        <meta name="description" content="Login to Quark!" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <LoginForm />
    </>
  );
}
