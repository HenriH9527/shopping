import { useIntl } from 'umi';

import React, { useEffect } from 'react';
import { Form, Input, Modal, Select } from 'antd';

interface UserFormProps {
	visible: boolean;
	roles?: Role[];
	onSubmit: (user: User) => void;
	onCancel: () => void;
	defaultValue?: User;
}

const UserForm: React.FC<UserFormProps> = (props: UserFormProps) => {
	const intl = useIntl();
	const [form] = Form.useForm();

	useEffect(() => {
		const { defaultValue } = props;
		form.setFieldsValue(mapToFormData(defaultValue));
	}, [props.defaultValue]);

	const mapToFormData = (user: User | undefined): any => {
		if (user === undefined) return {};

		const { roles = [] } = user;

		return { ...user, roles: roles.map((role: Role) => role.id) };
	};

	const mapToUserModel = (values: any): User => {
		const { defaultValue } = props;
		const { roles } = values;

		return {
			...values,
			id: defaultValue?.id || 0,
			roles: roles?.map((id: number) => ({ id })),
		};
	};

	return (
		<Modal
			visible={props.visible}
			onCancel={() => {
				props.onCancel();
				form.resetFields();
			}}
			onOk={() => {
				form.submit();
			}}
		>
			<Form
				form={form}
				onFinish={(values: any) => {
					props.onSubmit(mapToUserModel(values));
				}}
			>
				<Form.Item
					label={intl.formatMessage({
						id: 'page.user.management.user.form.alias',
						defaultMessage: 'Alias',
					})}
					name="alias"
					rules={[{ required: true, message: intl.formatMessage({
														id: 'page.user.management.user.form.alias.required',
														defaultMessage: 'Alias'})
						}]}
				>
				<Input />
			</Form.Item>
				<Form.Item
					label={intl.formatMessage({
						id: 'page.user.management.user.form.name',
						defaultMessage: 'name',
					})}
					name="name"
					rules={[{ required: true, message: intl.formatMessage({
														id: 'page.user.management.user.form.name.required',
														defaultMessage: 'Name'})
						}]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label={intl.formatMessage({
						id: 'page.user.management.user.form.email',
						defaultMessage: 'Email',
					})}
					name="email"
					rules={[{ required: true, message: intl.formatMessage({
														id: 'page.user.management.user.form.email.required',
														defaultMessage: 'Email'})
						}]}
				>
					<Input />
				</Form.Item>
				<Form.Item label={intl.formatMessage({
						id: 'page.user.management.user.form.roles',
						defaultMessage: 'Roles',
					})}
					name="roles">
					<Select mode="multiple">
						{props.roles &&
							props.roles.map((role) => (
								<Select.Option key={role.id} value={role.id}>
									{role.name}
								</Select.Option>
							))}
					</Select>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default UserForm;
