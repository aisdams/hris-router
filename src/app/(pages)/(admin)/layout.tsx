"use client"
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useIsBelowSmallScreen, useMounted } from '@/hooks';
import { MantineProvider } from '@mantine/core';
import { NProgress } from '@tanem/react-nprogress';
import { useTheme } from 'next-themes';
import { ToastContainer } from 'react-toastify';

import useProgressBarStore from '@/zustand/use-progress-bar';

import { Toaster } from '@/components/ui/toaster';
import { useConfig } from '@/hooks/use-config';
import { themes } from '@/registry/themes';

// import SessionLoader from './session-loader';

type AppProviderProps = {
  children: React.ReactNode;
  initialLoading: boolean;
};

export default function AdminLayout({ children, initialLoading }: AppProviderProps) {
  const router = useRouter();
  const isMounted = useMounted();

  const [config] = useConfig();
  const theme = themes.find((theme) => theme.name === config.theme);
  const [isLoading, setIsLoading] = useState(initialLoading);
  const { isBelowSmallScreen } = useIsBelowSmallScreen();
  const { theme: mode, forcedTheme } = useTheme();
  const isAnimating = useProgressBarStore((state: any) => state.isAnimating);
  const setIsAnimating = useProgressBarStore((state: any) => state.setIsAnimating);

  //! Loading Bar Logic
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setIsLoading(false);
    };
    const handleRouteStop = () => {
      setIsLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', () => handleRouteStop());

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteStop);
    };
  }, [router]);

  return (
    <MantineProvider
      theme={{
        fontFamily: 'var(--font-sans)',
        // primaryColor: 'violet',
      }}
      forceColorScheme={(forcedTheme as any) || (mode as any)}
    >
      {/* <SessionLoader> */}
      {/* <Progress isAnimating={isAnimating} /> */}

      {/* THE COMPONENT */}
      <NProgress isAnimating={isLoading}>
        {({ isFinished }) => (
          <div
            className={`fixed left-0 top-0 z-[999] h-[6px] w-full rounded-full transition-opacity ${
              isFinished ? 'opacity-0' : 'opacity-100'
            }`}
            style={
              {
                backgroundColor: 'var(--theme-primary)',
                '--theme-primary': `hsl(${config?.cssVars[mode === 'dark' ? 'dark' : 'light'].primary})`,
              } as React.CSSProperties
            }
          />
        )}
      </NProgress>

      {children}

      {isMounted && (
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={(forcedTheme as any) || (mode as any)}
        />
      )}

      {/* shadcn/ui TOASTER */}
      <Toaster />
      {/* </SessionLoader> */}
    </MantineProvider>
  );
}
