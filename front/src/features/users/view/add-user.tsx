import React, { useCallback, useEffect, useState } from 'react';
import { useAddUserMutation } from '@/features/users/model/use-add-user-mutation';
import useMessage from 'antd/lib/message/useMessage';
import { Button, Drawer, Space, Form, Row, Col, Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';


type AddUserFormValues = {
    password: string;
    email: string;
};


export const AddUser = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const showDrawer = useCallback(() => {
        setOpen(true);
    }, [setOpen]);
    const onClose = useCallback(() => {
        setOpen(false);
    }, [setOpen]);
    const { mutate, isError, isSuccess, isLoading, error } = useAddUserMutation();
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
                content: 'User added',
            });
            onClose();
            form.resetFields();
        }
    }, [isSuccess, form, onClose]);

    const handleFormSubmit = (values: AddUserFormValues) => {
        mutate(values);
    };

    return (
        <div>
            {messageContext}
            <Button onClick={showDrawer} type="primary">Add new user</Button>
            <Drawer
                title="Create a new account"
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
                        <Col span={12}>
                            <FormItem
                                name="email"
                                label="Email"
                                rules={[{ required: true, message: 'Please enter email' }]}
                            >
                                <Input placeholder="Please enter email" />
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                name="password"
                                label="Password"
                                rules={[{ required: true, message: 'Please enter password' }]}
                            >
                                <Input placeholder="Please enter password" />
                            </FormItem>
                        </Col>
                        <Col span={12}>
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
