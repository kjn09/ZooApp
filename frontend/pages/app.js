import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const isIndexPage = router.pathname === '/';

  return (
    <Layout>
      <Component {...pageProps} />
      {!isIndexPage && <Footer />}
    </Layout>
  );
}

export default MyApp;
