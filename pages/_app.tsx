import type { AppProps } from 'next/app';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { wrapper } from '../src/store/store';
import React from 'react';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps): ReactNode {
  const { store } = wrapper.useWrappedStore(pageProps);
  return (
    <>
      <Head>
        <title>Pokemon finder</title>
        <meta
          name="description"
          content="migrate from vite to Next.JS Pages Router"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
