<script>
	import thankYouImg from '../../../lib/img/icon-thank-you.svg';
	import { goto } from '$app/navigation';
	import { message, errorValidation } from './sharedState';

	let showComponent = false;
	window.setTimeout(() => {
		showComponent = true;
	}, 0);
	let errorMessage =
		'Ha ocurrido un error, por favor intente de nuevo. Si el error persiste, contacte a soporte.';
	let action = () => {
		if ($errorValidation) {
			window.location.reload();
			goto('/form');
			return;
		}
		goto('/login');
	};
</script>

<article class:show={showComponent}>
	{#if $errorValidation}
		<p class="text-bg-danger">
			{errorMessage}
		</p>
	{:else}
		<img src={thankYouImg} alt="" loading="lazy" decoding="async" />
		<h3>Gracias! </h3>
		<p>
			Gracias por confirmar sus datos. Esperamos que te diviertas utilizando nuestra plataforma. Si
			alguna vez necesita ayuda, no dude en enviarnos un correo electrónico a mexicode@gmail.com.
		</p>
	{/if}

	<button class="nextButton" on:click={action}>
		{$errorValidation ? 'Reintentar' : 'Iniciar sesión'}
		<div class="arrow-wrapper">
			<div class="arrow" />
		</div>
	</button>
</article>

<style>
	article{display:flex;flex-direction:column;align-items:center;transition:.3s;position:relative;right:-10rem;opacity:0}.show{opacity:1;right:0}img{width:56px;height:56px;margin-top:47px;margin-bottom:24px}h3{font-weight:700;font-size:24px;line-height:28px;text-align:center;color:#022959;margin-bottom:9px}p{font-weight:400;font-size:16px;line-height:25px;text-align:center;color:#9699aa;margin-bottom:47px}@media screen and (min-width: 992px){img{width:80px;height:80px;margin-bottom:32px;margin-top:125px}h3{font-size:32px;line-height:37px;margin-bottom:14px}}.nextButton{--primary-color:#645bff;--secondary-color:#fff;--hover-color:#111;--arrow-width:10px;--arrow-stroke:2px;box-sizing:border-box;border:0;border-radius:20px;color:var(--secondary-color);padding:1em 1.8em;background:var(--primary-color);display:flex;transition:.2s background;align-items:center;gap:.6em;font-weight:700}.nextButton .arrow-wrapper{display:flex;justify-content:center;align-items:center}.nextButton .arrow{margin-top:1px;width:var(--arrow-width);background:var(--primary-color);height:var(--arrow-stroke);position:relative;transition:.2s}.nextButton .arrow::before{content:'';box-sizing:border-box;position:absolute;border:solid var(--secondary-color);border-width:0 var(--arrow-stroke) var(--arrow-stroke) 0;display:inline-block;top:-3px;right:3px;transition:.2s;padding:3px;transform:rotate(-45deg)}.nextButton:hover{background-color:var(--hover-color)}.nextButton:hover .arrow{background:var(--secondary-color)}.nextButton:hover .arrow:before{right:0}
</style>
