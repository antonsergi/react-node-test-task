import React from 'react';
import { Table } from 'antd';
import Column from 'antd/lib/table/Column';
import { Transaction } from '@/shared/types/transaction';
import { useTransactionsQuery } from '@/features/transactions/model/use-transactions-query';
import { DeleteTransactionAction } from '@/features/transactions/view/delete-transaction-action';
import { ColumnType } from 'antd/lib/table';

const columns: ColumnType<Transaction>[] = [
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: 'Value',
        dataIndex: 'value',
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
    },
    {
        title: 'Action',
        render: (_, { id }) => (
            <DeleteTransactionAction id={id} />
        )

    }
];

export const TransactionsList = () => {
    const { data, isError, isLoading } = useTransactionsQuery();
    return (
        <Table
            loading={isLoading}
            dataSource={data}
            rowKey={record => record.id}
        >
            {columns.map(column => (
                <Column<Transaction>
                    key={String(column.title || column.dataIndex)}
                    title={column.title}
                    dataIndex={column.dataIndex}
                    render={column.render}
                />
            ))}
        </Table>
    );
}
