import React, { PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
import { useProfileQuery } from '@/features/protected/model/use-profile-query';
import { routes } from '@/shared/routes';
import { Spin } from 'antd';

export function withUnauthenticatedPage<P>(Component: (props: P) => React.ReactElement) {
    return function unauthenticatedPage(props: PropsWithChildren<P>) {
        const router = useRouter()
        const { data, isLoading } = useProfileQuery();

        if (isLoading) {
            return <Spin spinning size="large"/>;
        }

        if (data) {
            router.replace(routes.home);
            return null;
        }

        return <Component {...props} />;
    }
}
