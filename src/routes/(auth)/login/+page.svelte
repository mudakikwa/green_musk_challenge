<script lang="ts">
	import { page } from '$app/stores';
	import Alert from '../../../designSystem/Alert.svelte';
	import Button from '../../../designSystem/Button.svelte';
	import CheckBox from '../../../designSystem/CheckBox.svelte';
	import ErrorMessage from '../../../designSystem/ErrorMessage.svelte';
	import PForm from '../../../designSystem/PForm.svelte';
	import TextInput from '../../../designSystem/TextInput.svelte';
	import type { PageData, ActionData } from './$types';
	import { newContactSchema } from './schema';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;
	const { form, errors, enhance } = superForm(data.form, {
		validators: newContactSchema
	});

	$: $page.form?.out?.token && localStorage.setItem('token', $page.form?.out.token);
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>
<div>
	<form method="POST" use:enhance>
		<PForm>
			{#if $page.form?.out}
				<Alert
					message={$page.form.out.message}
					type={$page.form.out.status === 200 ? 'success' : 'error'}
				/>
			{/if}
		</PForm>
		<PForm>
			<TextInput
				label="email"
				name="email"
				type="email"
				placeholder="E-mail Address"
				bind:value={$form.email}
			/>
			{#if $errors.email}
				<ErrorMessage>{$errors.email}</ErrorMessage>
			{/if}
		</PForm>
		<PForm>
			<TextInput
				label="password"
				name="password"
				type="password"
				placeholder="Password"
				bind:value={$form.password}
			/>
			{#if $errors.password}
				<ErrorMessage>{$errors.password}</ErrorMessage>
			{/if}
		</PForm>
		<PForm>
			<CheckBox checked={$form.accepted} label="Remember me" />
			{#if $errors.accepted}
				<ErrorMessage>{$errors.accepted}</ErrorMessage>
			{/if}
		</PForm>
		<Button title="Login" />
	</form>
</div>
