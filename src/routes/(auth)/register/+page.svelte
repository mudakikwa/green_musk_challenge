<script lang="ts">
	import PForm from './../../../designSystem/PForm.svelte';
	import Button from '../../../designSystem/Button.svelte';
	import ErrorMessage from '../../../designSystem/ErrorMessage.svelte';
	import TextInput from '../../../designSystem/TextInput.svelte';
	import type { PageData } from './$types';
	import { createUser } from './schema';
	import { superForm } from 'sveltekit-superforms/client';
	import AuthLink from '../../../designSystem/AuthLink.svelte';
	import Alert from '../../../designSystem/Alert.svelte';
	import { page } from '$app/stores';

	export let data: PageData;
	const { form, errors, enhance } = superForm(data.form, {
		validators: createUser
	});
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>
<div>
	<PForm>
		{#if $page.form?.out}
			<Alert
				message={$page.form.out.message}
				type={$page.form.out.status === 200 ? 'success' : 'error'}
			/>
		{/if}
	</PForm>
	<form method="POST" use:enhance>
		<PForm>
			<TextInput label="Full" name="fullname" placeholder="Full Name" bind:value={$form.fullname} />
			{#if $errors.fullname}
				<ErrorMessage>{$errors.fullname}</ErrorMessage>
			{/if}
		</PForm>
		<PForm>
			<TextInput
				label="Email Address"
				name="email"
				type="email"
				placeholder="Email Address"
				bind:value={$form.email}
			/>
			{#if $errors.email}
				<ErrorMessage>{$errors.email}</ErrorMessage>
			{/if}
		</PForm>
		<PForm>
			<TextInput
				label="Password"
				name="password"
				type="password"
				placeholder="Password"
				bind:value={$form.password}
			/>
			{#if $errors.password}
				<ErrorMessage>{$errors.password}</ErrorMessage>
			{/if}
		</PForm>
		<div class="flex gap-7 items-center mt-[10px] mb-[25px]">
			<Button title="Register" />
			<AuthLink>Forget password?</AuthLink>
		</div>
	</form>
</div>
