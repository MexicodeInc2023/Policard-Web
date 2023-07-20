/* import * as db from '$lib/server/database.js'; */

/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ cookies }) => {
	const userSession = {
		user: cookies.get('user'),
		emailUser: cookies.get('emailUser'),
		idUser: cookies.get('idUser'),
		status: cookies.get('status'),
	}
	console.log(userSession);
	/* const session = await db.getSession(); */
	return { userSession };
}

