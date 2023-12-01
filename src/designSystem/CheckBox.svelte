<script lang="ts">
	export let label!: string;
	export let checked: boolean;
</script>

<div class="flex items-center justify-between">
	<div class="flex items-center">
		<input
			id="remember_me"
			name="remember_me"
			type="checkbox"
			class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
			bind:checked
		/>
		{#if label}
			<label for="remember_me" class="ml-2 block text-sm text-gray-900"> {label} </label>
		{/if}
	</div>
</div>
