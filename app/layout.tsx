import Layout from '@components/Layout';
import Script from 'next/script';
import '../css/index.css';

export const metadata = {
  title: 'sct.dev',
  description:
    "This is my internet space for things. I am a software engineer that lives and works in Tokyo, Japan 🇯🇵 I'm addicted to coffee ☕️ and I love taking pictures 📸",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script async src="https://cdn.splitbee.io/sb.js" />
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
