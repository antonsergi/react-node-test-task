import React from 'react';
import { Layout } from 'antd';
import { Header, Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import { LogoutButton } from '@/features/logout/view/logout-button';
import styles from './main-layout.module.css';
import { useProfileQuery } from '@/features/protected/model/use-profile-query';
import { SideMenu } from '@/shared/view/side-menu';

type Props = {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: Props) => {
    const { data } = useProfileQuery();
    return (
        <Layout className={styles.root}>
            <Header className={styles.header}>
                <div className={styles.userInfo}>
                    {data && (
                        <div>
                            <span>
                                {data.email} ({data.role})
                            </span>
                        </div>
                    )}
                    <LogoutButton />
                </div>
            </Header>
            <Layout className={styles.bodyLayout}>
                <Sider className={styles.content}>
                    <SideMenu />
                </Sider>
                <Layout className={styles.content}>
                    <Content>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}
