import Router from "next/router";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
import Head from "next/head";
import Layout from "@components/layout/Layout";
import ProgressBar from "@badrap/bar-of-progress";

const progress = new ProgressBar({
  size: 2,
  color: "#7c5dfa",
  className: "bar-of-progress",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

const queryClient = new QueryClient();

export default function App({ Component, pageProps, router, session }) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <link rel="icon" href="/images/favicon.ico" type="image/icon" />
        </Head>
        <Layout>
          <Component {...pageProps} key={router.route} />
          {/* <ReactQueryDevtools position="bottom-right" /> */}
        </Layout>
      </QueryClientProvider>
    </SessionProvider>
  );
}
