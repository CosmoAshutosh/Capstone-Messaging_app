import "src/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
     return (
          <main>
               <Head>
                    <title>MeChat</title>
                    <link rel="icon" type="image/x-icon" href="/favicon.ico?v=1" />
               </Head>
               <Component {...pageProps} />
          </main>
     );
}
