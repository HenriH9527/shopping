import React from 'react';

import { Input, Button } from 'antd';

import { connect, ConnectProps, useIntl } from 'umi';

interface ChangePasswordPageProps extends ConnectProps {
	submitting: boolean;
}

const ChangePassword: React.FC<ChangePasswordPageProps> = (props) => {
	return <div>Change Password</div>;
};

export default ChangePassword;
