<script lang="ts">
	import Parent from "./Parent.svelte";
  let value = '조부모님';
</script>

<p>Value in GrandParent: {value}</p>
<Parent bind:value />
<!-- <Parent bind:value /> -->
