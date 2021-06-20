import React, { useEffect } from 'react';

import { useIntl } from 'umi';
import { Form, Input, Button, Row, Col } from 'antd';

import { SearchOutlined } from '@ant-design/icons';

import ResetIcon from '@/components/Icons/Reset';

const SearchForm: React.FC<SearchFormProps<any>> = (props) => {
	const intl = useIntl();
	const { onReset, onSearch } = props;

	return (
		<>
			<Form
				onFinish={(values: any) => {
					if (typeof onSearch === 'function') {
						onSearch(values);
					}
				}}
			>
				<Row gutter={8}>
					<Col span={8}>
						<Form.Item
							name="alias"
							label={intl.formatMessage({
								id: 'page.user.management.search.form.alias',
								defaultMessage: 'Alias',
							})}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							name="name"
							label={intl.formatMessage({
								id: 'page.user.management.search.form.name',
								defaultMessage: 'Name',
							})}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							name="email"
							label={intl.formatMessage({
								id: 'page.user.management.search.form.email',
								defaultMessage: 'Email',
							})}
						>
							<Input />
						</Form.Item>
					</Col>
				</Row>
				<Form.Item style={{ textAlign: 'right' }}>
					<Button
						htmlType="reset"
						shape="circle"
						style={{ marginRight: 15 }}
						placeholder={intl.formatMessage({
							id: 'page.user.management.search.form.reset.button',
							defaultMessage: 'Reset',
						})}
						icon={
							<ResetIcon style={{ width: 16, height: 16, fill: '#4259c1' }} />
						}
					/>
					<Button
						type="primary"
						htmlType="submit"
						shape="circle"
						placeholder={intl.formatMessage({
							id: 'page.user.management.search.form.search.button',
							defaultMessage: 'Search',
						})}
						icon={<SearchOutlined />}
					/>
				</Form.Item>
			</Form>
		</>
	);
};

export default SearchForm;
