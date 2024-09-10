'use client';
import styles from "./page.module.css";
import { withProtectedPage } from '@/features/protected/view/with-protected-page';
import { MainLayout } from '@/shared/view/main-layout';
import { useIsAdmin } from '@/features/protected/model/use-is-admin';
import { useIsDealer } from '@/features/protected/model/use-is-dealer';
import { UsersList } from '@/features/users/view/users-list';
import { AddUser } from '@/features/users/view/add-user';
import { Layout } from 'antd';
import { TransactionsList } from '@/features/transactions/view/transactions-list';
import { AddTransaction } from '@/features/transactions/view/add-transaction';

function DashboardPage() {
  const isAdmin = useIsAdmin();
  const isDealer = useIsDealer();
  return (
    <MainLayout>
        {isAdmin || isDealer ? (
            <Layout className={styles.layout}>
              <div className={styles.addEntityButton}>
                <AddUser />
              </div>
              <UsersList />
            </Layout>
        ) : (
            <Layout className={styles.layout}>
                <div className={styles.addEntityButton}>
                  <AddTransaction />
                </div>
                <TransactionsList />
            </Layout>
          )}
    </MainLayout>
  );
}

export default withProtectedPage(DashboardPage);
