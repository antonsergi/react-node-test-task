import React from 'react';
import { Menu, MenuProps } from 'antd';
import { PieChartOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { routes } from '@/shared/routes';

type MenuItem = Required<MenuProps>['items'][number];

const menuItems: MenuItem[] = [
    { icon: <PieChartOutlined />, label: 'Dashboard', key: 'dashboard' },
];

export const SideMenu = () => {
    const router = useRouter();
    const onClick: MenuProps['onClick'] = (menuInfo) => {
        if (menuInfo.key === 'dashboard') {
            router.push(routes.home);
        }
    };

    return (
        <Menu
            onClick={onClick}
            activeKey="dashboard"
            mode="inline"
            theme="dark"
            items={menuItems}
        />
    );
}
