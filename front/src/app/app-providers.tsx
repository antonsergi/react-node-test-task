'use client'
import React from 'react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '@/shared/query-client';

type Props = {
    children: React.ReactNode;
}

export const AppProviders = ({ children }: Props) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
