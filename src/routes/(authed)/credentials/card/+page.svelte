<script>
	import QRCode from './components/QRJS.svelte';
	import LogoUP from '../../../../lib/img/LOGOUPTAPPED.webp';
	import { id_st } from '../../../../stores/auth';
	import { BaseUrl } from '../../../../stores/apiUrl';

	let Datos;
	let Career;
	let Emergency;
	let OnError;
	export let data;

	const urlStudent = BaseUrl + 'api/student/' + data.userSession.idUser + '/';
	let options = {
		method: 'GET'
	};

	async function getData(urlStudent, options) {
		try {
			const response = await fetch(urlStudent, options);
			const data = await response.json();
			const Datos = data.data;
			id_st.set(Datos.id);

			const urlCarrera = BaseUrl + 'api/careers/' + Datos.id_careers + '/';
			const carreraResponse = await fetch(urlCarrera, options);
			const carreraData = await carreraResponse.json();
			const Career = carreraData.data;

			const urlEmergency = BaseUrl + 'api/emergency_info/' + Datos.id_emInfo + '/';
			const emergencyResponse = await fetch(urlEmergency, options);
			const emergencyData = await emergencyResponse.json();
			const Emergency = emergencyData.data;

			OnError = false;
			return { Datos, Career, Emergency };
		} catch (error) {
			OnError = true;
			console.error(error);
			throw error;
		}
	}

	const Datapromise = getData(urlStudent, options) // fetch the data
		.then((response) => {
			Datos = response.Datos;
			// console.log(Datos);
			Career = response.Career;
			Emergency = response.Emergency;
			return { Datos, Career, Emergency };
		})
		.catch((error) => {
			console.error(error);
			OnError = true;
			//console.log(error);
		});
</script>

<div class="uptap" style="text-align: center;">
	<h1 style="color:#1a1423; padding: 10px 0 0 0;">Credencial UPTAP</h1>
</div>
<div class="contenedor">
	<button class="print-button" style="margin: 10px 0 10px 0;" on:click={() => window.print()}
		>Imprimir</button
	>
</div>
<svelte:head>
	<title>Policard-Credencial</title>
</svelte:head>

{#if OnError}
	<div class="alert alert-danger">
		<button type="button" class="close" data-dismiss="alert" aria-hidden="true"> ×</button>
		<span class="glyphicon glyphicon-hand-right" /> <strong class="h4">Error Insesperado</strong>
		<hr class="message-inner-separator" />
		<p>Intentalo más tarde</p>
	</div>
{:else}
	{#await Datapromise}
		<div class="d-flex flex-row align-items-center justify-content-center" style="height:60vh">
			<div class="spinner-grow text-success" role="status">
				<span class="sr-only" />
			</div>
			<pre />
			<div class="spinner-grow text-primary" role="status">
				<span class="sr-only" />
			</div>
			<pre />
			<div class="spinner-grow text-info" role="status">
				<span class="sr-only" />
			</div>
		</div>
	{:then data}
		<div class="cardContainer">
			<div class="card">
				<div class="img">
					<img src={LogoUP} alt="Foto Universidad" loading="lazy" decoding="async" />
				</div>
				<div class="infos">
					<div class="name">
						<h2>
							<span class="text-uppercase">{data.Datos.personalName}</span>
							<br /><span class="text-uppercase">{data.Datos.lastname}</span>
						</h2>
						<h4>{data.Datos.license}</h4>
						<h4><span class="text-uppercase">{data.Career.nameCareers}</span></h4>
					</div>
					<ul class="stats">
						<li>
							<h3><span class="text-uppercase"> {data.Datos.grade}</span></h3>
							<h4>Cuatrimestre</h4>
						</li>
						<li>
							<h3>{data.Emergency.blood_type}</h3>
							<h4>Tipo Sangre</h4>
						</li>
					</ul>
					<p class="text">Contacto de Emergencia:</p>
					<h4 style="font-size: 0.8rem; font-weight: bold; color: #333; padding-bottom: 1.5rem;">
						<span class="text-uppercase">{data.Emergency.emergency_name}</span>
					</h4>
					<p class="text">Numeros de Emergencia:</p>
					<h4 style="font-size: 0.8rem; font-weight: bold; color: #333; padding-bottom: 1.5rem;">
						<span class="text-uppercase">{data.Emergency.emergency_phone}</span>
					</h4>
					<p class="text">Alergia:</p>
					<h4 style="font-size: 0.8rem; font-weight: bold; color: #333; padding-bottom: 1.5rem;">
						<span class="text-uppercase">{data.Emergency.allergy}</span>
					</h4>
					<p class="text">Alergia Extra:</p>
					<h4 style="font-size: 0.8rem; font-weight: bold; color: #333;">
						<span class="text-uppercase">{data.Emergency.allergy2}</span>
					</h4>
				</div>
				<div class="qr" style="margin-left: 100px;">
					<QRCode
						codeValue="Nombre: {data.Datos.personalName} {data.Datos.lastname}|Carrera:{data.Career
							.nameCareers}|Matricula:{data.Datos.license}|Cuatrimestre: {data.Datos
							.grade}|Nacimiento: {data.Datos.birthday}| Contacto de Emergencia: {data.Emergency
							.emergency_name}| Numero 1: {data.Emergency.emergency_phone}| Tipo de Sangre: {data
							.Emergency.blood_type}| Alergias: {data.Emergency.allergy} y {data.Emergency
							.allergy2}|"
					/>
				</div>
			</div>
		</div>
	{:catch error}
		<div class="card text-white bg-danger" style="max-width: 18rem; margin-top: 3rem;">
			<div class="card-header">Error Insesperado {error}</div>
			<div class="card-body">
				<h4 class="card-title">Intente de nuevo</h4>
			</div>
		</div>
	{/await}
{/if}

<style>
	* {
		margin: 0;
		padding: 0;
		width: 100%;
		box-sizing: border-box;
		font-family: 'Inter', sans-serif;
	}

	.cardContainer {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	img {
		max-width: 100%;
		display: block;
	}
	ul {
		list-style: none;
	}
	.card::after,
	.card img {
		border-radius: 50%;
	}

	.card,
	.stats {
		display: flex;
	}
	.card {
		padding: 2.5rem 2rem;
		border-radius: 10px;
		background-color: rgba(255, 255, 255, 0.5);
		max-width: 500px;
		height: 550px;
		box-shadow: 0 0 30px rgba(0, 0, 0, 0.15);
		margin: 1rem;
		position: relative;
		transform-style: preserve-3d;
		overflow: hidden;
	}
	.card::before,
	.card::after {
		content: '';
		position: absolute;
		z-index: -1;
	}
	.card::before {
		width: 100%;
		height: 100%;
		border: 1px solid #fff;
		border-radius: 10px;
		top: -0.7rem;
		left: -0.7rem;
	}
	.card::after {
		height: 15rem;
		width: 15rem;
		background-color: #7352f3;
		top: -8rem;
		right: -8rem;
		box-shadow: 2rem 6rem 0 -3rem #18be78;
	}
	.card img {
		width: 8rem;
		min-width: 80px;
		box-shadow: 0 0 0 5px #1a1423;
	}
	.infos {
		margin-left: 1.5rem;
	}
	.name {
		margin: -6rem 0 2rem 7.5rem;
	}
	.name h2 {
		font-size: 1rem;
		font-weight: 700;
	}
	.name h4 {
		font-size: 0.8rem;
		font-weight: 700;
		color: #333;
	}
	.text {
		font-size: 0.9rem;
		margin-bottom: 0.2rem;
	}
	.stats {
		margin-bottom: 2rem;
	}
	.stats li {
		position: relative;
		min-width: 5rem;
		padding: 0 2.5rem 0 0;
	}
	.stats li h3 {
		font-size: 1rem;
		font-weight: 700;
		padding: 1rem 0 0;
		text-align: center;
	}
	.stats li h4 {
		font-size: 0.7rem;
		font-weight: 700;
		text-align: center;
	}
	.qr {
		position: absolute;
		padding: 15rem 0 0 7.8rem;
	}
	@media screen and (max-width: 450px) {
		.card {
			display: block;
			height: 780px;
		}
		.stats {
			margin-bottom: 0.8rem;
		}
		.infos {
			margin-left: 0;
			margin-top: 1.5rem;
		}
		.name {
			margin: 1.5rem 0 0.8rem -0.3rem;
		}
		.qr {
			margin: -15rem 0 0;
		}
	}
	@media screen and (max-width: 540px) and (min-width: 451px) {
		.card {
			display: block;
			height: 680px;
		}
		.qr {
			position: absolute;
			padding: 1rem 0 0 1rem;
		}
	}
	.print-button {
		background-color: #4caf50; /* Color de fondo normal */
		color: white; /* Color del texto */
		border: none; /* Sin borde */
		padding: 6px 12px; /* Espaciado interno */
		text-align: center; /* Alineación del texto */
		text-decoration: none; /* Sin subrayado */
		display: grid;
		font-size: 18px;
		cursor: pointer;
		width: 15%;
	}
	.print-button:hover {
		background-color: #45a049; /* Nuevo color de fondo */
		align-items: center;
	}
	.contenedor {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	@media screen and (max-width: 770px) {
		.print-button {
			background-color: #4caf50; /* Color de fondo normal */
			color: white; /* Color del texto */
			border: none; /* Sin borde */
			padding: 6px 12px; /* Espaciado interno */
			text-align: center; /* Alineación del texto */
			text-decoration: none; /* Sin subrayado */
			display: grid;
			font-size: 18px;
			cursor: pointer;
			width: 100px;
		}
	}
</style>
