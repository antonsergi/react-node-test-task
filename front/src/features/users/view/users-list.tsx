import React from 'react';
import { Table, TableProps } from 'antd';
import { useUsersQuery } from '@/features/users/model/use-users-query';
import { UserProfile } from '@/shared/types/user';

const columns: TableProps<UserProfile>['columns'] = [
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Role',
        dataIndex: 'role',
    },
    {
        title: 'Created at',
        dataIndex: 'createdAt',
        render: (value) => new Intl.DateTimeFormat('en-US', {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false,
        }).format(new Date(value)),
    }
];

export const UsersList = () => {
    const { data, isError, isLoading } = useUsersQuery();
    return (
        <Table
            columns={columns}
            loading={isLoading}
            dataSource={data}
            rowKey={record => record.id}
        />
    );
}
