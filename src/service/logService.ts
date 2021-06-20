import { environment } from '../environment/environment';

import * as service from './service';

export async function logAccessInfo(payload: string): Promise<any> {
	return await service.post(
		`${environment.logBaseUrl}/access-info?path=${payload}`,
		{}
	);
}
