import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    const id = process.env.ADSENSE_CLIENT_ID;
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap"
          />
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${id}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        </Head>
        <meta
          name="google-site-verification"
          content="f_ONqNmOYowRla-ooKXHamNFNxdwsnAI-7bNbY5QIKY"
        />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
