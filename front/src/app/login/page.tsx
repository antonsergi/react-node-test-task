'use client';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { LoginForm } from '@/app/login/_components/login-form';
import styles from './page.module.css';
import { withUnauthenticatedPage } from '@/features/protected/view/with-unauthenticated-page';

function LoginPage() {
    return (
        <Layout>
            <Content>
                <div className={styles.content}>
                    <LoginForm />
                </div>
            </Content>
        </Layout>
    );
}

export default withUnauthenticatedPage(LoginPage);
