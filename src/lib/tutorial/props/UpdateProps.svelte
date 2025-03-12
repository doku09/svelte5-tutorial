<script lang="ts">
 let {count = 0 } = $props();

</script>

<button onclick={() => (count += 1)}>
	clicks (child): {count}
</button>


