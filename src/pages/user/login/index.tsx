import React from 'react';

import { Tabs } from 'antd';

import { useIntl } from 'umi';

import PhoneLoginForm from './components/PhoneLoginForm';
import AccountLoginForm from './components/AccountLoginForm';

import styles from './index.css';

import Logo from '@/components/Icons/Logo';

const LoginPage: React.FC = () => {
	const intl = useIntl();

	return (
		<div className={styles.login_component_container}>
			<div className={styles.login_title}>
				{/* <Logo width={32} height={32} fill={'#fff'} /> */}
				{intl.formatMessage({
					id: 'pages.login.form.title',
					defaultMessage: 'XXX Platform',
				})}
			</div>
			<div className={styles.login_form_container}>
				<Tabs>
					<Tabs.TabPane
						tab={intl.formatMessage({
							id: 'pages.login.account.login.tab.title',
							defaultMessage: 'Account login',
						})}
						key="1"
					>
						<AccountLoginForm />
					</Tabs.TabPane>
					<Tabs.TabPane
						tab={intl.formatMessage({
							id: 'pages.login.phone.login.tab.title',
							defaultMessage: 'SMS login',
						})}
						key="2"
					>
						<PhoneLoginForm />
					</Tabs.TabPane>
				</Tabs>
			</div>
		</div>
	);
};

export default LoginPage;
