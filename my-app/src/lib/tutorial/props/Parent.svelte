<script lang="ts">
	import Child from "./Child.svelte";
  let { value } = $props()
</script>

<!-- <p>parent Value: {value}</p> -->
<p>Value in Parent: {value}</p>
<input bind:value>
<!-- <Child {value} /> -->
<Child {value} />