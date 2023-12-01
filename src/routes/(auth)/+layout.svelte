<script lang="ts">
	import '../../app.postcss';
	import AuthLink from '../../designSystem/AuthLink.svelte';
	import { page } from '$app/stores';
	const isTabActive = (path: string, current_path: string) => {
		return path === current_path;
	};
	$: isLoginActive = isTabActive('/login', $page.url.pathname);
	$: isRegisterActive = isTabActive('/register', $page.url.pathname);
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>
<div class="grid md:grid-cols-login min-h-screen flex items-center justify-center">
	<div
		class="bg-[url('/img2.jpg')] w-full h-full bg-no-repeat bg-center bg-cover flex items-center justify-center hidden md:flex"
	>
		<img src="/logo-light.svg" alt="" class="h-[29.5px] w-auto" />
	</div>
	<div class="bg-darkBlue w-full h-full grid items-center justify-center">
		<div class="max-w-full p-5 md:max-w-[340px]">
			<div>
				<h2 class="text-left text-3xl font-extrabold text-gray-900">
					Get more things done with Login platform.
				</h2>
				<p class="mt-[10px] text-left text-lg text-gray-600 mb-8 font-extralight">
					Access to the most powerful tool in the entire design and web industry.
				</p>
			</div>
			<div class="flex gap-5 mb-7">
				<a href="/login"
					><div class="border-b-2 pb-1 {!isLoginActive && 'border-gray/50'}">Login</div></a
				>
				<a href="/register"
					><div class="border-b-2 pb-1 {!isRegisterActive && 'border-gray/50'}">Register</div></a
				>
			</div>
			<slot />
			<div class="flex gap-5 items-center mt-[10px] mb-[25px]">
				<div class="text-[10px]">Or {$page.url.pathname.split('/')[1]} with</div>
				<div class="flex gap-[10px]">
					<AuthLink>Facebook</AuthLink>
					<AuthLink>Google</AuthLink>
					<AuthLink>Linkedin</AuthLink>
				</div>
			</div>
		</div>
	</div>
</div>
