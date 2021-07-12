import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="./FAVICON-QUARK.png" />
          <meta name="theme-color" content="#000000" />
          <meta name="google" content="notranslate" />
          <meta name="author" content="Joen Tan & Lim Shao En" />
          <meta
            name="description"
            content="Create, edit & export diagrams, graphs for Economics & Chemistry homework. "
          />
          <link rel="apple-touch-icon" href="./FAVICON-QUARK.png" />

          <link rel="manifest" href="./manifest.json" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,900;1,900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
