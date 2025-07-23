import { CartSync } from '@/components/CartPage/CartSync';
import MainLayout from '@/layouts/MainLayout';
import { useCartStore } from '@/store/useCartStore';
import { useUserStore } from '@/store/useUserStore';
import '@/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from "next/app";
import { useEffect } from 'react';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { client } from '../../lib/apolloClient';

export default function App({ Component, pageProps }: AppProps) {
  const user = useUserStore((state) => state.user);
  const loadUserFromStorage = useUserStore((state) => state.loadUserFromStorage);

  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  return (
    <ApolloProvider client={client}>
      <MainLayout>
        <CartSync />
        <Component {...pageProps} />
      </MainLayout>
    </ApolloProvider>
  );
}
