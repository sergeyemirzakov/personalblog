import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProgressBar from '@/components/ProgressBar';
import { ThemeProvider } from '@/context/themeContext';
import '@/styles/globals.scss';
import '@/styles/prism-vsc-dark-plus.css';

export type LoadingProgress = 'none' | 'start' | 'finish' | 'error';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loadingProgress, setLoadingProgress] = useState<LoadingProgress>('none');

  useEffect(() => {
    router.events.on('routeChangeStart', () => setLoadingProgress('start'));
    router.events.on('routeChangeComplete', () => setLoadingProgress('finish'));
    router.events.on('routeChangeError', () => setLoadingProgress('error'));
  }, [router]);

  useEffect(() => {
    if (loadingProgress === 'finish') {
      setTimeout(() => setLoadingProgress('none'), 500);
    }
  }, [loadingProgress]);

  return (
    <ThemeProvider>
      <ProgressBar loadingProgress={loadingProgress} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
