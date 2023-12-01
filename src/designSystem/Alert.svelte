<script lang="ts">
	export let message: string;
	export let type: 'success' | 'error';
</script>

<div
	class="bg-blue-100 text-blue-700 px-4 py-2 rounded relative  {type === 'success' &&
		'bg-[#86EFAC]'} {type === 'error' && 'bg-[#F87171]'}"
	role="alert"
>
	<span class="block sm:inline">{message}</span>
</div>
