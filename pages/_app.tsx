import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  )
}

export default MyApp
