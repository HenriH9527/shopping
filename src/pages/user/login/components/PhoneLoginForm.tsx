import React, { useState, useEffect } from 'react';

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

import { StateType } from '@/models/login';

import styles from './index.css';

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

interface PhoneLoginFormProps extends ConnectProps {
	login: StateType;
	loading: Loading;
}

const PhoneLoginForm: React.FC<PhoneLoginFormProps> = (props) => {
	const intl = useIntl();

	const [sendingCaptcha, setIsSending] = useState(false);
	const [countdown, setCountDown] = useState(60);

	const { dispatch, login = {} } = props;
	const { isSuccess, message } = login;
	const [loginForm] = Form.useForm();

	const onSubmit = (values: any) => {
		dispatch({
			type: 'login/login',
			payload: values,
		});
	};

	const onError = (error: any) => {
		console.log(error);
	};

	useEffect(() => {
		const timer =
			countdown > 0 && setInterval(() => setCountDown(countdown - 1), 1000);

		if (countdown === 0) {
			setIsSending(false);
		}

		return () => clearInterval(timer);
	}, [countdown]);

	const onCaptchaClick = () => {
		loginForm.validateFields(['phone']).then(() => {
			const phone = loginForm.getFieldValue('phone');

			notification.success(
				intl.formatMessage(
					{
						id: 'pages.login.send.captcha.message',
						defaultMessage: `The captcha has been sent to ${phone}`,
					},
					{ phone }
				)
			);
			setIsSending(true);
			setCountDown(59);
		});
	};

	return (
		<div>
			<Form onFinish={onSubmit} onFinishFailed={onError} form={loginForm}>
				<Form.Item
					name="phone"
					rules={[
						{
							required: true,
							message: (
								<FormattedMessage
									id="pages.login.phone.required"
									defaultMessage="Please input phone number"
								/>
							),
						},
						{
							type: 'string',
							max: 11,
						},
					]}
				>
					<Input
						placeholder={intl.formatMessage({
							id: 'pages.login.phone.placeholder',
						})}
					/>
				</Form.Item>
				<Form.Item>
					<Row gutter={8}>
						<Col span={12}>
							<Form.Item
								name="captcha"
								rules={[
									{
										required: true,
										message: (
											<FormattedMessage
												id="pages.login.captcha.required"
												defaultMessage="Please input captcha"
											/>
										),
									},
								]}
							>
								<Input
									placeholder={intl.formatMessage({
										id: 'pages.login.captcha.placeholder',
									})}
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Button
								disabled={sendingCaptcha}
								type="primary"
								onClick={onCaptchaClick}
								style={{ width: '100%' }}
							>
								{sendingCaptcha ? (
									intl.formatMessage(
										{
											id: 'pages.login.resend.captcha.message',
											defaultMessage: `${countdown}s resend captcha`,
										},
										{ countdown }
									)
								) : (
									<FormattedMessage
										id="pages.login.get.captcha.button"
										defaultMessage="Get Captcha"
									/>
								)}
							</Button>
						</Col>
					</Row>
				</Form.Item>
				{isSuccess === false && message != null && (
					<LoginMessage message={message} />
				)}
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className={styles.login_button}
					>
						<FormattedMessage
							id="pages.login.submit.button"
							defaultMessage="Submit"
						/>
					</Button>
				</Form.Item>
			</Form>
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
		loading: loading,
	})
)(PhoneLoginForm);
