import '@/styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  console.log('Rendering App')
  return <Component {...pageProps} />;
}
