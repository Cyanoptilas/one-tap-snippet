import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja" prefix="og: http://ogp.me/ns#">
        <Head>
          <title>ONE-TAP-SNIPPET</title>
          <meta
            name="description"
            content="コピペ&Enterでスニペットを簡単登録！"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:title" content="ONE-TAP-SNIPPET" />
          <meta property="og:description" content="コピペ&Enterでスニペットを簡単登録！"/>
          <meta property="og:url" content="https://one-tap-snippet.com/" />
          <meta property="og:site_name" content="ONE-TAP-SNIPPET" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={process.env.R2_OGP_IMAGE} />
          <meta
            name="google-site-verification"
            content="f_ONqNmOYowRla-ooKXHamNFNxdwsnAI-7bNbY5QIKY"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap"
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
