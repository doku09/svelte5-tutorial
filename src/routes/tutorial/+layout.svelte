<script lang="ts">
    
  interface Props {
    data: any; // Bind Section
    children?: import('svelte').Snippet;
  }

	let {data, children }:Props = $props();
</script>
<h1>Layout</h1>
{@render children?.()}