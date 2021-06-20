import React from 'react';

import { Alert, Form, Input, Button, Checkbox, Divider } from 'antd';

import {
	connect,
	ConnectProps,
	Loading,
	FormattedMessage,
	Dispatch,
	useIntl,
	getLocale,
} from 'umi';

import {
	UserOutlined,
	LockOutlined,
	FrownTwoTone,
	WechatOutlined,
	AlipayOutlined,
	QqOutlined,
	TaobaoOutlined,
} from '@ant-design/icons';

import { StateType } from '@/models/login';

import styles from './index.css';

import WeChatIcon from '@/components/Icons/WeChat';
import QqIcon from '@/components/Icons/QQ';
import TaoBaoIcon from '@/components/Icons/TaoBao';
import AliPayIcon from '@/components/Icons/AliPay';

const LoginMessage: React.FC<{
	message: string;
}> = ({ message }) => (
	<Alert
		style={{
			marginBottom: 24,
		}}
		message={message}
		type="error"
		showIcon
	/>
);

interface AccountLoginFormProps extends ConnectProps {
	login: StateType;
	submitting: boolean;
}

const AccountLoginForm: React.FC<AccountLoginFormProps> = (props) => {
	const { dispatch, login = {}, submitting } = props;
	const { isSuccess, message } = login;
	const intl = useIntl();

	const onSubmit = (values: any) => {
		dispatch({
			type: 'login/login',
			payload: values,
		});
	};

	const onError = (error: any) => {
		console.log(error);
	};

	return (
		<div>
			<Form
				onFinish={onSubmit}
				onFinishFailed={onError}
				initialValues={{ remember: false }}
			>
				<Form.Item
					name="email"
					rules={[
						{
							required: true,
							message: (
								<FormattedMessage
									id="pages.login.email.required"
									defaultMessage="Please input email"
								/>
							),
						},
					]}
				>
					<Input
						placeholder={intl.formatMessage({
							id: 'pages.login.email.placeholder',
							defaultMessage: 'Please input email',
						})}
					/>
				</Form.Item>
				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: (
								<FormattedMessage
									id="pages.login.password.required"
									defaultMessage="Please input password"
								/>
							),
						},
					]}
				>
					<Input.Password
						placeholder={intl.formatMessage({
							id: 'pages.login.password.placeholder',
							defaultMessage: 'Please input password',
						})}
					/>
				</Form.Item>
				<Form.Item>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Form.Item
							valuePropName="checked"
							name="remember"
							style={{ marginBottom: 0 }}
						>
							<Checkbox>
								<FormattedMessage
									id="pages.login.remember.checkbox"
									defaultMessage="Remember Me"
								/>
							</Checkbox>
						</Form.Item>
						<div>
							<a className="login-form-forgot" href="/forgot-password">
								<FormattedMessage
									id="pages.login.forgot.password.link"
									defaultMessage="Forgot password"
								/>
							</a>
						</div>
					</div>
				</Form.Item>
				{isSuccess === false && message != null && (
					<LoginMessage message={message} />
				)}
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className={styles.login_button}
						loading={submitting}
					>
						<FormattedMessage
							id="pages.login.submit.button"
							defaultMessage="Submit"
						/>
					</Button>
				</Form.Item>
			</Form>
			<div>
				<Divider orientation="left" plain>
					<FormattedMessage
						id="pages.other.login.text"
						defaultMessage="Other login methods"
					/>
				</Divider>
				<div className={styles.login_icon_container}>
					<AliPayIcon width={36} height={36} fill="#1890ff" />
					<TaoBaoIcon width={36} height={36} fill="#ff5000" />
					<QqIcon width={36} height={36} fill="black" />
					<WeChatIcon width={36} height={36} fill="green" />
				</div>
			</div>
		</div>
	);
};

export default connect(
	({
		login,
		loading,
	}: {
		login: StateType;
		loading: { models: { [key: string]: boolean } };
	}) => ({
		login: login,
		submitting: loading.effects['login/login'],
	})
)(AccountLoginForm);
