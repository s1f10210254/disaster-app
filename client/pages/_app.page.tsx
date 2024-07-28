import '@aws-amplify/ui-react/styles.css';
import { APP_NAME } from 'common/constants';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'styles/globals.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
