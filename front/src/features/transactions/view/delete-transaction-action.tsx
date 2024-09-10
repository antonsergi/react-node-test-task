import React, { useEffect } from 'react';
import { Button, Space } from 'antd';
import { useDeleteTransactionMutation } from '@/features/transactions/model/use-delete-transaction-mutation';
import useMessage from 'antd/lib/message/useMessage';

type Props = {
    id: number;
};

export const DeleteTransactionAction = (props: Props) => {
    const { id } = props;
    const { mutate, isError, error, isLoading, isSuccess } = useDeleteTransactionMutation();
    const [messageApi, messageContext] = useMessage();

    useEffect(() => {
        if (isError) {
            messageApi.open({
                type: 'error',
                content: error?.message || 'Something went wrong',
            })
        }
    }, [isError, messageApi, error]);

    return (
        <Space size="middle">
            {messageContext}
            <Button danger type="primary" onClick={() => mutate({ id })} loading={isLoading}>
                Delete
            </Button>
        </Space>
    );
}
