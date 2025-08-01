'use client';
import React, { ReactNode } from 'react';
import InitializeSettings from './initialize';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@smastrom/react-rating/style.css';
import Toaster from '@/shared/ui/Toaster';

const queryClient = new QueryClient();

function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <InitializeSettings />
      {children}
      <Toaster position='top-center' />
    </QueryClientProvider>
  );
}

export default Providers;
