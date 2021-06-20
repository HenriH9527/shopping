import React from 'react';

import { Card, Spin } from 'antd';
import { connect, ConnectProps, Loading, history, useIntl } from 'umi';

import CommonLayout from '@/layouts/CommonLayout';
import { StateType } from '@/models/login';

import { SettingOutlined } from '@ant-design/icons';

import styles from './index.css';

interface HomePageProps extends ConnectProps {
	currentUser?: User;
	loading: boolean;
}

const HomePage: React.FC<HomePageProps> = (props) => {
	const { currentUser, loading } = props;
	const intl = useIntl();

	return (
		<Spin spinning={loading}>
			<CommonLayout>
				<div style={{ display: 'flex', justifyContent: 'space-around' }}>
					{currentUser &&
						currentUser.modules &&
						currentUser.modules.map((item: Module) => {
							return item.menus.map((menu) => (
								<Card
									key={menu.id}
									className={styles.card_container}
									onClick={() => {
										menu.path && history.push(menu.path);
									}}
								>
									<Card.Meta
										avatar={<SettingOutlined />}
										title={intl.formatMessage({
											id: `menu.${menu.key}`,
											defaultMessage: menu.name,
										})}
									></Card.Meta>
								</Card>
							));
						})}
				</div>
			</CommonLayout>
		</Spin>
	);
};

export default connect(
	({ login, loading }: { login: StateType; loading: Loading }) => ({
		currentUser: login.currentUser,
		loading: loading.global,
	})
)(HomePage);
