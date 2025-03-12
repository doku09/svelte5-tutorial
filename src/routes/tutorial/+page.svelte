<script lang="ts">
	import { goto } from "$app/navigation";
	import DongMain from "$lib/tutorial/DongMain.svelte";

  	const onclick = () => {
		goto('/');
	}
</script>

<button {onclick}>back</button>
<DongMain/>
