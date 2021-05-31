import '../css/index.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '@components/Layout';

const CoreApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Head>
        <title>sct.dev</title>
        <meta
          name="description"
          content="This is my internet space for things. I am a software engineer that lives and works in Tokyo, Japan 🇯🇵 I'm addicted to coffee ☕️ and I love taking pictures 📸"
        />
        <meta property="og:site_name" content="sct.dev" data-rh="true"></meta>
        <meta property="og:title" content="sct.dev" data-rh="true"></meta>
        <meta
          property="og:description"
          content="This is my internet space for things. I am a software engineer that lives and works in Tokyo, Japan 🇯🇵 I'm addicted to coffee ☕️ and I love taking pictures 📸"
          data-rh="true"
        ></meta>
        <meta property="og:url" content="https://sct.dev" data-rh="true"></meta>
      </Head>

      <Component {...pageProps} />
    </Layout>
  );
};

export default CoreApp;
