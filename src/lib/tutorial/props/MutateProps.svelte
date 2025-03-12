<script lang="ts">
	let { object } = $props();
</script>

<button onclick={() => {
	debugger;
	// has no effect
	object.count += 1
}}>
	clicks: {object.count}
</button>