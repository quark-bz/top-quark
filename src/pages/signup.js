import SignupForm from "../components/auth/SignupForm";
import Head from "next/head";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Quark | Sign Up</title>
        <meta name="description" content="Create your Quark account!" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <SignupForm />
    </>
  );
}
