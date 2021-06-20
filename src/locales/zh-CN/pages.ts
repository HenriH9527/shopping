import loginPages from './pages.login';
import userManagementPages from './page.user.management';
import roleManagementPages from './page.role.management';

export default {
	...loginPages,
	...userManagementPages,
	...roleManagementPages,
};
