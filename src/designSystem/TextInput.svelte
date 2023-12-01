<script lang="ts">
	export let label: string;
	export let value: string;
	export let name!: string;
	export let placeholder!: string;
	export let type: string = 'text';
	function typeAction(node: HTMLInputElement) {
		node.type = type;
	}
</script>

<div>
	<label for="email-address" class="sr-only">{label}</label>
	<input
		id={name}
		use:typeAction
		{name}
		autocomplete={name}
		bind:value
		required
		{placeholder}
		class="shadow appearance-none border-0 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-inputBg h-[36px] text-inputColor placeholder:text-gray placeholder:font-extralight"
	/>
</div>
