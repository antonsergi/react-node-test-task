import React from 'react';
import { Button } from 'antd';
import { useSignOut } from '@/features/logout/model/use-sign-out';

export const LogoutButton = () => {
    const { mutate, isLoading } = useSignOut();
    return (
        <Button danger type="primary" loading={isLoading} onClick={() => mutate()}>
            Logout
        </Button>
    );
}
