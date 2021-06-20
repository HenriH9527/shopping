import React from 'react';

import { connect, ConnectProps, Redirect } from 'umi';

const Logout: React.FC<ConnectProps> = (props) => {
	const { dispatch } = props;

	dispatch({
		type: 'login/logout',
		payload: {},
	});

	return <Redirect to={`/login`} />;
};

export default connect()(Logout);
