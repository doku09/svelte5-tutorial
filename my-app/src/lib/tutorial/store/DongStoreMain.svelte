<script lang="ts">
	import { userState } from './state.svelte.js';
  import StoreChild1 from './StoreChild1.svelte';
  import StoreChild2 from './StoreChild2.svelte';


  $effect(() => {
    console.log(userState.name);
  })
</script>

<StoreChild1/>
<StoreChild2/>
