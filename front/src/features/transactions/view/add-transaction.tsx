import React, { useCallback, useEffect, useState } from 'react';
import useMessage from 'antd/lib/message/useMessage';
import { Button, Drawer, Space, Form, Row, Col, Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { useAddTransactionMutation } from '@/features/transactions/model/use-add-transaction-mutation';


type AddTransactionFormValues = {
    value: string;
};


export const AddTransaction = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const showDrawer = useCallback(() => {
        setOpen(true);
    }, [setOpen]);
    const onClose = useCallback(() => {
        setOpen(false);
    }, [setOpen]);
    const { mutate, isError, isSuccess, isLoading, error } = useAddTransactionMutation();
    const [messageApi, messageContext] = useMessage();

    useEffect(() => {
        if (isError) {
            messageApi.open({
                type: 'error',
                content: error?.message || 'Something went wrong',
            });
        }
    }, [messageApi, isError, error]);

    useEffect(() => {
        if (isSuccess) {
            messageApi.open({
                type: 'success',
                content: 'Transaction added',
            });
            onClose();
            form.resetFields();
        }
    }, [isSuccess, form, onClose]);

    const handleFormSubmit = (values: AddTransactionFormValues) => {
        mutate({ value: Number(values.value) });
    };

    return (
        <div>
            {messageContext}
            <Button onClick={showDrawer} type="primary">Add new tarnsaction</Button>
            <Drawer
                title="Add new transaction"
                width={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
            >
                <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                    <Row gutter={16}>
                        <Col span={16}>
                            <FormItem
                                name="value"
                                label="Value"
                                rules={[{ required: true, message: 'Please enter value' }]}
                            >
                                <Input placeholder="Please enter value" type="number" />
                            </FormItem>
                        </Col>
                        <Col span={16}>
                            <Space>
                                <Button onClick={onClose}>Cancel</Button>
                                <Button type="primary" htmlType="submit" loading={isLoading}>
                                    Submit
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </div>
    );
}
