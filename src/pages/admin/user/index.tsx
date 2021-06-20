import React from 'react';

import { ConnectProps, connect, Dispatch, FormattedMessage } from 'umi';

import { Button, Table, Tag, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';

import Access from '@/components/Authorized/Access';
import Box from '@/components/ComponentContainer';

import UserForm from './components/UserForm';
import SearchForm from './components/SearchForm';

import { StateType } from './model';
import { StateType as RoleStateType } from '../role/model';
import { StateType as UserStateType } from '@/models/login';

import { PermissionType } from '@/models/common.d';

import { remove, create, update } from '@/service/userService';

interface UserPageState {
	onEdit: boolean;
	page: number;
	pageSize: number;
	currentUser?: User;
}

interface UserPageProps extends ConnectProps {
	items: User[];
	total: number;
	currentItem?: User;
	roleOptions?: Role[];
	loading: boolean;
	dispatch: Dispatch<any>;
	currentUser?: User;
}

class UserPage extends React.Component<UserPageProps, UserPageState> {
	constructor(props) {
		super(props);

		this.state = {
			onEdit: false,
			page: 1,
			pageSize: 10,
			currentUser: props.currentUser,
		};
	}

	columns: ColumnsType<User> = [
		{
			title: (
				<FormattedMessage
					id={'page.user.management.table.header.alias'}
					defaultMessage="Alias"
				/>
			),
			dataIndex: 'alias',
			key: 'alias',
		},
		{
			title: (
				<FormattedMessage
					id={'page.user.management.table.header.name'}
					defaultMessage="Name"
				/>
			),
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: (
				<FormattedMessage
					id={'page.user.management.table.header.email'}
					defaultMessage="Email"
				/>
			),
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: (
				<FormattedMessage
					id={'page.user.management.table.header.role'}
					defaultMessage="Role"
				/>
			),
			dataIndex: 'roles',
			key: 'roles',
			render: (roles: Role[], record: User, index: number) =>
				roles && (
					<>
						{roles.map((role: Role) => (
							<Tag key={role.id}>{role.name}</Tag>
						))}
					</>
				),
		},
		{
			title: (
				<FormattedMessage
					id={'page.user.management.table.header.action'}
					defaultMessage="Action"
				/>
			),
			dataIndex: 'action',
			key: 'action',
			render: (text: any, record: User, index: number) => (
				<>
					<Access
						checkPermissions={[PermissionType.UpdateUser]}
						accessible={record.createdUser?.id === this.state.currentUser?.id}
					>
						<Button
							type="primary"
							icon={<EditOutlined />}
							shape="circle"
							onClick={() => {
								this.handleEdit(record.id);
							}}
							style={{ marginRight: 5 }}
						/>
					</Access>
					<Access
						checkPermissions={[PermissionType.DeleteUser]}
						accessible={record.createdUser?.id === this.state.currentUser?.id}
					>
						<Popconfirm
							title={
								<FormattedMessage
									id={'page.user.management.pop.confirm.title'}
									defaultMessage="Are you sure delete this item?"
								/>
							}
							onConfirm={() => {
								this.handleDelete(record.id);
							}}
						>
							<Button
								danger
								type="primary"
								icon={<DeleteOutlined />}
								shape="circle"
							/>
						</Popconfirm>
					</Access>
				</>
			),
		},
	];

	handleEdit = (id: number): void => {
		this.setState({ onEdit: true });

		this.props.dispatch({
			type: 'userManagement/get',
			payload: id,
		});

		this.props.dispatch({
			type: 'roleManagement/getOptions',
			payload: {},
		});
	};

	handleDelete = (id: number): void => {
		remove(id).then((res) => {
			this.props.dispatch({
				type: 'userManagement/fetch',
				payload: { page: 1, pageSize: 10 },
			});
		});
	};

	componentDidMount = () => {
		this.props.dispatch({
			type: 'userManagement/fetch',
			payload: { page: 1, pageSize: 10 },
		});
	};

	onSubmit = (user: User) => {
		const service = user.id > 0 ? update : create;

		service(user).then((res) => {
			this.props.dispatch({
				type: 'userManagement/fetch',
				payload: { page: 1, pageSize: 10 },
			});
			this.setState({ onEdit: false });
		});
	};

	onCancel = () => {
		this.setState({ onEdit: false });
	};

	canCreate = (): boolean => {
		return true;
	};

	render() {
		const { onEdit } = this.state;
		const { items, roleOptions, currentItem, loading } = this.props;

		return (
			<>
				<Box style={{ margin: '15px 0px' }}>
					<SearchForm
						onReset={() => {}}
						onSearch={(payload: any) => {
							console.log(payload);
						}}
					/>
				</Box>
				<Access checkPermissions={[PermissionType.CreateUser]}>
					<Box style={{ margin: '15px 0px' }}>
						<Button
							type="primary"
							onClick={() => {
								this.props.dispatch({
									type: 'roleManagement/getOptions',
									payload: {},
								});
								this.setState({ onEdit: true });
							}}
						>
							<FormattedMessage
								id={'page.user.management.action.create.button'}
								defaultMessage="New"
							/>
						</Button>
					</Box>
				</Access>
				<Box style={{ margin: '15px 0px' }}>
					<Table<User>
						rowKey={(record) => record.id}
						columns={this.columns}
						dataSource={items}
						loading={loading}
					/>
				</Box>
				<UserForm
					roles={roleOptions}
					visible={onEdit}
					onSubmit={this.onSubmit}
					onCancel={this.onCancel}
					defaultValue={currentItem}
				/>
			</>
		);
	}
}

export default connect(
	({
		userManagement,
		roleManagement,
		loading,
		login,
	}: {
		userManagement: StateType;
		roleManagement: RoleStateType;
		loading: { models: { [key: string]: boolean } };
		login: UserStateType;
	}) => ({
		items: userManagement.items,
		total: userManagement.total,
		currentItem: userManagement.currentItem,
		roleOptions: roleManagement.options,
		loading: loading.models.userManagement,
		currentUser: login.currentUser,
	})
)(UserPage);
