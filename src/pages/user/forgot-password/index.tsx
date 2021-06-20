import React from 'react';

import {
	Alert,
	Form,
	Input,
	Button,
	Row,
	Col,
	message as notification,
} from 'antd';

import {
	connect,
	ConnectProps,
	Loading,
	FormattedMessage,
	Dispatch,
	useIntl,
	getLocale,
} from 'umi';

import styles from './index.css';

const ForgotPassword: React.FC = () => {
	return (
		<div className={styles.forgot_password_form_container}>
			<div>找回密码</div>
			<Form>
				<Form.Item
					name="email"
					rules={[
						{
							required: true,
							message: 'Please input email',
						},
					]}
				>
					<Input placeholder="Please input email" />
				</Form.Item>
				<Form.Item>
					<Row gutter={8}>
						<Col span={12}>
							<Form.Item
								name="captcha"
								rules={[
									{
										required: true,
										message: 'Please input captcha',
									},
								]}
							>
								<Input placeholder="Please input captcha" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Button type="primary" style={{ width: '100%' }}>
								Get Captcha
							</Button>
						</Col>
					</Row>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default ForgotPassword;
