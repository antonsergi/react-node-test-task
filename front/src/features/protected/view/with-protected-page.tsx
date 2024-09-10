import React, { PropsWithChildren, useEffect } from 'react';
import { Spin } from 'antd';
import { useProfileQuery } from '@/features/protected/model/use-profile-query';
import { routes } from '@/shared/routes';
import { useRouter } from 'next/navigation';

export function withProtectedPage<P>(Component: (props: P) => React.ReactElement) {
    return function ProtectedPage(props: PropsWithChildren<P>) {
        const router = useRouter()
        const { isError, isLoading } = useProfileQuery();

        if (isLoading) {
            return <Spin spinning size="large"/>;
        }

        if (isError) {
            router.replace(routes.login);
            return null;
        }

        return <Component {...props} />;
    }
}
