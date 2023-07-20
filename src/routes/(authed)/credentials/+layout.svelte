<script>
	import Header from '../../../components/Header.svelte';
	import Footer from '../../../components/Footer.svelte';
	import '../../../styles/styles.css';
	import { statusCredentials, procedureTrue, id_rq } from '../../../stores/states';
	import { checkStatus } from './procedures/checkStatus.js';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data;

	//console.log('Datos de la sesion', data.userSession);

	if (!data) {
		console.log('No hay datos');
		logout();
		location.reload();
	}

	async function logout() {
		await goto(`/?signout=${true}`, { replaceState: true });
		location.reload();
	}

	onMount(() => {
		// console.log('Datos de la sesion', $procedureTrue);
		if ($procedureTrue || $procedureTrue === undefined) {
			// console.log('Datos de la sesion', dataSession.status);
			statusCredentials.set(data.userSession.status);
		}
		// console.log('Id de la solicitud', $id_rq);
		checkStatus($id_rq);
	});

	statusCredentials.subscribe((value) => console.log('Valor del estado', value));

	const loginData = {
		user: data.userSession.user,
		emailUser: data.userSession.emailUser
	};
</script>

<div class="app">
	<Header {loginData} />

	<main>
		<slot />
	</main>

	<Footer />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
